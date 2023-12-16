import express from "express"
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

var userIsAuthorised;


const app = express()
const port = 3000

const __dirname = dirname(fileURLToPath(import.meta.url));



app.use(bodyParser.urlencoded({extended:true}));

function authoriseUser(req,res,next)
{
  var password = req.body["password"];
  if(password == "password1234")
  {
    userIsAuthorised = true;

  }
  next();
}

app.use(authoriseUser);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");

});

app.post("/check", (req,res) => {

  if(userIsAuthorised)
  {
    res.sendFile(__dirname + "/public/secret.html");
  }
  else
  {
    res.sendFile(__dirname + "/public/index.html");
  }

});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})