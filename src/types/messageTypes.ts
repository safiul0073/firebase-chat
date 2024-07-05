export interface MessageTypes {
    type: string;
    text?: string;
    files?: File[];
    sender_id: number;
    receiver_id: number;
    room_id: string;
    created_at?: Date;
}