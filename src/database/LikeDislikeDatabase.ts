import { BaseDatabase } from "./BaseDatabase";

export class LikeDislikeDatabase extends BaseDatabase {
    public static TABLE_LIKES_DISLIKES = "likes_dislikes"

  public async likePost(userId: string, postId: string) {
    await BaseDatabase.connection(LikeDislikeDatabase.TABLE_LIKES_DISLIKES).insert({
      user_id: userId,
      post_id: postId,
      likes: 1,
    });

    await BaseDatabase.connection(LikeDislikeDatabase.TABLE_LIKES_DISLIKES)
      .where('post_id', postId)
      .increment('likes', 1);
  }

  public async dislikePost(userId: string, postId: string) {
    await BaseDatabase.connection(LikeDislikeDatabase.TABLE_LIKES_DISLIKES).insert({
      user_id: userId,
      post_id: postId,
      likes: -1,
    });

    await BaseDatabase.connection(LikeDislikeDatabase.TABLE_LIKES_DISLIKES)
      .where('post_id', postId)
      .decrement('likes', 1);
  }
}

