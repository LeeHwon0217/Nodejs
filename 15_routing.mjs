import express from "express";
import userRouter from "./routes/user.mjs";
import postRouter from "./routes/post.mjs";

const app = express();
app.use(express.json());
app.use("/users", userRouter);

//http://127.0.0.1:3000/users
app.use("/users", userRouter);

//http://127.0.0.1:3000/post
app.use("/post", postRouter);

app.listen(3000, () => {
  console.log("서버 실행중");
});
