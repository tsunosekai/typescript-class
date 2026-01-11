import { defineCollection, z } from 'astro:content';

const lessonsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    lesson: z.number(),
  }),
});

export const collections = {
  lessons: lessonsCollection,
};
