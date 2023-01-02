export enum roles{
    Guest,
    Customer,
    Manager,
    Admin
}

export interface Users {
    uid: string;
    username: string;
    role: Array<roles>;
}
