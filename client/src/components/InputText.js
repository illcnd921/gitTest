import React, { useState } from "react";
import { io } from "socket.io-client";

const styles = {
  button: {
    width: "10%",
    height: 50,
    fontWeight: "bold",
    borderRadius: 10,
    fontSize: 18,
    backgroundColor: "#34b7f1",
    borderWidth: 0,
    color: "#fff",
  },
  textarea: {
    width: "60%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0,
    padding: 10,
    fontSize: 18,
  },
  textContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
};

export default function InputText({ socketio, setNewMessage, setMessageList, user, roomNo }) {
  const [message, setMessage] = useState("");

  // const socketio = io.connect("http://192.168.0.121:9999");


  async function sendMessage() {
    const messageContent = {
          user: user,
          message: message,
          roomNo: roomNo,
          date:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        };
        // messageContent 값이 먼저 정의 된 후 메세지 전달.
        await socketio.emit("message", messageContent);
        // 메세지 리스트에 방금 보낸 메세지도 함께 추가.
        setMessageList((prev) => [...prev, messageContent]);
        setNewMessage(message)
    setMessage("");
  }

  // function textareaAddMessage() {
  //   document.getElementById('textarea').addEventListener("keydown", function(e){
  //     if(e.key === 'Enter') {
  //       e.preventDefault();
  //       sendMessage();
  //     }
  //   })
  // }

  function onKeyUp(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  }

  return (
    <div style={styles.textContainer}>
      <textarea
        id = "textarea"
        style={styles.textarea}
        rows={6}
        placeholder="write something..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={(e) => onKeyUp(e)}
      ></textarea>
      <button onClick={sendMessage} style={styles.button}>
        ENTER
      </button>
    </div>

  );
}
