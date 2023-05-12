import z from "zod"
import { CommentModel } from "../../models/Comment"

export interface DeleteCommentInputDTO{
    idToDelete: string,
    token: string | undefined
}

export interface DeleteCommentOutputDTO{
    message: string,
    comment: {
        comment_id: string,
        user_id: string,
        post_id: string,
        comment: string,
        created_at: string,
    }
    }

    export const DeleteCommentSchema = z.object({
        idToDelete: z.string(),
        token: z.string()
    }).transform(data => data as DeleteCommentInputDTO)