// import React, { useEffect, useState, useRef } from 'react'
// import socketIOClient from "socket.io-client";
// import ChatBoxReciever, { ChatBoxSender } from './ChatBox';
// import InputText from './InputText.js';
// import UserLogin from './UserLogin';


// export default function ChatContainer(){
//     let socketio=socketIOClient("http://localhost:6001")
//     const [chats,setChats]=useState([])
//     const [user,setUser]=useState(localStorage.getItem("user"))
//     const [avtar,setAvtar]=useState(localStorage.getItem("avtar"))
     

//     useEffect(()=>{
//         socketio.on("chat",senderChats=>{
//             setChats(senderChats)
//         })
//     })
//     function sendChatToSocket(chat){
//         // socketio.removeAllListeners("chat",chat)
//         socketio.emit("chat" , chat)
//     }
//     function addMessage(chat){
//         const newChat={...chat,user,avtar}
//         setChats([...chats,newChat])
//         sendChatToSocket([...chats,newChat])
//     }
//        function logout(){
//         localStorage.removeItem("user")
//         localStorage.removeItem("avatar")
//         setUser("")   
//     }

//         function ChatsList(){
//             console.log(chats);
//         return chats.map((chat,index)=>{
//             if(chat.user===user) return <ChatBoxSender key={index} message={chat.message} avtar={chat.avtar}  user={chat.user}/>
//             return <ChatBoxReciever key={index} message={chat.message} avtar={chat.avtar} user={chat.user} />
//         })
//         }
       
    
//     return(
//         <div>
//             {
//             user? 
//             <div>
//             <div style={{display:'flex', flexDirection:"row", justifyContent: 'space-between'}} >
//            <h4>Username: {user}</h4>
//            {/* <strong>Remember to Subscribe to  <a href='https://www.youtube.com/channel/UCmoQtgmJ2SHEAPCAR1Q8TBA'> My Channel</a></strong> */}
//            <p onClick={()=> logout()} style={{color:"blue", cursor:'pointer'}} >Log Out</p>
//          </div>
         
//          <ChatsList
//              />
            
//             <InputText addMessage={addMessage} />
         
//             </div>:
            
//             <UserLogin setUser={setUser} />
// }
//         </div>
//     )
// }

import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import ChatBoxReciever, { ChatBoxSender } from './ChatBox';
import InputText from './InputText';
import UserLogin from './UserLogin';
import { motion } from 'framer-motion';

export default function ChatContainer() {
  const socketio = socketIOClient('http://localhost:6001');
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [avatar, setAvatar] = useState(localStorage.getItem('avatar'));

  useEffect(() => {
    socketio.on('chat', senderChats => {
      setChats(senderChats);
    });
  }, [socketio]);

  function sendChatToSocket(chat) {
    socketio.emit('chat', chat);
  }

  function addMessage(chat) {
    const newChat = { ...chat, user, avatar };
    setChats([...chats, newChat]);
    sendChatToSocket([...chats, newChat]);
  }

  function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('avatar');
    setUser('');
  }

  function ChatsList() {
    return chats.map((chat, index) => {
      if (chat.user === user) {
        return <ChatBoxSender key={index} message={chat.message} avatar={chat.avatar} user={chat.user} />;
      }
      return <ChatBoxReciever key={index} message={chat.message} avatar={chat.avatar} user={chat.user} />;
    });
  }

  return (
    <div className="bg-slate-300 text-black min-h-screen p-4">
      {user ? (
        <div>
          <div className="flex flex-row justify-between items-center mb-4">
          <h4 className="text-lg font-semibold text-black">
          Username: {user}
           </h4>
           <p
             onClick={logout}
             className="text-black cursor-pointer border border-black px-4 py-2 rounded-lg hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-colors duration-300"
           >
             Log Out
           </p>
          </div>
          
            <ChatsList />

          <InputText addMessage={addMessage} />
        </div>
      ) : (
        <UserLogin setUser={setUser} />
      )}
    </div>
  );
}