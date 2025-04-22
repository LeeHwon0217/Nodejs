const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  // http://192.168.9.254:3000/
  if (url === "/") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("home");
  } else if (url === "/about") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("mypage");
  } else {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("not found");
  }

  res.writeHead(200, { "content-type": "text/plain" });
  res.end("Hello, World!\n");
});

// http://192.168.162.186:3000/, localhost 우리 아이피
server.listen(3000, () => {
  console.log("서버 실행 중");
});

// 실행하면 프로그램이 종료되지 않는다. 무한루프
