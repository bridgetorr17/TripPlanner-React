import { UserType } from "../../../shared/types/User"

export interface ContributorsProps {
    editMode: boolean;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    contributorsInit: UserType[];
    tripId: string;
}

export interface ContributorsInputProps {
    contributorNames: string[];
    setContributorNames: React.Dispatch<React.SetStateAction<string[]>>;
}