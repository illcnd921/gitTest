import React from "react";

export default function ChatBoxReciever({ user, message }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start", // 메인축 방향 정렬
        flexDirection: "row",
      }}
    >

      <p
        style={{
          padding: 10,
          backgroundColor: "#dcf8c6",
          borderRadius: 10,
          maxWidth: "60%",
        }}
      >
        <strong style={{ fontSize: 13 }}>{user}</strong> <br></br>
        {message}
      </p>
    </div>
  );
}

export function ChatBoxSender({ user, message }) {
  return (
    <div
      style={{
        display: "flex",
        paddingRight: 10,
        justifyContent: "flex-end",
        flexDirection: "row",
      }}
    >
      <p
        style={{
          padding: 10,
          backgroundColor: "#fff",
          borderRadius: 10,
          maxWidth: "60%",
        }}
      >
        <strong style={{ fontSize: 13 }}>{user}</strong> <br></br>
        {message}
      </p>
    </div>
  );
}
