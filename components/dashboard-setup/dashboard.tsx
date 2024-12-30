'use client'
import { AuthUser } from "@supabase/supabase-js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "../ui/form";
import EmojiPicker from "../global/emoji-picker";
import { useState } from "react";

interface DashboardSetupProps{
    user:AuthUser;
    subscription:{} | null;
}

const DashboardSetup:React.FC<DashboardSetupProps> = ({subscription,user})=>{
    const [selectedEmoji , setSelectedEmoji] = useState('');
    return(
        <Card className="w-[800px]
        h-screen
        sm:h-auto
        ">
            <CardHeader>
                <CardTitle>
                    Create a workspace
                </CardTitle>
                <CardDescription>Let's create a workspace. You can add collaborators later.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={()=>{}}>
                        <div className="flex
                    flex-col
                    gap-4">
                        <div className="text-5xl">
                            <EmojiPicker getValue={(emoji)=>setSelectedEmoji(emoji)}>{selectedEmoji}</EmojiPicker>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default DashboardSetup