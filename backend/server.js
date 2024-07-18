const express = require("express")
const app = express()
const path  = require('path')
require("dotenv").config()
const cors = require("cors")
const db = require("./config/dbConfig")
const userRoute = require("./routes/userRoutes")
const examRoute = require("./routes/examRoutes")
const reportRoute = require("./routes/reportRoutes");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 5000
// app.use(cors(
//     {
//         origin:[process.env.CLIENT_URL],
//         credentials:true
//     }))
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
    app.use(express.json()) //Sucessfully allow to send a json data during res.status.json
    app.use(cookieParser()) //Sucessfully allow to reed the cookie 
    app.use(express.urlencoded({extended:true}))


app.use("/api/users",userRoute)
app.use("/api/exams",examRoute)
app.use("/api/reports",reportRoute)


app.use(express.urlencoded({ extended: true }))
const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, "/frontend/build")));
app.get("*",(req,res)=>{
res.sendFile(path.join(_dirname, "/frontend/build/index.html"))
});

app.use((err, req, res, next)=>{
res.status(500).send({ message: err.message});
})





const http  = require('http')
const Server  = require("socket.io").Server
const server  = http.createServer(app)
const io = new Server(server , {
    cors:{
        origin:"*"
    }
})
// const _dirname = path.dirname("")
const buildPath = path.join(_dirname  , "../client/build");

app.use(express.static(buildPath))

app.get("/*", function(req, res){

    res.sendFile(
        path.join(__dirname, "../client/build/index.html"),
        function (err) {
          if (err) {
            res.status(500).send(err);
          }
        }
      );

})




io.on("connection" , (socket) => {
   console.log('We are connected')

   socket.on("chat" , chat => {
      io.emit('chat' , chat)
   } )

   socket.on('disconnect' , ()=> {
    console.log('disconnected')
   })
})

// app.listen(port,()=>{
// console.log(`Server is running on PORT: ${port}`)
// })
server.listen(port, () => {
  console.log(`listening on *:${port}`);
});