import { getCollaboratingWorkspaces, getFolderDetails, getFolders, getPrivateWorkspaces, getSharedWorkspaces, getUserSubscriptionStatus } from "@/app/lib/supabase/queries";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";
import WorkspaceDropdown from "./workspace-dropdown";


interface SidebarProps{
    params:{WorkspaceId:string};
    className?:string;
}


const Sidebar:React.FC<SidebarProps>= async ({params,className})=> {
    const supabase = createServerComponentClient({cookies})

    const {
        data:{user},
    }  = await supabase.auth.getUser();
    if(!user) return;


    const {
        data:subscriptionData , error:subsciptionError
    } = await getUserSubscriptionStatus(user.id);

    const {
        data:workspaceFolderData ,error:foldersError
    } = await getFolders(params.WorkspaceId)

    if(subsciptionError || foldersError) redirect('/dashboard')


        const [privateWorkspaces, collaboratingWorkspaces, sharedWorkspaces] =
        await Promise.all([
          getPrivateWorkspaces(user.id),
          getCollaboratingWorkspaces(user.id),
          getSharedWorkspaces(user.id),
        ]);
    

        return (
            <aside className={twMerge('hidden sm:flex sm:flex-col w-[280px] shrink-0 p-4 md:gap-4 !justify-between',className)}>
              <div>
                <WorkspaceDropdown privateWorkspaces={privateWorkspaces}
                sharedWorkspaces={sharedWorkspaces}
                collaboratingWorkspaces={collaboratingWorkspaces}
                defaultValue={
                  [...privateWorkspaces,
                  ...collaboratingWorkspaces,
                  ...sharedWorkspaces].find((workspace)=>workspace.id === params.WorkspaceId)
                }>

                </WorkspaceDropdown>
              </div>
            </aside>
          );
        };


export default Sidebar;