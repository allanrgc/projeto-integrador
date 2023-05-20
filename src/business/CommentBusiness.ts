import { CommentDatabase } from "../database/CommentDatabase";
import { Comment } from "../models/Comment";
import { IdGenerator } from "../services/IdGenerator";
import { CreateCommentInputDTO, CreateCommentOutputDTO } from "../dtos/comment/createComment.dto";
import { TokenManager } from "../services/TokenManager";
import { BadRequestError } from "../errors/BadRequestError";
import { EditCommentInputDTO, EditCommentOutputDTO } from "../dtos/comment/editComment.dto";
import { DeleteCommentInputDTO, DeleteCommentOutputDTO } from "../dtos/comment/deleteComment.dto";


export class CommentBusiness{
    constructor(
        private commentDatabase: CommentDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ){}
    public async getComments(){
        const commentsDB = await this.commentDatabase.getComments()

        const comments = commentsDB.map((commentDB) => {
            const comment = new Comment(
                commentDB.comment_id,
                commentDB.user_id,
                commentDB.post_id,
                commentDB.comment,
                commentDB.created_at,
            )
            return comment
        })

        if(!comments){
            throw new Error ("comment não existe")
        }
        return comments
    }

    public createComment = async (input: CreateCommentInputDTO): Promise<CreateCommentOutputDTO> => {
        const {post_id, comment, token} = input

        const commentDB = await this.commentDatabase.getCommentsById(post_id)
        if(commentDB !== post_id) throw new Error("id do post precisa ser inserido")

        const payload = this.tokenManager.getPayload(token)
        if(payload === null) throw new Error("token inválido")

        const comment_id = this.idGenerator.generate()
        const user_id = payload.id
        const created_at = new Date().toISOString()

        if(comment === null) throw new Error ("conteúdo deve ser preenchido")
        if(typeof comment !== "string") throw new Error("conteúdo precisa ser do tipo string")

        
        const newComment = new Comment (
          comment_id,
          user_id,
          post_id,
          comment,
          created_at
        )
    
        const newCommentDB = newComment.toDBModel()
        await this.commentDatabase.createComment(newCommentDB)
    
        const output = {
          message: "Comment realizado",
          comment: newComment.toBusinessModel()
        }
    
        return output
      }

    public editComment = async (index: EditCommentInputDTO) => {
        const {idToEdit, comment, token} = index

        if(!idToEdit) throw new Error("id do comment precisa ser inserido")
        if (!comment) throw new Error("Conteúdo precisa ser atualizado")
        if(typeof token !== "string") throw new Error("token inválido")

        const payload = this.tokenManager.getPayload(token)
        if(payload === null) throw new BadRequestError("token inválido")

        const commentToEdit = await this.commentDatabase.getCommentsById(idToEdit)

        // if(payload.role !== USER_ROLES.ADMIN) throw new Error("Deve ser admin para editar")
            if(commentToEdit.user_id !== payload.id) throw new Error("Sem autorização")

            if(comment === undefined) throw new Error("conteúdo indefinido")
            if(typeof comment !== "string") throw new Error("conteúdo precisa ser string")

            // const updatedAt = new Date().toISOString();

            const commentEdited = new Comment(
                idToEdit,
                commentToEdit.user_id,
                commentToEdit.post_id,
                comment,
                commentToEdit.created_at,
            )

            const commentEditedDB = commentEdited.toDBModel()
            await this.commentDatabase.editComment(commentEditedDB, idToEdit)
            const output = {
                message: "comment atualizado",
                comment: commentEdited
            }
            return output
        
    }

    public deleteComment = async (index: DeleteCommentInputDTO): Promise<DeleteCommentOutputDTO> => {
        const {idToDelete, token} = index

        if(!idToDelete) throw new Error("'id' de comment inexistente")
        if(typeof token !== "string") throw new BadRequestError("token inválido")

        const payload = this.tokenManager.getPayload(token)
        if(payload === null) throw new Error("token inválido")

        const commentToDelete = await this.commentDatabase.getCommentsById(idToDelete)

            if(commentToDelete.user_id !== payload.id){
                throw new BadRequestError("você não tem acesso a essa função")
        }

            await this.commentDatabase.deleteComment(idToDelete)
            
            const output: DeleteCommentOutputDTO = {
                message: "comment deletado",
                comment: {
                    comment_id: commentToDelete.comment_id,
                    user_id: commentToDelete.user_id,
                    post_id: commentToDelete.post_id,
                    comment: commentToDelete.comment,
                    created_at: commentToDelete.created_at
                }
            }
        return output
    }
}