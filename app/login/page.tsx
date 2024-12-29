'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import { FormSchema } from "@/lib/types";
import Image from "next/image";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
  } from '@/components/ui/form';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/global/loader";
import { actionLoginUser } from '@/lib/server-actions/auth-action';
import Logo from '@/public/Logo.svg'




const LoginPage=()=>{
    const router = useRouter();
    const [submitError, setsubmitError] = useState('');
    const form = useForm<z.infer<typeof FormSchema>>({
        mode:'onChange',
        resolver:zodResolver(FormSchema),
        defaultValues:{email:'',password:''}
    })
    const isLoading = form.formState.isSubmitting;

    const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (
      formData
    ) => {
      const { error } = await actionLoginUser(formData);
      if (error) {
        form.reset();
        setsubmitError(error.message);
      }
      router.replace('/dashboard');
    };

    return (
        <Form {...form}>
          <form
            onChange={() => {
              if (submitError) setsubmitError('');
            }}
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col mx-auto justify-center sm:p-4 min-h-screen"
          >
            <Link
              href="/"
              className="
              w-full
              flex
              justify-left
              items-center"
            >
              <Image
                src={Logo}
                alt="cypress Logo"
                width={50}
                height={50}
              />
              <span
                className="font-semibold
              dark:text-white text-4xl first-letter:ml-2"
              >
                Slate.
              </span>
            </Link>
            <FormDescription
              className="
            text-foreground/60"
            >
              An all-In-One Collaboration and Productivity Platform
            </FormDescription>
            <FormField
              disabled={isLoading}
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {submitError && <FormMessage>{submitError}</FormMessage>}
            <Button
              type="submit"
              className="w-full p-6"
              size="lg"
              disabled={isLoading}
            >
              {!isLoading ? 'Login' : <Loader />}
            </Button>
            <span className="self-container">
              Dont have an account?{' '}
              <Link
                href="/signup"
                className="text-primary"
              >
                Sign Up
              </Link>
            </span>
          </form>
        </Form>
      );
    };
    

export default LoginPage