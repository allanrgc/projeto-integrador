import z from "zod"
import { PostModel } from "../../models/Post"

export interface CreatePostInputDTO{
        content: string,
        token: string
}

export interface CreatePostOutputDTO{
    message: string,
      post: PostModel
    //   {
    //     id: string,
    //     content: string,
    //     likes: number,
    //     dislikes: number,
    //     createdAt: string,
    //     updatedAt: string,
    //     creator:{
    //         id: string,
    //         name: string
    //     }
    //   }
    }

    export const CreatePostSchema = z.object({
        content: z.string().min(1)
    }).transform(data => data as CreatePostInputDTO)