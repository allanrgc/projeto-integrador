import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { BaseError } from "../errors/BaseError";
import { EditPostInputDTO } from "../dtos/post/editPost.dto";
import { DeletePostInputDTO } from "../dtos/post/deletePost.dto";
import { CreatePostInputDTO } from "../dtos/post/createPost.dto";


export class PostController{
    constructor(
        private postBusiness: PostBusiness
    ){}
    public getPosts = async (req: Request, res: Response) => {
        try {
            const output = await this.postBusiness.getPosts()

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

    public createPost = async (req: Request, res: Response)=> {
        try {
    
          const input = {
            // id: req.body.id,
            content: req.body.content,
            token: req.headers.authorization as string
          }
    
          const output = await this.postBusiness.createPost(input)
    
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

    public editPost = async (req: Request, res: Response) => {
        try {
            const input: EditPostInputDTO = {
                id: req.params.id,
                content: req.body.content,
                token: req.headers.authorization
            }
            const output = await this.postBusiness.editPost(input)

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

    public deletePost = async (req: Request, res: Response) => {
        try {
            const input: DeletePostInputDTO = {
                idToDelete: req.params.id,
                token: req.headers.authorization
            }
            const output = await this.postBusiness.deletePost(input)

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