import { z } from 'zod';

export const projectSchema = z.object({
    name: z.string().min(1, "Project name is required").max(100, "Project name must be less than 100 characters"),
    key: z.string().min(1, "Project key is required").max(20, "Project key must be less than 20 characters").regex(/^[a-zA-Z0-9_-]+$/, "Project key can only contain alphanumeric characters, underscores, and hyphens"),
    description: z.string().max(500, "Description must be less than 500 characters").optional(), // 🔥 Correct
});


export const sprintSchema = z.object({
    name:z.string().min(1, "Sprint name is required").max(100, "Sprint name must be less than 100 characters"),
    startDate: z.date(),
    endDate: z.date(),
})

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required"),
  assigneeId: z.string().cuid("Please select assignee"),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
});
