// importing all libraries
import { defineConfig } from 'drizzle-kit';
import * as dotenv from "dotenv";

// configuring dotenv 
dotenv.config({ path: ".env" });

// checking if there is database url present
if (!process.env.DATABASE_URL) {
    console.log("No database url found. Add url in .env file of your project");
}

// exporting configurations with path, driver and database credentials
export default defineConfig({
    dialect: "postgresql",
    schema: "./app/lib/supabase/schema.ts",
    out: "./migrations",
    dbCredentials: {
        url: process.env.DATABASE_URL || "",
    },
});