import {drizzle} from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as schema from '@/migrations/schema'
import {migrate} from 'drizzle-orm/postgres-js/migrator';

//configuring dotenv 
dotenv.config({path:".env"})

//checking if there is database url present
if(!process.env.DATABASE_URL){
    console.log("No database url found. Add url in .env file of your project");
}

const client = postgres(process.env.DATABASE_URL as string , {max:1})
const db = drizzle(client);
const migrateDB = async ()=>{
    try{
        console.log("migrating database")
        await migrate(db, {migrationsFolder:'migrations'})
        console.log("migrating database successfuly")
    }catch (error){
        console.log(`"error while migrating database , error is ${error}"`)
    }
    
}
migrateDB();

export default db;