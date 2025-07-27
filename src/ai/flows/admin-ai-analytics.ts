'use server';

/**
 * @fileOverview This file defines the admin AI analytics flow, which provides insights into AI performance and user behavior.
 *
 * @fileOverview AdminAiAnalytics - A function that returns insights about the AI performance and user behavior.
 * @fileOverview AdminAiAnalyticsOutput - The output type for the AdminAiAnalytics function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdminAiAnalyticsOutputSchema = z.object({
  topCostSavingRecommendations: z.array(
    z.object({
      recommendation: z.string(),
      count: z.number().int(),
    })
  ).describe('Top cost-saving recommendations made by the AI and the number of times each recommendation was made.'),
  languagesUsed: z.array(
    z.object({
      language: z.string(),
      count: z.number().int(),
    })
  ).describe('Languages used by vendors and suppliers and the number of times each language was used.'),
  aiChatUsageStatistics: z.object({
    totalChats: z.number().int().describe('Total number of AI chat sessions.'),
    averageChatLength: z.number().describe('Average length of AI chat sessions in words.'),
  }).describe('Statistics about AI chat usage.'),
});

export type AdminAiAnalyticsOutput = z.infer<typeof AdminAiAnalyticsOutputSchema>;

export async function adminAiAnalytics(): Promise<AdminAiAnalyticsOutput> {
  return adminAiAnalyticsFlow();
}

const prompt = ai.definePrompt({
  name: 'adminAiAnalyticsPrompt',
  output: {schema: AdminAiAnalyticsOutputSchema},
  prompt: `You are an AI assistant that provides insights about the AI performance and user behavior on the SupplySmartAI platform.

  Analyze the available data and provide the following insights:

  - Top cost-saving recommendations made by the AI and the number of times each recommendation was made.
  - Languages used by vendors and suppliers and the number of times each language was used.
  - Statistics about AI chat usage, including the total number of chat sessions and the average length of chat sessions.

  Return the data in JSON format.
  `,
});

const adminAiAnalyticsFlow = ai.defineFlow(
  {
    name: 'adminAiAnalyticsFlow',
    outputSchema: AdminAiAnalyticsOutputSchema,
  },
  async () => {
    // Here, instead of dummy data, you would fetch actual data from your database or analytics service.
    // For demonstration purposes, we'll use dummy data.
    const dummyData = {
      topCostSavingRecommendations: [
        {recommendation: 'Use local suppliers', count: 150},
        {recommendation: 'Buy in bulk', count: 120},
        {recommendation: 'Negotiate prices', count: 100},
      ],
      languagesUsed: [
        {language: 'English', count: 300},
        {language: 'Hindi', count: 250},
        {language: 'Tamil', count: 100},
      ],
      aiChatUsageStatistics: {
        totalChats: 500,
        averageChatLength: 50,
      },
    };

    // Since we're not calling the LLM, we directly return the dummy data in the expected format.
    return dummyData as AdminAiAnalyticsOutput;

    // If you were calling the LLM, you would do something like:
    // const {output} = await prompt({});
    // return output!;
  }
);
