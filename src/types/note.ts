import { Tag } from "./tag";

export interface Note {
    title:string;
    content: string;
    tags: Tag[];
    color: string;
    priority: string;
    isPinned: boolean;
    isRead: boolean;
    date: string;
    //처음에는 null이었다 edit해주면 바뀜
    createdTime: number;
    editedTime: null | number;
    id: string;
}