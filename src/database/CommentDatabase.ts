import { CommentDB } from "../models/Comment"
import { BaseDatabase } from "./BaseDatabase"

export class CommentDatabase extends BaseDatabase{
    public static TABLE_COMMENTS = "comments"

    public async getComments(){
        const commentsDB = await BaseDatabase
        .connection(CommentDatabase.TABLE_COMMENTS)

        return commentsDB
    }

    public async getCommentsById(id: string){
        const commentDB = await BaseDatabase
        .connection(CommentDatabase.TABLE_COMMENTS)
        .select(
            "comments.*",
            "users.id AS userId",
            "users.name"
        )
        .from(CommentDatabase.TABLE_COMMENTS)
        .where("comments.comment_id", "=", id)
        .innerJoin("users", "comments.user_id","=","users.id")
        .first()

        return commentDB as CommentDB
    }

    public async createComment(
        newCommentDB: CommentDB
      ): Promise<void> {
        await BaseDatabase
          .connection(CommentDatabase.TABLE_COMMENTS)
          .insert(newCommentDB)
      }

      public async editComment(commentDB: CommentDB, idToEdit: string ) {
        await BaseDatabase
          .connection(CommentDatabase.TABLE_COMMENTS)
          .update(commentDB)
          .where({ id: idToEdit })
      }

      public async deleteComment(idToDelete: string ) {
        await BaseDatabase
          .connection(CommentDatabase.TABLE_COMMENTS)
          .delete()
          .where({ id: idToDelete })
      }
}