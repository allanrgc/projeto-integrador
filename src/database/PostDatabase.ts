import { LikeDislikeDB, POST_LIKE, PostDB, PostDBWithCreatorName } from "../models/Post"
import { BaseDatabase } from "./BaseDatabase"
import { UserDatabase } from "./UserDatabase";

export class PostDatabase extends BaseDatabase{
    public static TABLE_POSTS = "posts"
    public static TABLE_LIKES_DISLIKES = "likes_dislikes"

    public async getPosts(){
        const postsDB = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)

        return postsDB
    }

    public async getPostsById(id: string){
        const postDB = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .select(
            "posts.*",
            "users.id AS userId",
            "users.name",
            "users.email",
            "users.role",
            "users.created_at",
        )
        .where("posts.post_id", "=", id)
        .innerJoin("users", "posts.creator_id","=","users.id")
        .first()

        return postDB as PostDB
    }

    public async createPost(
        newPostDB: PostDB
      ): Promise<void> {
        await BaseDatabase
          .connection(PostDatabase.TABLE_POSTS)
          .insert(newPostDB)
      }

      public async editPost(postDB: PostDB) {
        await BaseDatabase
          .connection(PostDatabase.TABLE_POSTS)
          .update(postDB)
          .where({ id: postDB.post_id })
      }

      public async deletePost(idToDelete: string ) {
        await BaseDatabase
          .connection(PostDatabase.TABLE_POSTS)
          .delete()
          .where({ id: idToDelete })
      }

      public findPostWithCreatorNameById =
    async (id: string): Promise<PostDBWithCreatorName | undefined> => {

    const [result] = await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .select(
        `${PostDatabase.TABLE_POSTS}.id`,
        `${PostDatabase.TABLE_POSTS}.creator_id`,
        `${PostDatabase.TABLE_POSTS}.name`,
        `${PostDatabase.TABLE_POSTS}.likes`,
        `${PostDatabase.TABLE_POSTS}.dislikes`,
        `${PostDatabase.TABLE_POSTS}.created_at`,
        `${PostDatabase.TABLE_POSTS}.updated_at`,
        `${UserDatabase.TABLE_USERS}.name as creator_name`
      )
      .join(
        `${UserDatabase.TABLE_USERS}`,
        `${PostDatabase.TABLE_POSTS}.creator_id`, 
        "=",
        `${UserDatabase.TABLE_USERS}.id`
      )
      .where({ [`${PostDatabase.TABLE_POSTS}.id`]: id })
    
    return result as PostDBWithCreatorName | undefined
  }

  public findLikeDislike = async (
    likeDislikeDB: LikeDislikeDB
  ): Promise<POST_LIKE | undefined> => {

    const [result]: Array<LikeDislikeDB | undefined> = await BaseDatabase
      .connection(PostDatabase.TABLE_LIKES_DISLIKES)
      .select()
      .where({
        user_id: likeDislikeDB.user_id,
        post_id: likeDislikeDB.post_id
      })

    if (result === undefined) {
      return undefined

    } else if (result.like === 1) {
      return POST_LIKE.ALREADY_LIKED
      
    } else {
      return POST_LIKE.ALREADY_DISLIKED
    }
  }

  public removeLikeDislike = async (
    likeDislikeDB: LikeDislikeDB
  ): Promise<void> => {
    await BaseDatabase
      .connection(PostDatabase.TABLE_LIKES_DISLIKES)
      .delete()
      .where({
        user_id: likeDislikeDB.user_id,
        post_id: likeDislikeDB.post_id
      })
  }

  public updateLikeDislike = async (
    likeDislikeDB: LikeDislikeDB
  ): Promise<void> => {
    await BaseDatabase
      .connection(PostDatabase.TABLE_LIKES_DISLIKES)
      .update(likeDislikeDB)
      .where({
        user_id: likeDislikeDB.user_id,
        post_id: likeDislikeDB.post_id
      })
  }

  public insertLikeDislike = async (
    likeDislikeDB: LikeDislikeDB
  ): Promise<void> => {
    await BaseDatabase
      .connection(PostDatabase.TABLE_LIKES_DISLIKES)
      .insert(likeDislikeDB)
  }
}