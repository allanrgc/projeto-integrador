import { LikeDislikeDatabase } from "../database/LikeDislikeDatabase";

export class LikeDislikeBusiness {
  constructor(
    private likeDislikeDatabase: LikeDislikeDatabase
  ) {}

  public async likePost(userId: string, postId: string){
    await this.likeDislikeDatabase.likePost(userId, postId);
  }

  public async dislikePost(userId: string, postId: string){
    await this.likeDislikeDatabase.dislikePost(userId, postId);
  }
}
