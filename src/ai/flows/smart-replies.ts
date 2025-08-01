'use server';

/**
 * @fileOverview Provides smart reply suggestions based on recent conversations.
 *
 * - generateSmartReplies - A function that generates smart reply suggestions.
 * - SmartRepliesInput - The input type for the generateSmartReplies function.
 * - SmartRepliesOutput - The return type for the generateSmartReplies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartRepliesInputSchema = z.object({
  conversationHistory: z.string().describe('Recent conversation history.'),
  numberOfReplies: z.number().default(3).describe('Number of smart reply suggestions to generate.'),
});
export type SmartRepliesInput = z.infer<typeof SmartRepliesInputSchema>;

const SmartRepliesOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('Array of smart reply suggestions.'),
});
export type SmartRepliesOutput = z.infer<typeof SmartRepliesOutputSchema>;

export async function generateSmartReplies(input: SmartRepliesInput): Promise<SmartRepliesOutput> {
  return smartRepliesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartRepliesPrompt',
  input: {schema: SmartRepliesInputSchema},
  output: {schema: SmartRepliesOutputSchema},
  prompt: `You are a helpful assistant that suggests smart replies based on the recent conversation history.

Recent Conversation History:
{{conversationHistory}}

Generate {{numberOfReplies}} smart reply suggestions that are appropriate and relevant to the conversation. The suggestions should be short and concise.

Format your response as a JSON array of strings.`,
});

const smartRepliesFlow = ai.defineFlow(
  {
    name: 'smartRepliesFlow',
    inputSchema: SmartRepliesInputSchema,
    outputSchema: SmartRepliesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    try {
      // Attempt to parse the output as JSON. If it fails, return a default value.
      const suggestions = JSON.parse(output!.suggestions) as string[];
      return {suggestions};
    } catch (e) {
      console.error('Failed to parse smart reply suggestions, returning default values.', e);
      return {suggestions: ['Okay', 'Thanks', 'Sounds good']};
    }
  }
);
