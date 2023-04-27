export interface IUpdatePostDTO {
    id: number;
    title?: string;
    summary?: string;
    content?: string;
    requester_id: number;
}