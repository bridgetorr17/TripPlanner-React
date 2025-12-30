import { UserType } from "../../../shared/types/User"

export interface ContributorsProps {
    editMode: boolean;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    contributorsInit: UserType[];
    creator: string;
    tripId: string;
}

export interface ContributorsInputProps {
    creator: string;
    contributorNames: string[];
    setContributorNames: React.Dispatch<React.SetStateAction<string[]>>;
}