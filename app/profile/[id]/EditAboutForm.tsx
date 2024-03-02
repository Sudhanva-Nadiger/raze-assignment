"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { editUserAbout } from '@/app/api/actions';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

import { EditAboutFormData, editAboutFormSchema } from "@/lib/zodSchema";
import { useRouter } from 'next/navigation';
import Loader from "../../../components/ui/Loader";
import { Button } from "../../../components/ui/button";


export default function EditAboutForm({
    userId,
    description
}: {
    userId: number;
    description?: string | null;
}) {
    const form = useForm<EditAboutFormData>({
        resolver: zodResolver(editAboutFormSchema),
        defaultValues: {
            about: description || "",
        },
    });

    const router = useRouter();

    const handleSubmit: SubmitHandler<EditAboutFormData> = async (data) => {
        try {
            await editUserAbout(userId, data.about);
            document.getElementById("edit-about-close")?.click()
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

            <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
                <FormField
                    control={form.control}
                    name="about"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <textarea
                                    className="w-full p-2 rounded border"
                                    id="description"
                                    placeholder="Write something about yourself"
                                    {...field}
                                    rows={7}
                                ></textarea>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-full">Save</Button>
            </form>
        </Form>
    )
}
