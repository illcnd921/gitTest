import React, { useState } from "react";
import { CommentOutlined } from "@ant-design/icons";
import _ from "lodash";
import { io, Socket } from "socket.io-client";

const button = {
  width: "10%",
  height: 50,
  fontWeight: "bold",
  borderRadius: 10,
  fontSize: 18,
  backgroundColor: "#075e54",
  borderWidth: 0,
  color: "#fff",
  margin: 10,
};

export default function UserLogin({socketio, setUser}) {
  const [user, setAUser] = useState("");
  const [roomNo, setRoomNo] = useState("");

  // const socketio = io.connect("http://192.168.0.121:9999");


  function handleSetUser() {
    // localStorage : 전역에 접근 가능, storage에 저장된 데이터는 모두 문자열만 사용 가능하기 때문에 다른 타입의 데이터를 사용할 때에는 JSON형태로 읽고 써야 함
    // 동일한 pc안에서 동일한 브라우저를 사용했을 때에 사용
    // +)sessionStorage는 전역에 접근가능하지만 브라우저 창이 닫히면 세션이 종료되면서 storage에 저장된 데이터도 소멸됨
    localStorage.setItem("user", user);
    setUser(user);
    localStorage.setItem("roomNo", roomNo);
    socketio.emit("room", roomNo);
  }

  return (
    <div>
      <h1 style={{ margin: 10, textAlign: "center" }}>
        <CommentOutlined color={"green"} /> Super Chat{" "}
      </h1>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          style={{
            margin: 10,
            height: 30,
            width: "25%",
            borderRadius: 10,
            borderWidth: 10,
            fontSize: 15,
            paddingInline: 5,
          }}
          value={user}
          onChange={(e) => setAUser(e.target.value)}
          placeholder="Write a random name"
        ></input>
        <input
          style={{
            margin: 10,
            height: 30,
            width: "25%",
            borderRadius: 10,
            borderWidth: 10,
            fontSize: 15,
            paddingInline: 5,
          }}
          value={roomNo}
          onChange={(e) => setRoomNo(e.target.value)}
          placeholder="Write a random name"
        ></input>
        <button onClick={ handleSetUser} style={button}>
          Login
        </button>
      </div>
    </div>
  );
}
