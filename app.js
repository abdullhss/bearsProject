const express = require("express");
const app = express();
app.set("view engine", "ejs");
const bodyparse = require("body-parser");
app.use(express.static("public"));
app.use(bodyparse.json());
app.use(bodyparse.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
const ip = "localhost";
const controllers = require("./controllers/authControllers")
const protect = require("./middleware/authenticate")
const mongoose = require("mongoose")
const User = require("./models/accountsSchema");
const Comment = require("./models/commentsSchema");

const cookieParser = require("cookie-parser");

let data;

app.use(cookieParser())


mongoose
  .connect(process.env.DB_CONN, {
  })
  .then((result) => {
    app.listen(process.env.PORT, () => {
      console.log(`App listening at http://${ip}:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", async (req, res) => {

  res.render("index");
});

app.get("/login", async (req, res) => {

  res.render("logIn");
});
app.get("/register", async (req, res) => {

  res.render("createAac");
});
app.get("/addExam", async (req, res) => {

  res.render("addExam");
});


app.post("/login" , controllers.login)
app.post("/register" , controllers.register)





app.post("/save", protect , async(req, res, next) => {
  const data = req.body;
  // console.log(data[0])
  // console.log(req.userId)
  const newData = await User.findByIdAndUpdate(req.userId , {Games : data} , {new : true})
  console.log(newData)
  res.render("test" , {data : data})

});

app.get("/home" , protect , async(req,res,next) => {

  const userData = await User.findById(req.userId , "Games")
  // console.log(userData.Games)
  
  res.render("test" , {data : userData.Games})
}
)

app.post("/comment" , async (req,res) => {
  
  const {name , comment} = req.body ;

  const newComment = new Comment({
    Name : name ,
    Comment : comment ,
  })

  try{
    await newComment.save();
    return res.status(200).render("index") ;
  }catch(err)
  {
    return res.status(404).render("index") ;
  }

}
)

app.get("/feedback" , async(req,res) => {

  try{
    const data = await Comment.find() ;

    return res.render("feedback" , {comments : data})
  }catch(err)
  {
    return res.status(404).render("feedback") ;
  }

}
)
