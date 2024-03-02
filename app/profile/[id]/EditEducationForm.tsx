"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { editUserEducation, deleteUserEducation } from '@/app/api/actions';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

import { EducationFormData as EditEducationFormData,educationFormSchema as editEducationFormSchema } from "@/lib/zodSchema";
import { useRouter } from 'next/navigation';
import Loader from "../../../components/ui/Loader";
import { Button } from "../../../components/ui/button";
import { Input } from "@/components/ui/input";


export default function EditEducationForm({
    id,
    education,
    close,
}: {
    id: number,
    close: string;
    education: {
        id: number;
        school: string;
        degree: string;
        fieldOfStudy: string | null;
        startDate: string;
        endDate: string | null;
        description: string | null;
        userId: number | null;
    },
}) {
    const form = useForm<EditEducationFormData>({
        resolver: zodResolver(editEducationFormSchema),
        defaultValues: {
            description: education.description || "",
            startDate: education.startDate || "",
            endDate:  education.endDate || "",
            degree: education.degree || "",
            fieldOfStudy: education.fieldOfStudy || "",
            school: education.school || "",
        },
    });

    const router = useRouter();

    const handleSubmit: SubmitHandler<EditEducationFormData> = async (data) => {
        try {
            await editUserEducation(id, data);
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
        try {
            await deleteUserEducation(id);
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
                    name="school"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>School Name</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="School"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="degree"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Degree</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Degree ex: Btech"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="fieldOfStudy"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Field of Study</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Field of Study"
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
