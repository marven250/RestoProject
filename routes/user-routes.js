const router = require("../routes/resto")
const User = require("../models/user")
const Food = require("../models/food")
const bcrypt = require("bcryptjs")


router.get("/signup", (req, res, next) => {
  res.render("Users/signup")
})

router.get("/adder", (req, res, next)=>{
  res.render("Users/adder")
})

router.get("/deleteMe/:id", (req, res, next)=>{
  res.render("Users/affirm")
})

router.post("/deleteMe/:id", (req, res, next)=>{
  const id = req.params.id
  User.findByIdAndDelete(id).then(account=>{
    console.log(account)
  })
  req.session.destroy()
    res.redirect("/")
})

router.post("/adder", (req, res, next)=>{
  const title = req.body.title
  const type = req.body.type
  const description= req.body.description
  const image = req.body.image

    Food.create({
      title: title,
      type: type,
      description: description,
      image: image
    }).then((newFood)=>{
      console.log("============>>>>>>", newFood)
      res.redirect("/adder")
    })
})

router.get("/userAdder", (req, res, next) => {
  res.render("Users/userAdder")
})


router.post("/signup", (req, res, next)=>{
      const userName = req.body.theUsername
      const password = req.body.thePassword

      const salt = bcrypt.genSaltSync(10)
      const hasher = bcrypt.hashSync(password, salt)

  if (userName === "" || password === "") {
    res.render("Users/signup", {
      errorMessage: "Please enter both, username and password to sign up."
    });
    return;
  }
  if (userName.length < 4 || password.length< 4) {
    res.render("Users/signup", {
      errorMessage: "Please make sure both username password lengths are greater than 3 characters."
    });
    return;
  }


      User.create({
        username: userName,
        password: hasher,
        isAdmin: false
      }).then((newUser)=>{
        console.log("////////////////", newUser)
        res.redirect("/login")
      }).catch((err)=>{
        next(err)
      })

})

router.get("/profile", (req, res, next)=>{
  if(req.session.currentUser){
    res.render("Users/profile", {theUser: req.session.currentUser})
  }else{
    res.redirect("/login")
  }
 
})


router.get("/login", (req, res, next)=>{

  res.render("Users/login")
})

router.post("/login", (req, res, next)=>{
  console.log(req.body)
  const userName = req.body.username
  const password = req.body.password

  if (userName === "" || password === "") {
    res.render("Users/login", {
      errorMessage: "Please enter both, username and password to login."
    });
    return;
  }

  User.findOne({ username: userName })
    .then(user => {
      if (!user) {
        res.render("Users/login", {
          errorMessage: "The username doesn't exist."
        });
        return;
      }
      if (bcrypt.compareSync(password, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user;
        res.redirect("/profile");
      } else {
        res.render("Users/login", {
          errorMessage: "Incorrect password"
        });
      }
    })
    .catch(error => {
      next(error);
    })
});

router.post("/logout", (req, res, next)=>{
    req.session.destroy()

    res.redirect("/")

})




module.exports = router