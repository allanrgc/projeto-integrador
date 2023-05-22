import { UserDB } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";
import { PostDatabase } from "./PostDatabase";


export class UserDatabase extends BaseDatabase{
    public static TABLE_USERS = "users"

    public async getUsersByName(q: string): Promise<UserDB[]>{
        let usersDB

        if(q) {
           const result = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .select()
            .where("name", "LIKE", `%${q}%`)

            usersDB = result
        }else{
            const result: UserDB[] = await BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
                .select()

            usersDB = result
        }
        

        return usersDB
    }

    public async getAllUsers(){
        const usersDB = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .select()

        return usersDB
    }

    public async getUsersAndPosts(q: string | undefined){
        let usersDB
        if(q){
            usersDB = await this.getUsersByName(q)
        }else{
            usersDB = await this.getAllUsers()
        }
        const postsDB = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .select()

        return{
            usersDB,
            postsDB
        }
    }

    public async findUserById(
        id: string
      ): Promise<UserDB | undefined> {
        const [userDB]: UserDB[] | undefined[] = await BaseDatabase
          .connection(UserDatabase.TABLE_USERS)
          .where({ id })
    
        return userDB
      }
    
      public async findUserByEmail(
        email: string
      ): Promise<UserDB | undefined> {
        const [userDB]: UserDB[] | undefined[] = await BaseDatabase
          .connection(UserDatabase.TABLE_USERS)
          .where({ email })
    
        return userDB
      }

      public async insertUser(newUserDB: UserDB): Promise<void> {
        await BaseDatabase
          .connection(UserDatabase.TABLE_USERS)
          .insert(newUserDB)
      }
}