import { getCollaboratingWorkspaces, getFolderDetails, getFolders, getPrivateWorkspaces, getSharedWorkspaces, getUserSubscriptionStatus } from "@/app/lib/supabase/queries";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";
import WorkspaceDropdown from "./workspace-dropdown";

import PlanUsage from "./plan-usage";
import NativeNavigation from "./native-navigation";
import FoldersDropdownList from "./folder-dropdown-list";
import { ScrollArea } from "../ui/scroll-area";


interface SidebarProps{
    params:{WorkspaceId:string};
    className?:string;
}


const Sidebar:React.FC<SidebarProps>= async ({params,className})=> {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data: subscriptionData, error: subscriptionError } =
    await getUserSubscriptionStatus(user.id);

  //folders
  const { data: workspaceFolderData, error: foldersError } = await getFolders(
    params.WorkspaceId
  );
    
    // if(subscriptionError || foldersError){
    //   console.log('error ')
    //   console.log(subscriptionError)
    //   console.log(foldersError)
    //   redirect('/hehe')
    // }
    

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
              <PlanUsage
          foldersLength={workspaceFolderData?.length || 0}
          subscription={subscriptionData}
        />

            <NativeNavigation myWorkspaceId={params.WorkspaceId} />

            <ScrollArea
          className="overflow-scroll relative
          h-[450px]
        "
        >
          <div
            className="pointer-events-none 
          w-full 
          absolute 
          bottom-0 
          h-20 
          bg-gradient-to-t 
          from-background 
          to-transparent 
          z-40"
          />
          <FoldersDropdownList
            workspaceFolders={workspaceFolderData || []}
            workspaceId={params.WorkspaceId}
          />
        </ScrollArea>
              </div>
            </aside>
          );
        };


export default Sidebar;