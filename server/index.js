// cmd
// npm i express socket.io cors
// npm install -g nodemon : nodemon(서버 코드 변경할 때마다 서버를 재시작하기 귀찮으니 도구를 사용) 설치
// nodemon app.js : 서버 실행


// // path 모듈은 운영체제별로 경로 구분자가 달라 생기는 문제를 해결하기 위해 생겼다
const express = require("express");
const http = require("http");
const {Server} = require("socket.io");
const app = express();
// path 모듈은 운영체제별로 경로 구분자가 달라 생기는 문제를 해결하기 위해 생겼다
const path = require("path");
const cors = require("cors");

const server = http.createServer(app);


// io : 서버 객체, socket : 클라이언트 객체
// cors : 크로스 도메인
const io = new Server(server, {
  cors: {
    origin: "*",
    method:["GET","POST"],
    credentials: true
  },
});

app.use(cors());
// path.dirname(file) : 현재 파일이 위치한 폴더 경로를 보여줌
// app.use(express.static(buildPath));

// app.get("/*", function (req, res) {
//   res.sendFile(
//     path.join(__dirname, "../client/index.html"), // path.join([path]) : 경로들을 String으로 받아 합친다
//     function (err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//     }
//   );

// });

// on : 이벤트를 받는 메소드, emit : 이벤트를 보내는 메서드
// io.on("connection", callback) : 서버가 connection 이벤트를 받으면 콜백함수를 수행한다
io.on("connection", (Socket) => {
  Socket.on("room", (data)=>{
    console.log(data);
    Socket.join(data);
  })

  Socket.on("message", (data) => {
    console.log(data)
    Socket.to(data.roomNo).emit("return", data);
    // io.to('0').emit("return", data);
  });
  
  });


io.on("disconnect", () => {
  console.log("disconnected");
});


server.listen(9999, () => console.log("Listening to port 9999"));
