export type PhotoType = {
    _id: string;
    user: {
        _id: string;
        userName: string;
    };
    url: string;
}