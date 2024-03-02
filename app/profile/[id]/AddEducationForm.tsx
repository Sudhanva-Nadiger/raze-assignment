"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { createEducation } from '@/app/api/actions';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

import { EducationFormData as AddEducationFormData, educationFormSchema as addEducationFormSchema } from "@/lib/zodSchema";
import { useRouter } from 'next/navigation';
import Loader from "../../../components/ui/Loader";
import { Button } from "../../../components/ui/button";
import { Input } from "@/components/ui/input";


export default function AddEducationForm({
    userId,
    close,
}: {
    userId: number,
    close: string;
}) {
    const form = useForm<AddEducationFormData>({
        resolver: zodResolver(addEducationFormSchema),
        defaultValues: {
            description: "",
            startDate: "",
            endDate:  "",
            degree: "",
            fieldOfStudy: "",
            school: ""
        },
    });

    const router = useRouter();

    const handleSubmit: SubmitHandler<AddEducationFormData> = async (data) => {
        try {
            await createEducation(userId, data);
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
                <Button className="w-full mt-2">Add Education</Button>
            </form>
        </Form>
    )
}
