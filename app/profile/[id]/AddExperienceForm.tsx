"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { createExperience } from '@/app/api/actions';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

import { AddExperienceFormData, addExperienceFormSchema } from "@/lib/zodSchema";
import { useRouter } from 'next/navigation';
import Loader from "../../../components/ui/Loader";
import { Button } from "../../../components/ui/button";
import { Input } from "@/components/ui/input";


export default function AddExperienceForm({
    userId,
    close,
}: {
    userId: number,
    close: string;
}) {
    const form = useForm<AddExperienceFormData>({
        resolver: zodResolver(addExperienceFormSchema),
        defaultValues: {
            description: "",
            startDate: "",
            endDate:  "",
            title: "",
            location: ""
        },
    });

    const router = useRouter();

    const handleSubmit: SubmitHandler<AddExperienceFormData> = async (data) => {
        try {
            await createExperience(userId, data);
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
                    name="company"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Company name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Title"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Starting Date</FormLabel>
                            <FormControl>
                                <Input
                                    type="date"
                                    placeholder="Start Date"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>End Date</FormLabel>
                            <FormControl>
                                <Input
                                    type="date"
                                    placeholder="End Date"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Location"
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
                            <FormLabel>Description</FormLabel>
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
                <Button className="w-full mt-2">Save</Button>
            </form>
        </Form>
    )
}
