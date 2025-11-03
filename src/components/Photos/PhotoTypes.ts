import { PhotoType } from "../../../shared/types/Photo"

export interface PhotoProps {
    tripId: string;
    editMode: boolean;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    photosInit: PhotoType[];
    loggedInUser: string;
}