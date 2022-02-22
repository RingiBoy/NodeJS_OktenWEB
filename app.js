const express = require("express");

const hbs = require("express-handlebars");
const path = require("path");
const loginRouter = require("./routes/loginRouter");
const engine = hbs.engine;
const app = express();
const mainRouters = require("./routes/mainRouters");

//default setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));

//engine setup
app.set("view engine", "hbs");
app.engine(".hbs", engine({ defaultLayout: false }));
app.set("views", path.join(__dirname, "static"));

//main router
app.use(mainRouters);

//start server
app.listen(5200, () => {
  console.log("server started :5200port");
});
