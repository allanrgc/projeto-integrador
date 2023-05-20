import { Request, Response } from "express";
import { CommentBusiness } from "../business/CommentBusiness";
import { BaseError } from "../errors/BaseError";
import { EditCommentInputDTO } from "../dtos/comment/editComment.dto";
import { DeleteCommentInputDTO } from "../dtos/comment/deleteComment.dto";


export class CommentController{
    constructor(
        private commentBusiness: CommentBusiness
    ){}
    public getComments = async (req: Request, res: Response) => {
        try {
            const output = await this.commentBusiness.getComments()

            res.status(200).send(output)
        } catch (error) {
            console.log(error)

            if(error instanceof Error){
                res.status(500).send(error.message)
            }else{
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public createComment = async (req: Request, res: Response) => {
        try {
    
          const input = {
            post_id: req.params.id,
            comment: req.body.comment,
            token: req.headers.authorization as string
          }
    
          const output = await this.commentBusiness.createComment(input)
    
          res.status(201).send(output)
        } catch (error) {
          console.log(error)
    
          if (error instanceof BaseError) {
            res.status(error.statusCode).send(error.message)
          } else {
            res.status(500).send("Erro inesperado")
          }
        }
      }

    public editComment = async (req: Request, res: Response) => {
        try {
            const input: EditCommentInputDTO = {
                idToEdit: req.params.id,
                comment: req.body.content,
                token: req.headers.authorization
            }
            const output = await this.commentBusiness.editComment(input)

            res.status(200).send(output)
        } catch (error) {
            console.log(error)
    
          if (error instanceof BaseError) {
            res.status(error.statusCode).send(error.message)
          } else {
            res.status(500).send("Erro inesperado")
          }
        }
    }

    public deleteComment = async (req: Request, res: Response) => {
        try {
            const input: DeleteCommentInputDTO = {
                idToDelete: req.params.id,
                token: req.headers.authorization
            }
            const output = await this.commentBusiness.deleteComment(input)

            res.status(200).send(output)
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