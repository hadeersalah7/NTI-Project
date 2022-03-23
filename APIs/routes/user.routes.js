const userController = require("../controller/user.controller")
const { modelName } = require("../db/models/user.model")

const router = require("express").Router()

router.post("/register", userController.addUser)

router.get("/showAll", userController.showAll)
router.get("/showAll/:id", userController.showSingle)


router.delete('/showAll/:id', userController.delUser)

router.patch('/showAll/:id', userController.editUser)

module.exports = router 