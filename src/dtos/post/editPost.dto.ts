import z from "zod"
import { PostModel } from "../../models/Post"

export interface EditPostInputDTO{
    id: string,
    content?: string,
    token: string | undefined
}

export interface EditPostOutputDTO{
    message: string,
      post: PostModel
    }

    export const EditPostSchema = z.object({
        id: z.string(),
        content: z.string().min(1).optional(),
    }).transform(data => data as EditPostInputDTO)