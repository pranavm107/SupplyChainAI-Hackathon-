'use server';

/**
 * @fileOverview AI assistant flow for vendors. Provides multilingual support,
 * task guidance, and information retrieval via tool calls.
 *
 * - aiAssistantForVendors - The main function that processes user queries.
 * - AiAssistantInput - The input type for the aiAssistantForVendors function.
 * - AiAssistantOutput - The return type for the aiAssistantForVendors function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiAssistantInputSchema = z.object({
  query: z
    .string()
    .describe(
      'The user query, which can be in any language or even code-mixed language (e.g., Hinglish).'
    ),
});
export type AiAssistantInput = z.infer<typeof AiAssistantInputSchema>;

const AiAssistantOutputSchema = z.object({
  response: z.string().describe('The AI assistant response to the user query.'),
});
export type AiAssistantOutput = z.infer<typeof AiAssistantOutputSchema>;

export async function aiAssistantForVendors(input: AiAssistantInput): Promise<AiAssistantOutput> {
  return aiAssistantForVendorsFlow(input);
}

const aiAssistantForVendorsPrompt = ai.definePrompt({
  name: 'aiAssistantForVendorsPrompt',
  input: {schema: AiAssistantInputSchema},
  output: {schema: AiAssistantOutputSchema},
  prompt: `You are a helpful AI assistant for vendors using the SupplySmartAI platform. You can answer questions about the platform, guide users through tasks, and provide relevant information like request status, AI insights, and price forecasts.

User Query: {{{query}}}`,
});

const aiAssistantForVendorsFlow = ai.defineFlow(
  {
    name: 'aiAssistantForVendorsFlow',
    inputSchema: AiAssistantInputSchema,
    outputSchema: AiAssistantOutputSchema,
  },
  async input => {
    const {output} = await aiAssistantForVendorsPrompt(input);
    return output!;
  }
);
