const express = require("express")
const cors=require("cors")
const { connection } = require("./Config/db")
const { route } = require("./Routes/userroute")
const { categoryroute } = require("./Routes/categoryroute")
const {productroute}=require("./Routes/productroute")
const app = express()
require("dotenv").config()
app.use(express.json())
app.use(cors())




app.get("/", (req, res) => {
    res.send("Home page")
})

app.use("/user",route)
app.use("/category",categoryroute)
app.use("/product",productroute)





app.listen(process.env.port, async() => {
    try {
        await connection
        console.log("DB is connected..") 
    } catch (error) {
        console.log(error)
    }
    console.log("server is running..")
})

