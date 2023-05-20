import { UserDatabase } from "../database/UserDatabase"
import { GetUsersInputDTO, GetUsersOutputDTO } from "../dtos/user/getUsers.dto"
import { LoginOutputDTO } from "../dtos/user/login.dto"
import { LoginInputDTO } from "../dtos/user/login.dto"
import { SignupInputDTO, SignupOutputDTO } from "../dtos/user/signup.dto"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { TokenPayload, USER_ROLES, User } from "../models/User"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"


export class UserBusiness{
    constructor(
        private userDatabase: UserDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator,
        private hashManager: HashManager
    ){}

    public getUsers = async (input: GetUsersInputDTO): Promise<GetUsersOutputDTO> => {
        const {q, token} = input

        const payload = this.tokenManager.getPayload(token)
        if(payload === null){
            throw new Error ("token inválido")
        }
        if(payload.role !== USER_ROLES.ADMIN){
            throw new Error("Área de aministradores")
        }

        const usersDB = await this.userDatabase.getUsersByName(q)

        const users = usersDB.map((userDB) => {
            const user = new User(
                userDB.id,
                userDB.name,
                userDB.email,
                userDB.password,
                userDB.role,
                userDB.created_at
                // getPost(userDB.creator_id)
            )
            return user.toBusinessModel()
        })

        const output: GetUsersOutputDTO = users

        return output
        
    }

    public signup = async (
        input: SignupInputDTO
      ): Promise<SignupOutputDTO> => {
        // const { id, name, email, password } = input
        const { name, email, password } = input
    
    //     const isEmailRegistered = await this.userDatabase.findUserByEmail(email)

    // if (isEmailRegistered) {
    //   throw new BadRequestError("e-mail já existe")
    // }
        const id = this.idGenerator.generate()
    
        const hashedPassword = await this.hashManager.hash(password)
    
        const newUser = new User(
          id,
          name,
          email,
          hashedPassword,
          USER_ROLES.NORMAL, // só é possível criar users com contas normais
          new Date().toISOString()
        )
    
        const newUserDB = newUser.toDBModel()
        await this.userDatabase.insertUser(newUserDB)
    
        const tokenPayload: TokenPayload = {
          id: newUser.getId(),
          name: newUser.getName(),
          role: newUser.getRole()
        }
    
        const token = this.tokenManager.createToken(tokenPayload)
    
        const output: SignupOutputDTO = {
          message: "Cadastro realizado com sucesso",
          token: token
        }
    
        return output
      }
    
      public login = async (
        input: LoginInputDTO
      ): Promise<LoginOutputDTO> => {
        const { email, password } = input
    
        const userDB = await this.userDatabase.findUserByEmail(email)
    
        if (!userDB) {
          throw new NotFoundError("'email' não encontrado")
        }
    
        const isPasswordCorrect = await this.hashManager.compare(password, userDB.password)
    
        if(!isPasswordCorrect){
          throw new BadRequestError("'email' ou 'senha' incorretos")
        }
    
        const user = new User(
          userDB.id,
          userDB.name,
          userDB.email,
          userDB.password,
          userDB.role,
          userDB.created_at
        )
    
        // modelagem do payload do token
        const tokenPayload: TokenPayload = {
          id: user.getId(),
          name: user.getName(),
          role: user.getRole()
        }
    
        const token = this.tokenManager.createToken(tokenPayload)
    
        const output: LoginOutputDTO = {
          message: "Login realizado com sucesso.",
          token: token
        }
    
        return output
      }
}