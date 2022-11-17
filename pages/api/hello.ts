// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

//const BACK_URL = "http://127.0.0.1:5000/predict";
const BACK_URL = "http://illinoiskorean.web.illinois.edu/predict";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  var axios = require("axios");

  var config = {
    method: "post",
    url: BACK_URL,
    headers: {
      "Content-Type": "application/json",
    },
    data: req.body,
  };

  axios(config)
    .then(function (response : any) {
      console.log(response.data)
      res.status(200).json(response.data);
    })
    .catch(function (err : any) {
      console.log(err)
      res.status(400).send(err);
    });

}
