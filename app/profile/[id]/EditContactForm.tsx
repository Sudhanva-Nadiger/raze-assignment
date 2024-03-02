"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { editUserContactInfo } from '@/app/api/actions';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { User } from "@/lib/db";
import { editContactFormSchema, EditFormData } from "@/lib/zodSchema";
import { useRouter } from 'next/navigation';
import { Button } from "../../../components/ui/button";
import Loader from "../../../components/ui/Loader";


export default function EditContactForm({
    user
}:{
    user: User;
}) {
  const form = useForm<EditFormData>({
    resolver: zodResolver(editContactFormSchema),
    defaultValues: {
        email: user.email || "",
        phone: user.phone || "",
        website: user.website || "",
        address: user.address || "",
    },
  });

  const router = useRouter();

  const handleSubmit: SubmitHandler<EditFormData> = async (data) => {
    try {
        await editUserContactInfo(user.id, data);
        document.getElementById("edit-contact-form-close")?.click()
        router.refresh();
    } catch (error) {
      form.setError("root", {
        type: "validate",
        message: "Somethin went wrong",
      });
    }
  }

  const { errors, isSubmitting } = form.formState;

  if(isSubmitting) {
    return <Loader />
  }

  return (
    <Form {...form}>
      {errors.root && <p className='text-red-500'>{errors.root.message}</p>}
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 flex w-full items-center justify-center flex-col">
        <div className="flex flex-col w-full gap-1 border-1 border p-2 my-2 rounded shadow-sm bg-blue-50">
          <div className="flex flex-col justify-between">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="Website" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" disabled={isSubmitting}>Save</Button>
      </form>
    </Form>
  )
}
