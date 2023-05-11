const express = require("express")
const app = express()
const cors = require("cors")
const connection = require("./config/db")
const userRouter = require("./routes/user.route")
const quizRoute = require("./routes/quiz.route")
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send({
        message: "Home Page"
    })
})

app.use('/user', userRouter)

app.use("/quiz", quizRoute)

app.listen(8080, async () => {
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log(error.message)
    }
    console.log("running at port 8080")
})