"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { createUserFormSchema, CreateFormData } from "@/lib/zodSchema"
import { createUser } from "@/app/api/actions"
import { useRouter } from 'next/navigation'


export default function ProfileForm() {
  const form = useForm<CreateFormData>({
    resolver: zodResolver(createUserFormSchema),
    defaultValues: {
      firstName: "",
    },
  })

  const router = useRouter();

  const handleSubmit: SubmitHandler<CreateFormData> = async (data) => {
    try {
      const id = (await createUser(data))[0].id;
      router.push(`/profile/${id}`);
    } catch (error) {
      form.setError("root", {
        type: "validate",
        message: "Somethin went wrong",
      });
    }
  }

  const { errors } = form.formState;

  return (
    <Form {...form}>
      {errors.root && <p className='text-red-500'>{errors.root.message}</p>}
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 flex items-center justify-center flex-col w-screen bg-blue-100">
        <div className="flex flex-col w-full sm:w-1/2 gap-1 items-center justify-center border-1 border p-2 my-2 rounded shadow-sm bg-blue-50">
          <div className="flex flex-col sm:flex-row justify-between w-full">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="sm:w-1/2">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="sm:w-1/2">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="headline"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Headline</FormLabel>
                <FormControl>
                  <Input placeholder="Headline" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pronoun"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Pronoun</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}  {...field}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your pronoun" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="He/Him">He/Him</SelectItem>
                      <SelectItem value="She/Her">She/Her</SelectItem>
                      <SelectItem value="They/Them">They/Them</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <h2 className="self-start mt-3 text-blue-500">Contact Information</h2>
          <div className="flex flex-wrap justify-between">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="sm:w-1/2 w-full">
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
                <FormItem className="sm:w-1/2 w-full">
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
                <FormItem className="sm:w-1/2 w-full">
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
                <FormItem className="sm:w-1/2 w-full">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button 
            disabled={form.formState.isSubmitting} 
            className="w-full" 
            type="submit"
          >
              Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}
