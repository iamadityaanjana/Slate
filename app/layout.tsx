export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import { DM_Sans} from "next/font/google";
import "./globals.css";
// import db from "./lib/supabase/db";
import { ThemeProvider } from "../lib/providers/next-theme";
import AppStateProvider from "@/lib/providers/state-provider";
import { twMerge } from "tailwind-merge";
import { SupabaseUserProvider } from "@/lib/providers/supabase-user-provider";
import { SocketProvider } from '@/lib/providers/socket-provider';

const inter = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Slate",
  description: "Minimal & Collaborative note-taking app",
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // console.log(db)
  return (
    <html lang="en">
      <body
        className={twMerge('bg-background', inter.className)}
      >
        <ThemeProvider 
        attribute="class"
        defaultTheme="dark"
        enableSystem
        forcedTheme="dark"
        >
        <AppStateProvider>
          <SupabaseUserProvider>
            <SocketProvider>
        {children}
        </SocketProvider>
        </SupabaseUserProvider>
        </AppStateProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


