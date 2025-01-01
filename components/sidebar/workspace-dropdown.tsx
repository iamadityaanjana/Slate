'use client'
import { workspace } from "@/app/lib/supabase/supabase.types";
import { useAppState } from "@/lib/providers/state-provider";
import { useEffect, useState } from "react";
import SelectedWorkspace from "./selected-workspace";

interface workspaceDropdownProps{
    privateWorkspaces: workspace[] | [];
    sharedWorkspaces: workspace[] | [];
    collaboratingWorkspaces: workspace[] | [];
    defaultValue: workspace | undefined;
}

const WorkspaceDropdown:React.FC<workspaceDropdownProps>=({privateWorkspaces,collaboratingWorkspaces,sharedWorkspaces,defaultValue})=> {
    const { dispatch, state } = useAppState();
    const [selectedOption, setSelectedOption] = useState(defaultValue);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!state.workspaces.length) {
          dispatch({
            type: 'SET_WORKSPACES',
            payload: {
              workspaces: [
                ...privateWorkspaces,
                ...sharedWorkspaces,
                ...collaboratingWorkspaces,
              ].map((workspace) => ({ ...workspace, folders: [] })),
            },
          });
        }
      }, [privateWorkspaces, collaboratingWorkspaces, sharedWorkspaces]);


      const handleSelect = (option: workspace) => {
        setSelectedOption(option);
        setIsOpen(false);
      };
    
      useEffect(() => {
        const findSelectedWorkspace = state.workspaces.find(
          (workspace) => workspace.id === defaultValue?.id
        );
        if (findSelectedWorkspace) setSelectedOption(findSelectedWorkspace);
      }, [state, defaultValue]);

    return ( 
        <div className="relative
        inline-block
        text-left">
            <div>
                <span onClick={()=>setIsOpen(!isOpen)}>
                    {selectedOption? (<SelectedWorkspace workspace={selectedOption}/>) : ('Select a workspace')}
                </span>
            </div>
        </div>
     );
}

export default WorkspaceDropdown;