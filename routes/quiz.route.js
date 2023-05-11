const express = require("express")
const QuizModel = require("../models/quiz.model")
const quizRoute = express.Router()

quizRoute.get("/", async (req, res) => {
    try {
        const quiz = await QuizModel.find()
        res.status(200).send(quiz)
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
})

quizRoute.post("/", async (req, res) => {
    try {
        const quiz = new QuizModel(req.body)
        await quiz.save()
        res.status(200).send(quiz)
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
})

quizRoute.patch('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const quiz = await QuizModel.findByIdAndUpdate({ _id: id }, req.body)
        res.status(200).send(quiz)
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
})

quizRoute.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const quiz = await QuizModel.findByIdAndDelete({ _id: id })
        res.status(200).send(quiz)
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
})

module.exports = quizRoute