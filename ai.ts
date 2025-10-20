import OpenAI from 'openai';
import { PersonaType } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const personaPrompts = {
  luxury: `Generate 15-20 luxury lifestyle hashtags for a post about "{content}". 
Focus on: high-end fashion, luxury brands, premium lifestyle, 
exclusive events, luxury travel, designer items, 
sophisticated living, and aspirational content.
Format as a simple list, one hashtag per line.`,

  business: `Generate 15-20 professional business hashtags for a post about "{content}". 
Focus on: entrepreneurship, business growth, professional networking, 
industry expertise, B2B marketing, leadership, 
success mindset, and business development.
Format as a simple list, one hashtag per line.`,

  creator: `Generate 15-20 creative content hashtags for a post about "{content}". 
Focus on: creativity, viral potential, community building, 
engagement, trending topics, content creation, 
social media growth, and creator economy.
Format as a simple list, one hashtag per line.`
};

export async function generateHashtags(
  content: string,
  personaType: PersonaType
): Promise<string[]> {
  try {
    const prompt = personaPrompts[personaType].replace('{content}', content);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional social media hashtag expert. Generate relevant, trending hashtags that will help content get discovered and reach the right audience."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || '';
    
    // Parse the response into an array of hashtags
    const hashtags = response
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => {
        // Ensure hashtag starts with #
        if (!line.startsWith('#')) {
          return `#${line}`;
        }
        return line;
      })
      .slice(0, 20); // Limit to 20 hashtags

    return hashtags;
  } catch (error) {
    console.error('Error generating hashtags:', error);
    throw new Error('Failed to generate hashtags');
  }
}

export function getPersonaPrompt(personaType: PersonaType): string {
  return personaPrompts[personaType];
}
