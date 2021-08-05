require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const port = process.env.PORT || 80
const cookieParser = require("cookie-parser")
const uploadRouter = require("./routes/upload.js")
const deleteRouter = require("./routes/delete.js")
const adminRouter = require("./routes/admin.js")
const AdminModel = require("./db/admin.model.js")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))

app.get("/", async(req, res) => {
    const data = await AdminModel.findOne({})
    res.json(data)
})


app.use("/admin", adminRouter)
app.use('/upload' , uploadRouter)
app.use('/delete' ,deleteRouter)


app.listen(port, () => {
    console.log(`server is running on ${port}`)
})