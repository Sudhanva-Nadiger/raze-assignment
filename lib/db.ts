import "@/lib/config";

import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import { users, about, experiences, educations, skills } from './schema';
import * as schema from './schema';
import { eq } from "drizzle-orm";

export const db = drizzle(sql, { schema });


export type NewUser = typeof users.$inferInsert;

export type User = typeof users.$inferSelect;

export const getUserById = async (id: number): Promise<User> => {
    const selectResult = (await db.select().from(users).where(eq(users.id, id)));
    return selectResult[0];
};

export const getAllUsers = async () => {
    return db.select().from(users);
};

export const insertUser = async (user: NewUser) => {
    return db.insert(users).values(user).returning();
};

export const updateUserBgImage = async (id: number, url: string) => {
    try {
        await db.update(users).set({ backgroundImage: url }).where(eq(users.id, id));
        return {
            success: true,
            message: "User background image updated successfully"
        }
    } catch (e) {
        return {
            success: false,
            message: "User background image update failed"
        }
    }
}

export const updateUserProfileImage = async (id: number, url: string) => {
    try {
        await db.update(users).set({ profileImage: url }).where(eq(users.id, id));
        return {
            success: true,
            message: "User background image updated successfully"
        }
    } catch (e) {
        return {
            success: false,
            message: "User background image update failed"
        }
    }
}

export const editUserContactInfo = async (id: number, data: {
    email?: string,
    phone?: string,
    website?: string,
    address?: string,
}) => {
    try {
        await db.update(users).set(data).where(eq(users.id, id));
        return {
            success: true,
            message: "User background image updated successfully"
        }
    } catch (e) {
        return {
            success: false,
            message: "User background image update failed"
        }
    }
}

export const fetchUserAbout = async (userId: number) => {
    return (await db.select().from(about).where(eq(about.userId, userId)))[0];
}

export const editUserAbout = async (id: number, data?: string | null) => {
    try {
        let val = await db.update(about).set({
            description: data
        }).where(eq(about.userId, id));

        if(val.rowCount === 0) {
            await db.insert(about).values({
                userId: id,
                description: data
            })
        }

        return {
            success: true,
            message: "User about update success "
        }
    } catch (e) {
        return {
            success: false,
            message: "User about update failed"
        }
    }
}

export const fetchUserExperiences = async (userId: number) => {
    return (await db.select().from(experiences).where(eq(experiences.userId, userId)));
}

export type NewExperience = typeof experiences.$inferInsert;

export const addUserExperience = async (data: NewExperience) => {
    try {
        const res =  await db.insert(experiences).values(data).returning();
        return {
            success: true,
            message: res
        }
    } catch (error) {
        return {
            success: false,
            message: "Something went wronf"
        }
    }
}

export const editUserExperience = async (id: number, data: Omit<NewExperience, "company">) => {
    try {
        await db.update(experiences).set(data).where(eq(experiences.id, id));
        return {
            success: true,
            message: "Edited successfully"
        }
    } catch (error) {
        return {
            success: false,
            message: "Something went wronf"
        }
    }
}

export const deleteUserExperience =async (id: number) => {
    try {
        await db.delete(experiences).where(eq(experiences.id, id));
        return {
            success: true,
            message: "Deleted successfully"
        }
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

export const fetchUserEducations = async (userId: number) => {
    return (await db.select().from(educations).where(eq(educations.userId, userId)));
}

export type NewEducation = typeof educations.$inferInsert;

export const addUserEducation = async (data: NewEducation) => {
    try {
        const res =  await db.insert(educations).values(data).returning();
        return {
            success: true,
            message: res
        }
    } catch (error) {
        return {
            success: false,
            message: "Something went wronf"
        }
    }
}

export const editUserEducation = async (id: number, data: NewEducation) => {
    try {
        await db.update(educations).set(data).where(eq(educations.id, id));
        return {
            success: true,
            message: "Edited successfully"
        }
    } catch (error) {
        return {
            success: false,
            message: "Something went wronf"
        }
    }
}

export const deleteUserEducation = async (id: number) => {
    try {
        await db.delete(educations).where(eq(educations.id, id));
        return {
            success: true,
            message: "Deleted successfully"
        }
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}   

export const fetchUserSkills = async (userId: number) => {
    return await db.select().from(skills).where(eq(skills.userId, userId));
}

export type NewSkill = typeof skills.$inferInsert;

export const addUserSkill = async (data: NewSkill) => {
    try {
        const res =  await db.insert(skills).values(data).returning();
        return {
            success: true,
            message: res
        }
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

export const editUserSkill = async (id: number, data: NewSkill) => {
    try {
        await db.update(skills).set(data).where(eq(skills.id, id));
        return {
            success: true,
            message: "Edited successfully"
        }
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

export const deleteUserSkill = async (id: number) => {
    try {
        await db.delete(skills).where(eq(skills.id, id));
        return {
            success: true,
            message: "Deleted successfully"
        }
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}