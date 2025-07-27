'use server';

/**
 * @fileOverview A cost optimization AI agent.
 *
 * - getCostOptimizationSuggestions - A function that provides cost optimization suggestions.
 * - CostOptimizationInput - The input type for the getCostOptimizationSuggestions function.
 * - CostOptimizationOutput - The return type for the getCostOptimizationSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CostOptimizationInputSchema = z.object({
  requestDetails: z
    .string()
    .describe('Detailed description of the vendor request for materials.'),
  vendorLocation: z.string().describe('The location of the vendor.'),
  pastOrderHistory: z.string().optional().describe('Past order history of the vendor.'),
});
export type CostOptimizationInput = z.infer<typeof CostOptimizationInputSchema>;

const CostOptimizationOutputSchema = z.object({
  suggestions: z
    .string()
    .describe(
      'Cost optimization suggestions for the vendor, presented in a format suitable for visual charts, including potential savings.'
    ),
});
export type CostOptimizationOutput = z.infer<typeof CostOptimizationOutputSchema>;

export async function getCostOptimizationSuggestions(input: CostOptimizationInput): Promise<CostOptimizationOutput> {
  return costOptimizationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'costOptimizationPrompt',
  input: {schema: CostOptimizationInputSchema},
  output: {schema: CostOptimizationOutputSchema},
  prompt: `You are an AI assistant specialized in providing cost optimization suggestions for street food vendors in India.

  Based on the vendor's request details, location, and past order history, provide clear and actionable suggestions to reduce costs and increase savings.

  Present the suggestions in a format suitable for visual charts, highlighting potential savings and alternative options.

  Request Details: {{{requestDetails}}}
  Vendor Location: {{{vendorLocation}}}
  Past Order History: {{{pastOrderHistory}}}

  Ensure the output is structured for easy integration into charts and graphs for the vendor dashboard.
  `,
});

const costOptimizationFlow = ai.defineFlow(
  {
    name: 'costOptimizationFlow',
    inputSchema: CostOptimizationInputSchema,
    outputSchema: CostOptimizationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
