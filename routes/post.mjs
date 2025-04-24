import express from "express";

const router = express.Router();

router.use((req, res, next) => {
  console.log("post 존재하는 미들웨어");
  next();
});

//http://127.0.0.1:3000/posts/
router.get("/", (req, res) => {
  res.status(200).send("GET: /posts 글 보기");
});

router.post("/", (req, res) => {
  res.status(201).send("POST: /posts 글 작성하기");
});

router.put("/:id", (req, res) => {
  res.status(201).send("PUT: /posts/:id 글 수정하기");
});

router.delete("/:id", (req, res) => {
  res.status(201).send("DELETE: /posts/:id 글 삭제하기");
});

export default router;
