import { defineCollection, z } from 'astro:content';

const lessonsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    lesson: z.number(),
    goal: z.string().optional(),
    time: z.string().optional(),
    checklist: z.array(z.string()).optional(),
  }),
});

export const collections = {
  lessons: lessonsCollection,
};
