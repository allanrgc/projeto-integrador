import z from "zod"
import { CommentModel } from "../../models/Comment"

export interface CreateCommentInputDTO{
        comment: string,
        token: string
}

export interface CreateCommentOutputDTO{
    message: string,
      comment: CommentModel
    }

    export const CreateCommentSchema = z.object({
        comment: z.string().min(1)
    }).transform(data => data as CreateCommentInputDTO)