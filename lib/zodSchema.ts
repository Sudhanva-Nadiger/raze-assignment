import { z } from "zod";

export const createUserFormSchema = z.object({
    firstName: z.string().min(2, {
      message: "First Name must be at least 2 characters.",
    }),
    lastName: z.string().optional(),
    headline: z.string().min(1, {
      message: "Headline is required.",
    }),
    location: z.string().optional(),
    city: z.string().optional(),
    pronoun: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    website: z.string().url().optional(),
    address: z.string().optional(),
})

export type CreateFormData = z.infer<typeof createUserFormSchema>;

export const editContactFormSchema = z.object({
    email: z.string().email().optional(),
    phone: z.string().optional(),
    website: z.string().url().optional(),
    address: z.string().optional(),
})

export type EditFormData = z.infer<typeof editContactFormSchema>;

export const editAboutFormSchema = z.object({
    about: z.string().max(2600).optional(),
})

export type EditAboutFormData = z.infer<typeof editAboutFormSchema>;

export const editExperienceFormSchema = z.object({
  company: z.string().optional(),
  title: z.string().min(1, {
    message: "Position required"
  }),
  startDate: z.string().min(1, {
    message: "Start date required",
  }),
  endDate: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional()
})

export type EditExperienceFormData = z.infer<typeof editExperienceFormSchema>

export const addExperienceFormSchema = z.object({
  company: z.string().min(1, {
    message: "Company name required"
  }),
  title: z.string().min(1, {
    message: "Position required"
  }),
  startDate: z.string().min(1, {
    message: "Start date required",
  }),
  endDate: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional()
})

export type AddExperienceFormData = z.infer<typeof addExperienceFormSchema>

export const educationFormSchema = z.object({
  school: z.string().min(1, {
    message: "School name required"
  }),
  degree: z.string().min(1, {
    message: "Degree required"
  }),
  fieldOfStudy: z.string().optional(),
  startDate: z.string().min(1, {
    message: "Start date required",
  }),
  endDate: z.string().optional(),
  description: z.string().optional()
})

export type EducationFormData = z.infer<typeof educationFormSchema>

export const skillFormSchema = z.object({
  skill: z.string().min(1, {
    message: "Skill required"
  }),
  description: z.string().optional()
})

export type SkillFormData = z.infer<typeof skillFormSchema>