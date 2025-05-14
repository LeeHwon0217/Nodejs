/*
    웹 소켓
    웹소켓은 웹 브라우저와 서버 사이에 지속젓으로 연결을 유지하면서 실시간으로 데이터를 주고받을 수 있는 통신 방식
    - 웹 소켓은 클라이언트와 서버 간의 양방향 통신을 가능하게 하는 프로토콜입니다.
    - 웹 소켓은 HTTP 프로토콜을 사용하여 연결을 설정한 후, TCP 연결을 통해 데이터를 주고받습니다.
    - 웹 소켓은 클라이언트와 서버 간의 연결을 유지하므로, 매번 새로운 연결을 생성할 필요가 없습니다.

    개발할때는 공식문서를 봐야 한다.
    - https://developer.mozilla.org/ko/docs/Web/API/WebSocket
    지피티는 그저 생산성 향상을 위한 도구일 뿐이다.

    그래서 수업동안 한거는 지피티의 도움을 받을 수 없다
    지피티로 해결이 안 되면 공식문서로 하자
*/

// ES(.mjs)에서는 __dirname, __filename이 없음
// import.meta.url: 현재 파일의 경로
// fileURLToPath: 실제 경로를 문자열로 변환
// path.dirname: 디렉토리 이름만 추출
import express from "express";
import { createServer } from "http";
import path from "path";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import fs from "fs";

const app = express();
const server = createServer(app);
const io = new Server(server);
// ES(.mjs)에서는 __dirname, __filename이 없음
// import.meta.url: 현재 파일의 경로
// fileURLToPath: 실제 경로를 문자열로 변환
// path.dirname: 디렉토리 이름만 추출
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

const users = {};

io.on("connection", (socket) => {
  socket.on("join", ({ nickname, channel }) => {
    socket.nickname = nickname;
    socket.channel = channel;
    users[socket.id] = { nickname, channel };
    socket.join(channel);

    const msg = { user: "system", text: `${nickname}님이 입장했습니다.` };
    io.to(channel).emit("message", msg);
    console.log("nickname: ", nickname, "channel :", channel);

    updateUserList();
  });

  socket.on("chat", ({ text, to }) => {
    const sender = users[socket.id];
    if (!sender) return;
    const payload = { user: sender.nickname, text };

    if (to) {
      const receiverSocket = Object.entries(users).find(
        ([id, u]) => u.nickname === to
      )?.[0]; // [0] 소켓id, ?.(옵셔널 체이닝): 값이 undefined일 경우 에러 없이 넘어가게 함(사용자가 없을 수도 있으니 안전하게 접근)
      if (receiverSocket) {
        io.to(receiverSocket).emit("whisper", payload);
        socket.emit("whisper", payload);
      }
    } else {
      io.to(sender.channel).emit("message", payload);
      // console.log("sender.channel: ", sender.channel, "payload: ", payload);
    }
  });

  socket.on("changeChannel", ({ newChannel }) => {
    const oldChannel = socket.channel;
    const nickname = socket.nickname;
    socket.leave(oldChannel);
    io.to(oldChannel).emit("message", {
      user: "system",
      text: `${nickname}님이 ${newChannel} 채널로 이동했습니다`,
    });
    socket.channel = newChannel;
    users[socket.id].channel = newChannel;
    socket.join(newChannel);

    const joinMsg = { user: "system", text: `${nickname}님이 입장했습니다` };
    io.to(newChannel).emit("message", joinMsg);
    updateUserList();
  });

  socket.on("disconnect", () => {
    const user = users[socket.id];
    if (user) {
      const msg = {
        user: "system",
        text: `${user.nickname}님이 퇴장했습니다.`,
      };
      io.to(user.channel).emit("message", msg);
      delete users[socket.id];

      updateUserList();
    }
  });

  function updateUserList() {
    const userList = Object.values(users); // [{nickname, channel}, .. ]
    io.emit("userList", userList);
  }
});

server.listen(3000, () => {
  console.log("서버 실행 중");
});
