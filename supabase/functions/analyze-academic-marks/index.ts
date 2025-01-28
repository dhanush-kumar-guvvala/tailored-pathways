import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { academicMarks, userId } = await req.json();

    // Create the prompt for Gemini
    const prompt = `create a JSON format  career path file ,Based on the following academic marks, suggest career paths and provide a detailed roadmap for each suggested career. Focus on the student's strengths.

    Class 10:
    Mathematics: ${academicMarks.class_10_math}
    Science: ${academicMarks.class_10_science}
    English: ${academicMarks.class_10_english}
    Social Studies: ${academicMarks.class_10_social}

    Class 11:
    Physics: ${academicMarks.class_11_physics}
    Chemistry: ${academicMarks.class_11_chemistry}
    Mathematics: ${academicMarks.class_11_math}
    English: ${academicMarks.class_11_english}

    Class 12:
    Physics: ${academicMarks.class_12_physics}
    Chemistry: ${academicMarks.class_12_chemistry}
    Mathematics: ${academicMarks.class_12_math}
    English: ${academicMarks.class_12_english}

    Please provide:
    1. Top 3 recommended career paths based on academic strengths in JSON format
    2. For each career path:
       - Required skills and qualifications
       - Suggested courses and certifications
       - Potential job roles
       - Growth opportunities
    3. A step-by-step roadmap for each career path

    Format the response as a JSON object with clear sections for each career path.`;

    // Call Gemini API
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('AIzasyD6hnbzYq5K0xn7AhJOLAmun7nOWYioTao')}`,
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
    console.log('Gemini API Response:', data);

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response from Gemini API');
    }

    const recommendations = data.candidates[0].content.parts[0].text;

    // Parse the recommendations and store them in Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { error: upsertError } = await supabase
      .from('career_recommendations')
      .upsert({
        user_id: userId,
        recommendations: JSON.parse(recommendations),
        updated_at: new Date().toISOString()
      });

    if (upsertError) {
      throw upsertError;
    }

    return new Response(
      JSON.stringify({ success: true, recommendations }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-academic-marks function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
