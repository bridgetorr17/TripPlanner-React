export type MemoryType = {
    _id?: string;
    text: string;
    user?: {
        _id: string;
        userName: string;
        profilePicture: string;
    };
    location: string;
}