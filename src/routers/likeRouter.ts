import express from 'express';
import { LikeDislikeController } from '../controller/LikesDislikeController';
import { LikeDislikeBusiness } from '../business/LikeDislikeBusiness';
import { LikeDislikeDatabase } from '../database/LikeDislikeDatabase';

export const likeDislikeRouter = express.Router();

const likeDislikeController = new LikeDislikeController(
    new LikeDislikeBusiness(
        new LikeDislikeDatabase()
    )
);

likeDislikeRouter.post('/like', likeDislikeController.likePost.bind(likeDislikeController));
likeDislikeRouter.post('/dislike', likeDislikeController.dislikePost.bind(likeDislikeController));
