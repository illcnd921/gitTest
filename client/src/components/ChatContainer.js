import React, { useEffect, useState, useRef } from "react";
import io, { Socket }  from "socket.io-client";
import ChatBoxReciever, { ChatBoxSender } from "./ChatBox";
import InputText from "./InputText";
import UserLogin from "./UserLogin";
import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import db from "./firebaseConfig/firebaseConfig";

// Firebase
// BAAS(Backend as a service)
// 앱(ios, android) 및 웹의 백엔드 개발을 도와주기 위해 개발된 서비스로 프론트 쪽에 집중하며 빠르게 앱을 개발할 수 있도록 지원해주는 툴

const socketio = io.connect("http://192.168.0.120:9999");

export default function ChatContainer() {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [roomNo, setRoomNo] = useState(localStorage.getItem("roomNo"));
  const [messageList, setMessageList] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  console.log(messageList);
  console.log(newMessage);
  console.log(roomNo);


  // store의 데이터베이스 짜임 : Collention(폴더) - Document(파일) - field(data)
  // const chatsRef = collection(db, "Message");
  // useRef() : 컴포넌트 별로 특정 데이터를 가지게 하고, 이러한 데이터들을 리렌더링없이 관리하고 싶을 때 사용
  const messageEndRef = useRef(null);

  // useEffect : 컴포넌트가 렌더링 될 때마다 특정 작업을 실행할 수 있도록 하는 Hook
  // 함수 컴포넌트가 어떤 값을 유지할 수 있도록 '캐시'를 만들었다. 이 캐시를 이용하고자 만든 여러 개의 API를 '리액트 훅'함수라고 부른다.
  // 예시 : useState, useEffect

  
  // useEffect(() => {
  //   const q = query(chatsRef, orderBy("createdAt", "asc"));

  //   // onSnapshot : 실시간으로 정보 가져오기
  //   const unsub = onSnapshot(q, (querySnapshot) => {
  //     const fireChats = [];
  //     // querySnapshot : Collection으로부터 Query,snapshot을 통해 받아온 데이터 타입
  //     // Collection으로부터 특정 Document들을 가져왔기 때문에 하나씩 풀어야 한다
  //     // docs : QuerySnapshot의 내부 데이터 리스트에 접근
  //     querySnapshot.forEach((doc) => {
  //       fireChats.push(doc.data()); // data : 실제 데이터가 들어있음
  //     });
  //     setChats([...fireChats]);
  //   });
  //   return () => {
  //     unsub();
  //   };
  // }, []);
  
  // function addToFirebase(chat) {
  //   const newChat = {
    //     roomNo: roomNo,
  //     createdAt: serverTimestamp(),
  //     user,
  //     message: chat.message,
  //   };
  //   const chatRef = doc(chatsRef);
  //   setDoc(chatRef, newChat)
  //     .then(() => console.log("chat added succesfully"))
  //     .catch(console.log);
  // }
  
  // function sendChatToSocket(message) {
  //   socketio.emit("message", message);
  // }

  // async function addMessage () {
  //   const messageContent = {
  //     user: user,
  //     message: newMessage,
  //     roomNo: roomNo,
  //     date:
  //       new Date(Date.now()).getHours() +
  //       ":" +
  //       new Date(Date.now()).getMinutes(),
  //   };
  //   // messageContent 값이 먼저 정의 된 후 메세지 전달.
  //   await socketio.emit("message", messageContent);
  //   // 메세지 리스트에 방금 보낸 메세지도 함께 추가.
  //   setMessageList((prev) => [...prev, newMessage]);
  //   setMessage("");
  // }


  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("roomNo");
    setUser("");
  }
  
  useEffect(() => {
  socketio.emit("room", roomNo);
  },[roomNo]);



  useEffect(() => {
    socketio.on("return", (data) => {
      console.log(data , "client")   
      setMessageList((prev) => ([...prev, data])) 
    });
  },[socketio]);
    
  useEffect(() => {
    const divElement = document.querySelector("#divElement");
    divElement.scrollTop = divElement.scrollHeight;
  }, [messageList]);
  
  
  function ChatsList() {
    return (
      <div id = "divElement"
        style={{ height: "75vh", overflow: "scroll", overflowX: "hidden" }}>
        {messageList &&
          messageList.map((msg, index) => {
          if (msg.user === user) {
            return (
              <ChatBoxSender
                key={index}
                message={msg.message}
                user={user}
              />
            )} 
          return (
            <ChatBoxReciever
              key={index}
              message={msg.message}
              user={msg.user}
            />
          );
        })}
        <div ref={messageEndRef} />
      </div>
    );
  }

  return (
    <div>
      {user  ? (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h4>Username:{user}</h4>
            <h4>roomNo:{roomNo}</h4>
            <p
              onClick={() => logout()}
              style={{ color: "blue", curosr: "pointer" }}
            >
              logout
            </p>
          </div>
          <ChatsList />
          <InputText socketio ={socketio} setNewMessage={setNewMessage} setMessageList={setMessageList} user = {user} roomNo={roomNo} />
        </div>
      ) : (
        <UserLogin socketio ={socketio} setUser={setUser} />
      )}
    </div>
  );
}