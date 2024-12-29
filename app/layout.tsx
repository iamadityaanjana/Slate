
import type { Metadata } from "next";
import { DM_Sans} from "next/font/google";
import "./globals.css";
import db from "./lib/supabase/db";
import { ThemeProvider } from "./lib/providers/next-theme";


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
        className={inter.className}
      >
        <ThemeProvider 
        attribute="class"
        defaultTheme="light"
        enableSystem
        forcedTheme="dark"
        >
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}


