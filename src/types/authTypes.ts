import { RoomTypes } from "@/libs/firebase/Mutate";

export interface UserType {
    id: number;
    name: string;
    email: string;
    phone: string;
}
export interface ActiveChateUserType extends RoomTypes {
    id: string;
    user?: UserType; 
}