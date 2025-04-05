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
app.use(cors());



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




