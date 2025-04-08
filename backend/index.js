import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/gameRouter.js";
dotenv.config()




// CREATE EXPRESS APP 

const app = express();
const PORT = process.env.PORT;



// SETUP MIDDLEWARES

app.use(express.json());
const allowedOrigins = [
    'https://steam-hub-nimda.vercel.app',
    'https://steam-hub-red.vercel.app',
    'http://localhost:5174/',
    'http://localhost:5173/',
  ];
  
  const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,POST,PUT,DELETE,PATCH',
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    credentials: true,
  };
  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));



// ROUTES

app.get("/",(req,res)=>{
    res.send("API WORKING");
});

app.use("/api",router);


// CONNECT DB & START THE SERVER

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server Started At http://localhost:${PORT}`)
    })
}).catch(e=>{
    console.log(e.message);
})




