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

    // Create prompt for Gemini
    const prompt = `Based on the following academic performance:
    
    Highest performing subject: ${highestSubject.name} with ${highestSubject.marks}%
    Lowest performing subject: ${lowestSubject.name} with ${lowestSubject.marks}%
    
    Please provide:
    1. 5 assessment questions for ${lowestSubject.name} to help improve understanding
    2. A detailed career roadmap that leverages the strength in ${highestSubject.name} while addressing the weakness in ${lowestSubject.name}
    
    Format the response as a JSON object with these sections:
    {
      "assessmentQuestions": [
        { "question": "...", "options": ["...", "...", "...", "..."], "correctAnswer": "..." }
      ],
      "careerRoadmap": {
        "recommendedPaths": [
          {
            "title": "...",
            "description": "...",
            "milestones": [
              { "title": "...", "timeframe": "...", "description": "..." }
            ],
            "requiredSkills": ["..."],
            "potentialRoles": ["..."]
          }
        ]
      }
    }`;

    // Call Gemini API
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('GEMINI_API_KEY')}`,
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    const data = await response.json();
    
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response from Gemini API');
    }

    const assessment = JSON.parse(data.candidates[0].content.parts[0].text);

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
      throw upsertError;
    }

    return new Response(
      JSON.stringify({ success: true, assessment }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-assessment function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});