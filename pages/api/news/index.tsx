const Axios = require("axios");

export default (req, res) => {
  Axios.get("http://123.56.182.61:8070/api/v1/news/get")
    .then((resp) => {
      res.json(resp.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
