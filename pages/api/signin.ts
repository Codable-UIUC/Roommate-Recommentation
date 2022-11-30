const jwt = require("jsonwebtoken");
import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next/types";
import { createJWT } from "../../library/cookie";
import { insertLogIn, verifyPassword } from "../../library/mongodb";
import requireAuth from "../../middleware/requireAuth";
import logger from "../../library/logger";

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
    logger.info('api/signin  methodd : post')

    verifyPassword(email, password).then((result) => {
      if (result == "wrong") return res.json({ data: "wrong password" });
      if (result == "no matching id") return res.json({data : "no matching email"})

      
      const id = result;
      const token = createJWT({id});
      const max_age = 60 * 60 * 3; // 3 hrs
      const domain = process.env.NEXT_PUBLIC_FRONT_DOMAIN;
      const path = "/";

      res.setHeader(
        `Set-Cookie`,
        `token=${token};Max-Age=${max_age};Domain=${domain};Path=${path}`
      );

      return res.json({data:"success"});
    });
  })
  .get((req, res) => {
    console.log('api/signin  method : get')
    res.json({data : "hi"});
  });

export default handler;
