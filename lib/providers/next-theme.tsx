'use client';
import * as React from 'react'
// import {ThemeProvider as NextThemeProvider} from 'next-themes';
import { type ThemeProviderProps } from 'next-themes';
import dynamic from 'next/dynamic';

const NextThemeProvider = dynamic(
	() => import('next-themes').then((e) => e.ThemeProvider),
	{
		ssr: false,
	}
)
export function ThemeProvider({children,...props}:ThemeProviderProps){
    return(
        <NextThemeProvider {...props}>
            {children}
        </NextThemeProvider>
    )
}