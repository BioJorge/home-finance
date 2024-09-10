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
    moneyType: z.enum(["USD", "BRL", "EUR", ""]),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: "Passwords do not match.",
    path: ["confirmedPassword"], // Isso especifica que a mensagem de erro deve ser associada ao campo 'confirmedPassword'
  })
  .refine((data) => data.moneyType !== "", {
    message: "Money type cannot be empty.",
    path: ["moneyType"], // Isso especifica que a mensagem de erro deve ser associada ao campo 'moneyType'
  });

export default function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-fit w-8/12 flex flex-col gap-4"
      >
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

        <Button type="submit" className="w-fit px-12 mx-auto">
          Submit
        </Button>
      </form>
    </Form>
  );
}
