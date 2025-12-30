import { UserType } from "./User.js";
import { LocationType } from "./Location.js";
import { MemoryType } from "./Memory.js";
import { PhotoType } from "./Photo.js";

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

export type TripRes = {
    success: boolean;
    trip: TripType;
    currentUser: {
        userName: string | null,
        userStatus: 'owner' | 'viewer' | 'contributor'
    } | null
}