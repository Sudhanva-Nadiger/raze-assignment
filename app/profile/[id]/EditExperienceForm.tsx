"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { editUserExperience, deleteUserExperience } from '@/app/api/actions';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

import { EditExperienceFormData, editExperienceFormSchema } from "@/lib/zodSchema";
import { useRouter } from 'next/navigation';
import Loader from "../../../components/ui/Loader";
import { Button } from "../../../components/ui/button";
import { Input } from "@/components/ui/input";


export default function EditExperienceForm({
    id,
    position,
    close
}: {
    id: number;
    close: string
    position: Omit<{
        id: number;
        title: string;
        startDate: string;
        endDate: string | null;
        description: string | null;
        userId: number | null;
        location: string | null;
        company: string;
    }, "company">
}) {
    const form = useForm<EditExperienceFormData>({
        resolver: zodResolver(editExperienceFormSchema),
        defaultValues: {
            description: position.description || "",
            startDate: position.startDate || "",
            endDate: position.endDate || "",
            title: position.title || "",
            location: position.location || "",
        },
    });

    const router = useRouter();

    const handleSubmit: SubmitHandler<EditExperienceFormData> = async (data) => {
        try {
            await editUserExperience(id, data);
            document.getElementById(close)?.click()
            router.refresh();
        } catch (error) {
            form.setError("root", {
                type: "validate",
                message: "Somethin went wrong",
            });
        }
    }

    const handleDelete = async () => {
        console.log(id);
        
        try {
            await deleteUserExperience(id);
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

            <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full sm:w-[420px]">
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
                                    type="datetime"
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
                                    type="datetime"
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
