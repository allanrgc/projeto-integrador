import z from "zod"
import { PostModel } from "../../models/Post"

export interface DeletePostInputDTO{
    idToDelete: string,
    token: string | undefined
}

export interface DeletePostOutputDTO{
    message: string,
    post: {
        id: string,
        creator_id: string,
        content: string,
        likes: number,
        dislikes: number,
        created_at: string,
        updated_at: string
    }
    }

    export const DeletePostSchema = z.object({
        idToDelete: z.string(),
        token: z.string()
    }).transform(data => data as DeletePostInputDTO)