if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const articleRouter = require("./routes/articles");
const mongoose = require("mongoose");
const Article = require("./models/articles");
const methodOverride = require("method-override");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("database connected"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find({}).sort({
    createdAt: "desc",
  });
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);

app.listen(3000, () => console.log("server start"));
