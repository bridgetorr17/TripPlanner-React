import { MemoryType } from "../../../shared/types/Memory"

export interface MemoryProps {
    memory: MemoryType;
    loggedInUser: string;
    tripId: string;
    deleteMemory: (id: string) => Promise<void>;
}

export interface MemoriesProps {
    editMode: boolean;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    memoriesInit: MemoryType[];
    tripId: string;
    loggedInUser: string;
}