"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

const FormSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Invalid email address.",
    }),
    dateOfBirth: z.string().optional(),
    sex: z.string().optional(),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmedPassword: z.string(),
    currency: z.enum(["USD", "BRL", "EUR", ""]),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: "Passwords do not match.",
    path: ["confirmedPassword"], // Isso especifica que a mensagem de erro deve ser associada ao campo 'confirmedPassword'
  })
  .refine((data) => data.currency !== "", {
    message: "Money type cannot be empty.",
    path: ["currency"], // Isso especifica que a mensagem de erro deve ser associada ao campo 'currency'
  });

export default function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
      confirmedPassword: "",
      dateOfBirth: "",
      sex: "",
      currency: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-fit w-8/12 flex flex-col gap-4 py-8"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="">
              <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
                <FormLabel className="font-bold text-primary">
                  Username
                </FormLabel>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
              </div>

              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="">
              <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
                <FormLabel className="font-bold text-primary">Name</FormLabel>
                <FormDescription>Please enter your full name.</FormDescription>
              </div>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="font-bold text-primary">E-mail</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="font-bold text-primary">Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="*******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmedPassword"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="font-bold text-primary">
                Please confirm your password
              </FormLabel>
              <FormControl>
                <Input type="password" placeholder="*******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="w-fit">
              <FormLabel className="font-bold text-primary">
                Date of Birth
              </FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-primary font-bold">
                  Currency
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="EUR" />
                      </FormControl>
                      <FormLabel className="font-normal">EUR</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="USD" />
                      </FormControl>
                      <FormLabel className="font-normal">USD</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="BRL" />
                      </FormControl>
                      <FormLabel className="font-normal">BRL</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-primary font-bold">Sex</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="male" />
                      </FormControl>
                      <FormLabel className="font-normal">Male</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="female" />
                      </FormControl>
                      <FormLabel className="font-normal">Female</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="undefined" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Rather not say
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-fit px-12 mx-auto mt-6">
          Submit
        </Button>
      </form>
    </Form>
  );
}
