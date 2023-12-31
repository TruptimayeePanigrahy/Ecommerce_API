const express = require("express")
const cors = require("cors")
const swaggerJSdoc=require("swagger-jsdoc")
const swaggerUI=require("swagger-ui-express")
const { connection } = require("./Config/db")
const { route } = require("./Routes/userroute")
const { categoryroute } = require("./Routes/categoryroute")
const { productroute } = require("./Routes/productroute")
const { cartroute } = require("./Routes/cartroute")
const {orderRoutes}=require("./Routes/orderroute")
const app = express()
require("dotenv").config()
app.use(express.json())
app.use(cors())

const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"E-commerce API",
            version:"1.0.0"
        },
        servers:[
            {
                url:"https://ecommerce-api-0lpk.onrender.com/"
            }
        ]
    },
    apis:["./Routes/*.js"]
}

const swaggerSpec = swaggerJSdoc(options)
app.use("/documentation", swaggerUI.serve, swaggerUI.setup(swaggerSpec))


app.get("/", (req, res) => {
    res.send("Home page")
})

app.use("/user",route)
app.use("/category",categoryroute)
app.use("/product",productroute)
app.use("/cart",cartroute)
app.use("/order",orderRoutes)



app.listen(process.env.port, async() => {
    try {
        await connection
        console.log("DB is connected..") 
    } catch (error) {
        console.log(error)
    }
    console.log("server is running..")
})

