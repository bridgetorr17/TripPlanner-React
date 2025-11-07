import { UserType } from "../../../shared/types/User"

export interface ContributorsProps {
    editMode: boolean;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    contributors: UserType[];
    setContributors: 
}