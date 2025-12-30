import { UserType } from "./User";
import { LocationType } from "./Location";
import { MemoryType } from "./Memory";
import { PhotoType } from "./Photo";

export type TripType = {
    _id: string;
    name: string;
    subtitle?: string;
    owner: {
        _id: string;
        userName: string;
    };
    contributors: UserType[];
    locations: LocationType[];
    month: "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December";
    year: number;
    memories: MemoryType[];
    photos: PhotoType[];
}