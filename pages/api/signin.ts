const jwt = require("jsonwebtoken");
import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next/types";
import { insertLogIn, verifyPassword } from "../../library/mongodb";
import requireAuth from "../../middleware/requireAuth";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .use(requireAuth)
  .post((req, res) => {
    const { email, password } = JSON.parse(req.body);

    console.log('api/signin  mehotd : post')

    verifyPassword(email, password).then((result) => {
      if (result == "wrong") return res.json({ data: "wrong password" });

      const id = result;
      const token = jwt.sign({ id }, "This is a Secret Key");
      const max_age = 60 * 60 * 3; // 3 hrs
      const domain = "localhost";
      const path = "/";

      res.setHeader(
        `Set-Cookie`,
        `token=${token};Max-Age=${max_age};Domain=${domain};Path=${path}`
      );

      return res.json({data:"success"});
    });
  })
  .get((req, res) => {
    res.send("hi");
  });

export default handler;
