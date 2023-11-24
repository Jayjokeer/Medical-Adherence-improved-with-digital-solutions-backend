import express,{Request,Response} from "express";
import {config} from "dotenv";
config();
import morgan from "morgan"
import cors from "cors";
import {connectDB} from "./db";
import authRouter from "./routes/auth.router";
import cron from "node-cron";
import {sendNotificationsToPatients} from "./utils/sendNotification";
import patientRouter from "./routes/patient.router";
connectDB();
const app = express();
app.use(cors());
const PORT = process.env.Port;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan("dev"))

//Routes
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/patient',patientRouter)
//Cron
cron.schedule('* * * * *', async () => {
    console.log('Running notification reminder job...');
    await sendNotificationsToPatients();
  });

app.get("/",(req:Request,res:Response)=>{
    return res.status(200).json({message:"Welcome to the Medical Adherence APP"})
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT} `);
});