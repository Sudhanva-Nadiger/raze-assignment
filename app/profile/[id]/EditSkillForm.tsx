"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { editUserSkill, deleteUserSkill } from '@/app/api/actions';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

import {SkillFormData as EditSkillFormData, skillFormSchema as editSkillFormSchema } from "@/lib/zodSchema";
import { useRouter } from 'next/navigation';
import Loader from "../../../components/ui/Loader";
import { Button } from "../../../components/ui/button";
import { Input } from "@/components/ui/input";


export default function EditSkillForm({
    id,
    close,
    skill
}: {
    id: number,
    close: string;
    skill: {
        id: number;
        skill: string;
        description: string | null;
        userId: number | null;
    }
}) {
    const form = useForm<EditSkillFormData>({
        resolver: zodResolver(editSkillFormSchema),
        defaultValues: {
            description: skill.description || "",
            skill: skill.skill 
        },
    });

    const router = useRouter();

    const handleSubmit: SubmitHandler<EditSkillFormData> = async (data) => {
        try {
            await editUserSkill(id, data);
            document.getElementById(close)?.click()
            router.refresh();
        } catch (error) {
            form.setError("root", {
                type: "validate",
                message: "Something went wrong",
            });
        }
    }

    const handleDelete = async () => {
        
        try {
            await deleteUserSkill(id);
            document.getElementById(close)?.click()
            router.refresh();
        } catch (error) {
            form.setError("root", {
                type: "validate",
                message: "Something went wrong",
            });
        }
    }

    const { errors, isSubmitting } = form.formState;

    if (isSubmitting) {
        return <Loader />
    }

    return (
        <Form {...form}>
            {errors.root && <p className='text-red-500'>{errors.root.message}</p>}

            <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full sm:w-[420px] space-y-2">
                <FormField
                    control={form.control}
                    name="skill"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Skill name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Description"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-between gap-2">
                    <Button onClick={form.handleSubmit(handleDelete)} variant={"destructive"} className="w-full mt-2">
                        Delete
                    </Button>
                    <Button type="submit" className="w-full mt-2">Save</Button>
                </div>
            </form>
        </Form>
    )
}
