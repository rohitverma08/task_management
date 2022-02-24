const express = require(`express`);
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongooserequiring = require(`./db/mongoose`);
const port = process.env.PORT;
app.use(express.json());
app.listen(port, () => {console.log("Server is up at " + port);});


var TaskRouter = require("./routes/task");

app.use("/v1/task", TaskRouter);