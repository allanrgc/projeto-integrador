import { CommentDB } from "../models/Comment"
import { BaseDatabase } from "./BaseDatabase"
import { PostDatabase } from "./PostDatabase"
import { UserDatabase } from "./UserDatabase"

export class CommentDatabase extends BaseDatabase{
    public static TABLE_COMMENTS = "comments"

    public async getComments(){
        const commentsDB = await BaseDatabase
        .connection(CommentDatabase.TABLE_COMMENTS)

        return commentsDB
    }

    // public async getCommentsById(id: string): Promise<CommentDB | undefined>{
    public async getCommentsById(id: string): Promise<any>{
        const [commentDB] = await BaseDatabase
        .connection(CommentDatabase.TABLE_COMMENTS)
        .select(
            // "comments.*",
            // "users.id",
            // "users.name",
            // "posts.post_id",
            // `${CommentDatabase.TABLE_COMMENTS}.*`,
            // `${UserDatabase.TABLE_USERS}.name as creator_name`,
            // `${UserDatabase.TABLE_USERS}.id`,
            // `${PostDatabase.TABLE_POSTS}.post_id`

        )
        // .join(
        //     `${UserDatabase.TABLE_USERS}`,
        //     `${CommentDatabase.TABLE_COMMENTS}.user_id`, 
        //     "=",
        //     `${UserDatabase.TABLE_USERS}.id`
        // )
        // .join(
        //     `${PostDatabase.TABLE_POSTS}`,
        //     `${CommentDatabase.TABLE_COMMENTS}.post_id`, 
        //     "=",
        //     `${PostDatabase.TABLE_POSTS}.post_id`
        // )
        .from(CommentDatabase.TABLE_COMMENTS)
        .where("comments.comment_id", "=", id)
        // .where({ [`${CommentDatabase.TABLE_COMMENTS}.id`]: id })

        .innerJoin("users", "comments.user_id","=","users.id")
        .innerJoin("posts", "comments.post_id", "=", "posts.post_id")
        .first()

        // return commentDB as CommentDB | undefined
        return commentDB

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