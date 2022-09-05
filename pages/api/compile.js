import qs from "qs";
import axios from "axios";
import nextConnect from "next-connect";
const handler = nextConnect();
handler.use((_, __, next) => next());

handler.post((req, res) => {
  //getting the required data from the request
  let code = req.body.code;
  let language = req.body.lang;
  let input = req.body.input;

  if (language === "python") {
    language = "py";
  }

  var data = qs.stringify({
    code,
    language,
    input,
  });
  var config = {
    method: "post",
    url: "https://codex-api.herokuapp.com/",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  //calling the code compilation API
  axios(config)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error.message);
      console.log(error);
    });
});

export default handler;
