import express, { Request, Response } from 'express';
import cors from 'cors';
import { userRouter } from './routers/userRouter';
import { postRouter } from './routers/postRouter';
import { commentRouter } from './routers/commentRouter';
import { likeDislikeRouter } from './routers/likeRouter';

const app = express();

app.use(cors());
app.use(express.json());

app.listen(Number(process.env.PORT), () => {
    console.log(`Servidor rodando na porta ${Number(process.env.PORT)}`)
})

app.get("/ping", (req: Request, res: Response) => {
    res.status(200).send("pong")
})

app.use("/users", userRouter)
app.use("/posts", postRouter)
app.use("/comments", commentRouter)
app.use("/likeDislike", likeDislikeRouter)


