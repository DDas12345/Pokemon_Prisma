const express = require("express")
const prisma = require("../db")

const router = express.Router()

router.post("/", async (req, res) => {

    const { username, email, fullName, bio, isPrivate } = req.body

    if (!username || !email || !fullName) {
        return res.status(400).json({
            error: "Required fields missing"
        })
    }

    try {

        const user = await prisma.user.create({
            data: {
                username,
                email,
                fullName,
                bio,
                isPrivate
            }
        })

        res.status(201).json(user)

    } catch (error) {

        if (error.code === "P2002") {
            return res.status(409).json({
                error: "User already exists"
            })
        }

        res.status(500).json({
            error: "Internal server error"
        })

    }

})

router.get("/", async (req, res) => {

    const users = await prisma.user.findMany()

    res.status(200).json(users)

})

router.get("/:id", async (req, res) => {

    const id = Number(req.params.id)

    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })

    if (!user) {
        return res.status(404).json({
            error: "User not found"
        })
    }

    res.status(200).json(user)

})

router.patch("/:id", async (req, res) => {

    const id = Number(req.params.id)

    const { fullName, bio, isPrivate } = req.body

    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })

    if (!user) {
        return res.status(404).json({
            error: "User not found"
        })
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: id
        },
        data: {
            fullName,
            bio,
            isPrivate
        }
    })

    res.status(200).json(updatedUser)

})

router.delete("/:id", async (req, res) => {

    const id = Number(req.params.id)

    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })

    if (!user) {
        return res.status(404).json({
            error: "User not found"
        })
    }

    await prisma.user.delete({
        where: {
            id: id
        }
    })

    res.status(204).send()

})

module.exports = router