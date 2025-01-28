import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { academicMarks, userId } = await req.json();
    console.log('Received request with marks:', academicMarks);

    // Find subjects with highest and lowest marks
    const subjects = [
      { name: 'Mathematics (10th)', marks: academicMarks.class_10_math },
      { name: 'Science (10th)', marks: academicMarks.class_10_science },
      { name: 'English (10th)', marks: academicMarks.class_10_english },
      { name: 'Social Studies (10th)', marks: academicMarks.class_10_social },
      { name: 'Physics (11th)', marks: academicMarks.class_11_physics },
      { name: 'Chemistry (11th)', marks: academicMarks.class_11_chemistry },
      { name: 'Mathematics (11th)', marks: academicMarks.class_11_math },
      { name: 'English (11th)', marks: academicMarks.class_11_english },
      { name: 'Physics (12th)', marks: academicMarks.class_12_physics },
      { name: 'Chemistry (12th)', marks: academicMarks.class_12_chemistry },
      { name: 'Mathematics (12th)', marks: academicMarks.class_12_math },
      { name: 'English (12th)', marks: academicMarks.class_12_english }
    ].filter(subject => subject.marks !== null);

    const sortedSubjects = [...subjects].sort((a, b) => b.marks - a.marks);
    const highestSubject = sortedSubjects[0];
    const lowestSubject = sortedSubjects[sortedSubjects.length - 1];

    console.log('Highest subject:', highestSubject);
    console.log('Lowest subject:', lowestSubject);

    // Create a more structured prompt for Gemini
    const prompt = `You are an educational assessment expert. Based on the following academic performance data:

Highest performing subject: ${highestSubject.name} (${highestSubject.marks}%)
Lowest performing subject: ${lowestSubject.name} (${lowestSubject.marks}%)

Please generate:

1. Five multiple-choice assessment questions for ${lowestSubject.name} to help improve understanding. Each question should:
   - Be clear and concise
   - Have exactly four options (A, B, C, D)
   - Include one correct answer
   - Be appropriate for the subject level

2. A detailed career roadmap that:
   - Leverages the strength in ${highestSubject.name}
   - Addresses the weakness in ${lowestSubject.name}
   - Includes specific milestones and timeframes
   - Lists required skills and potential roles

Format your response as a valid JSON object with this exact structure:
{
  "assessmentQuestions": [
    {
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctAnswer": "string"
    }
  ],
  "careerRoadmap": {
    "recommendedPaths": [
      {
        "title": "string",
        "description": "string",
        "milestones": [
          {
            "title": "string",
            "timeframe": "string",
            "description": "string"
          }
        ],
        "requiredSkills": ["string"],
        "potentialRoles": ["string"]
      }
    ]
  }
}`;

    console.log('Sending prompt to Gemini API');

    // Call Gemini API
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('GEMINI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      console.error('Gemini API error:', await response.text());
      throw new Error('Failed to get response from Gemini API');
    }

    const data = await response.json();
    console.log('Received response from Gemini API:', data);

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error('Invalid Gemini API response structure:', data);
      throw new Error('Invalid response structure from Gemini API');
    }

    let assessment;
    try {
      assessment = JSON.parse(data.candidates[0].content.parts[0].text);
      console.log('Successfully parsed assessment:', assessment);
    } catch (error) {
      console.error('JSON parsing error:', error);
      console.error('Raw text:', data.candidates[0].content.parts[0].text);
      throw new Error('Failed to parse Gemini API response as JSON');
    }

    // Validate assessment structure
    if (!assessment.assessmentQuestions || !assessment.careerRoadmap) {
      console.error('Invalid assessment structure:', assessment);
      throw new Error('Invalid assessment data structure');
    }

    // Store assessment in Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { error: upsertError } = await supabase
      .from('assessments')
      .upsert({
        user_id: userId,
        assessment_data: assessment,
        highest_subject: highestSubject,
        lowest_subject: lowestSubject,
        created_at: new Date().toISOString()
      });

    if (upsertError) {
      console.error('Supabase upsert error:', upsertError);
      throw upsertError;
    }

    console.log('Successfully stored assessment in database');

    return new Response(
      JSON.stringify({ success: true, assessment }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-assessment function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});