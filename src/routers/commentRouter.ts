import express from "express"
import { CommentController } from "../controller/CommentController"
import { CommentBusiness } from "../business/CommentBusiness"
import { CommentDatabase } from "../database/CommentDatabase"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { PostDatabase } from "../database/PostDatabase"

export const commentRouter = express.Router()

export const commentController = new CommentController(
    new CommentBusiness(
        new CommentDatabase(),
        new PostDatabase(),
        new IdGenerator(),
        new TokenManager(),
        )
)

commentRouter.get("/", commentController.getComments)
commentRouter.post("/:id", commentController.createComment)
commentRouter.put("/:id", commentController.editComment)
commentRouter.delete("/:id", commentController.deleteComment)