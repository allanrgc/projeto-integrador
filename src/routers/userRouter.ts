import express from "express"
import { UserController } from "../controller/UserController"
import { UserBusiness } from "../business/UserBusiness"
import { UserDatabase } from "../database/UserDatabase"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { HashManager } from "../services/HashManager"

export const userRouter = express.Router()

const userController = new UserController(
    new UserBusiness(
        new UserDatabase(),
        new TokenManager(),
        new IdGenerator(),
        new HashManager()
        )
)

userRouter.get("/", userController.getUsers)
userRouter.post("/login", userController.login)
userRouter.post("/signup", userController.signup)