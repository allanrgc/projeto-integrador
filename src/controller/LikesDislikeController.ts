import { Request, Response } from 'express';
import { BaseError } from '../errors/BaseError';
import { LikeDislikeBusiness } from '../business/LikeDislikeBusiness';

export class LikeDislikeController {
  constructor(
    private likeDislikeBusiness: LikeDislikeBusiness
  ) {}

  public async likePost(req: Request, res: Response) {
    try {
      // const { userId, postId } = req.body;
      const postId = req.params.id
      const userId = req.headers.authorization as string

      await this.likeDislikeBusiness.likePost(userId, postId);

      res.status(200).send({ message: 'Post liked successfully' });
    } catch (error) {
        console.log(error)

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public async dislikePost(req: Request, res: Response) {
    try {
      const { userId, postId } = req.body;

      await this.likeDislikeBusiness.dislikePost(userId, postId);

      res.status(200).send({ message: 'Post disliked successfully' });
    } catch (error) {
        console.log(error)

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }
}
