const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const paymentRoutes = require("./routes/Payment")
const courseRoutes = require("./routes/Course");
const profileRoutes = require("./routes/Profile");

const dataBase = require("./config/database");
const cookieParser = require("cookie-parser");
const { cloudinaryConnect } = require("./config/cloudinary")
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;
dataBase.connect();
app.use(express.json());
app.use(cookieParser());
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)
// clodinaru
cloudinaryConnect();
// routes
app.use("/api/v1/auth",userRoutes);
app.use("api/v1/profile",profileRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/course",courseRoutes);

app.get("/",(req,res)=>{
    return res.json({
        success:true
        ,message:"your server is up and running"
    })
});

app.listen(PORT,()=>{
    console.log(`app is running at port ${PORT}`);
})


