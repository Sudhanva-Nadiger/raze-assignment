"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { createUserSkill } from '@/app/api/actions';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

import {SkillFormData as AddSkillFormData, skillFormSchema as addSkillFormSchema } from "@/lib/zodSchema";
import { useRouter } from 'next/navigation';
import Loader from "../../../components/ui/Loader";
import { Button } from "../../../components/ui/button";
import { Input } from "@/components/ui/input";


export default function AddSkillForm({
    userId,
    close,
}: {
    userId: number,
    close: string;
}) {
    const form = useForm<AddSkillFormData>({
        resolver: zodResolver(addSkillFormSchema),
        defaultValues: {
            description: "",
            skill: ""
        },
    });

    const router = useRouter();

    const handleSubmit: SubmitHandler<AddSkillFormData> = async (data) => {
        try {
            await createUserSkill(userId, data);
            document.getElementById(close)?.click()
            router.refresh();
        } catch (error) {
            form.setError("root", {
                type: "validate",
                message: "Somethin went wrong",
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
                <Button className="w-full mt-2">Add skill</Button>
            </form>
        </Form>
    )
}
