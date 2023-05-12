import z from "zod"
import { CommentModel } from "../../models/Comment"

export interface EditCommentInputDTO{
    idToEdit: string,
        comment?: string,
        token: string | undefined
}

export interface EditCommentOutputDTO{
    message: string,
      comment: CommentModel
    }

    export const EditCommentSchema = z.object({
        idToEdit: z.string(),
        content: z.string().min(1).optional(),
    }).transform(data => data as EditCommentInputDTO)