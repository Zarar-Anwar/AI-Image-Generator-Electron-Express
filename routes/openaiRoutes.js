const express =require("express")
const controller = require("../controllers/openaiControllers.js")

const route=express.Router()

route.post("/generateImage",controller.generateImage)



module.exports=route