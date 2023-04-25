declare namespace Express {
    export interface Request {
        user_id: number;
        file_props: { file_type: string, file_name: string }
    }
}