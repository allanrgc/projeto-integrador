import z from "zod"
import { PostModel } from "../../models/Post"

export interface EditPostInputDTO{
    idToEdit: string,
        content?: string,
        token: string | undefined
}

export interface EditPostOutputDTO{
    message: string,
      post: PostModel
    }

    export const EditPostSchema = z.object({
        idToEdit: z.string(),
        content: z.string().min(1).optional(),
    }).transform(data => data as EditPostInputDTO)