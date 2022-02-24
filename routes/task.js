var express = require("express");
var router = express.Router();

var taskController = require("../controllers/task.controller");


router.post("/",taskController.create);
router.put("/", taskController.update);
router.get("/", taskController.Index);


module.exports = router;