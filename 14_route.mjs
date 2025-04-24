import express from "express";

const app = express();

app
  .route("/posts")
  .get((req, res) => {
    res.status(200).send("/posts GET 호출");
  })
  .post((req, res) => {
    res.status(201).send("/posts POST 호출");
  })
  .put((req, res) => {
    res.status(200).send("/posts PUT 호출");
  })
  .delete((req, res) => {
    res.status(200).send("/posts DELETE 호출");
  });

app.listen(3000, () => {
  console.log("서버 실행중");
});
