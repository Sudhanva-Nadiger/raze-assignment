"use server"

import { 
    insertUser, 
    updateUserBgImage as updateBgimage, 
    updateUserProfileImage as updateProfileImage,
    editUserContactInfo as editContactInfo,
    fetchUserAbout as fetchAbout,
    editUserAbout as editAbout,
    fetchUserExperiences as fetchExperiences,
    addUserExperience,
    editUserExperience as editExperience,
    deleteUserExperience as deleteExperience,
    fetchUserEducations as fetchEducations,
    addUserEducation as addEducation,
    editUserEducation as editEducation,
    deleteUserEducation as deleteEducation,
    fetchUserSkills as fetchSkills,
    addUserSkill as addSkill,
    editUserSkill as editSkill,
    deleteUserSkill as deleteSkill,
    getAllUsers as fetchAllUsers
} from "@/lib/db";

import { 
    CreateFormData, 
    createUserFormSchema,
    editContactFormSchema, 
    addExperienceFormSchema, 
    AddExperienceFormData, 
    EditExperienceFormData, 
    editExperienceFormSchema, 
    EducationFormData, 
    educationFormSchema, 
    SkillFormData,
    skillFormSchema
} from "@/lib/zodSchema"

export async function getAllUsers() {
    return await fetchAllUsers();
}


export async function createUser(data: CreateFormData) {
    const { success } = createUserFormSchema.safeParse(data);
    if(success) {
        return await insertUser(data);
    } else {
        throw new Error("Invalid data");
    }
}

export async function updateUserBgImage(id: number, url: string) {
    return await updateBgimage(id, url);
}

export async function updateUserProfileImage(id: number, url: string) {
    return await updateProfileImage(id, url);
}

export const editUserContactInfo = async (id: number, data: { 
    email?: string, 
    phone?: string,
    website?: string,
    address?: string,
}) => {
    const { success } = editContactFormSchema.safeParse(data);
    if(success) {
        return await editContactInfo(id, data);
    } else {
        throw new Error("Invalid data");
    }
}

export const fetchUserAbout = async (userId: number) => {
    return await fetchAbout(userId);
}

export const editUserAbout = async (id: number, data?: string | null) => {
    return await editAbout(id, data);
}

export const fetchUserExperiences = async (id: number) => {
    return await fetchExperiences(id);
}

export const createExperience = async (id: number, data: AddExperienceFormData) => {
    const { success } = addExperienceFormSchema.safeParse(data);
    const dataWithUserId = { ...data, userId: id }
    if(success) {
        return await addUserExperience(dataWithUserId)
    } else {
        throw new Error("Invalid data");
    }
}

export const editUserExperience = async (id: number, data: EditExperienceFormData) => {
    const { success } = editExperienceFormSchema.safeParse(data);
    if(success) {
        return await editExperience(id, data)
    } else {
        throw new Error("Invalid data");
    }
}

export const deleteUserExperience = async (id: number) => {
    console.log(id);
    
    return await deleteExperience(id);
}

export const fetchUserEducations = async (id: number) => {
    return await fetchEducations(id);
}

export const createEducation = async (id: number, data: EducationFormData) => {
    const { success } = educationFormSchema.safeParse(data);
    const dataWithUserId = { ...data, userId: id }
    if(success) {
        return await addEducation(dataWithUserId)
    } else {
        throw new Error("Invalid data");
    }
}

export const editUserEducation = async (id: number, data: EducationFormData) => {
    const { success } = educationFormSchema.safeParse(data);
    if(success) {
        return await editEducation(id, data)
    } else {
        throw new Error("Invalid data");
    }
}

export const deleteUserEducation = async (id: number) => {
    return await deleteEducation(id);
}

export const fetchUserSkiils = async (id: number) => {
    return await fetchSkills(id);
}

export const createUserSkill = async (id: number, data: SkillFormData) => {
    const { success } = skillFormSchema.safeParse(data);
    if(success) {
        return await addSkill({ ...data, userId: id })
    } else {
        throw new Error("Invalid data");
    }
}

export const editUserSkill = async (id: number, data: SkillFormData) => {
    const { success } = skillFormSchema.safeParse(data);
    if(success) {
        return await editSkill(id, data)
    } else {
        throw new Error("Invalid data");
    }
}

export const deleteUserSkill = async (id: number) => {
    return await deleteSkill(id);
}