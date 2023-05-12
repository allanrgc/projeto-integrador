import { PostDatabase } from "../database/PostDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { Post, PostDB } from "../models/Post";
import { IdGenerator } from "../services/IdGenerator";
import { CreatePostInputDTO, CreatePostOutputDTO } from "../dtos/post/createPost.dto";
import { TokenManager } from "../services/TokenManager";
import { BadRequestError } from "../errors/BadRequestError";
import { EditPostInputDTO, EditPostOutputDTO } from "../dtos/post/editPost.dto";
import { type } from "os";
import { USER_ROLES } from "../models/User";
import { DeletePostInputDTO, DeletePostOutputDTO } from "../dtos/post/deletePost.dto";


export class PostBusiness{
    constructor(
        private postDatabase: PostDatabase,
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ){}
    public async getPosts(){
        const postsDB = await this.postDatabase.getPosts()

        const posts = postsDB.map((postDB) => {
            const post = new Post(
                postDB.post_id,
                postDB.creator_id,
                postDB.content,
                postDB.likes,
                postDB.dislikes,
                postDB.created_at,
                postDB.updated_at
            )
            return post
        })

        if(!posts){
            throw new Error ("post não existe")
        }
        return posts
    }

    public createPost = async (index: CreatePostInputDTO): Promise<CreatePostOutputDTO> => {
        const {content, token} = index

        const payload = this.tokenManager.getPayload(token)
        if(payload === null) throw new Error("token inválido")

        const id = this.idGenerator.generate()
        const creator_id = payload.id
        const likes = 0
        const dislikes = 0
        const created_at = new Date().toISOString()
        const updated_at = new Date().toISOString()

        if(content === null) throw new Error ("conteúdo deve ser preenchido")
        if(typeof content !== "string") throw new Error("conteúdo precisa ser do tipo string")

        
        const newPost = new Post (
          id,
          creator_id,
          content,
          likes,
          dislikes,
          created_at,
          updated_at
        )
    
        const newPostDB = newPost.toDBModel()
        await this.postDatabase.createPost(newPostDB)
    
        const output = {
          message: "Postagem realizada",
          post: newPost.toBusinessModel()
        }
    
        return output
      }

    public editPost = async (index: EditPostInputDTO) => {
        const {idToEdit, content, token} = index

        if(!idToEdit) throw new Error("id do posto precisa ser inserido")
        if (!content) throw new Error("Conteúdo precisa ser atualizado")
        if(typeof token !== "string") throw new Error("token inválido")

        const payload = this.tokenManager.getPayload(token)
        if(payload === null) throw new BadRequestError("token inválido")

        const postToEdit = await this.postDatabase.getPostsById(idToEdit)

        // if(payload.role !== USER_ROLES.ADMIN) throw new Error("Deve ser admin para editar")
            if(postToEdit.creator_id !== payload.id) throw new Error("Sem autorização")

            if(content === undefined) throw new Error("conteúdo indefinido")
            if(typeof content !== "string") throw new Error("conteúdo precisa ser string")

            const updatedAt = new Date().toISOString();

            const postEdited = new Post(
                idToEdit,
                postToEdit.creator_id,
                content,
                postToEdit.likes,
                postToEdit.dislikes,
                postToEdit.created_at,
                updatedAt
            )

            const postEditedDB = postEdited.toDBModel()
            await this.postDatabase.editPost(postEditedDB, idToEdit)
// console.log(postEditedDB)
            const output = {
                message: "Post atualizado",
                post: postEdited
            }
            return output
        
    }

    public deletePost = async (index: DeletePostInputDTO): Promise<DeletePostOutputDTO> => {
        const {idToDelete, token} = index

        if(!idToDelete) throw new Error("'id' de post inexistente")
        if(typeof token !== "string") throw new BadRequestError("token inválido")

        const payload = this.tokenManager.getPayload(token)
        if(payload === null) throw new Error("token inválido")

        const postToDelete = await this.postDatabase.getPostsById(idToDelete)

            if(postToDelete.creator_id !== payload.id){
                throw new BadRequestError("você não tem acesso a essa função")
        }

            await this.postDatabase.deletePost(idToDelete)
            
            const output: DeletePostOutputDTO = {
                message: "post deletado",
                post: {
                    id: postToDelete.id,
                    creator_id: postToDelete.creator_id,
                    content: postToDelete.content,
                    likes: postToDelete.likes,
                    dislikes: postToDelete.dislikes,
                    created_at: postToDelete.created_at,
                    updated_at: new Date().toISOString()
                }
            }
        return output
    }
}