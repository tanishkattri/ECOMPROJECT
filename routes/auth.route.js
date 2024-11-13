
const authController = require("../controllers/auth.controller")
const authMW = require("../middlewares/auth_mw")

module.exports = (app)=>{
  app.post("/ecomm/api/v1/auth/signup", [authMW.verifySignUp],authController.signup)

  // defining route for signin 
  app.post("/ecomm/api/v1/auth/signin", [authMW.verifySignIn],authController.signIn)
}