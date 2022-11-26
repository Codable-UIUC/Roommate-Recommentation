const jwt = require('jsonwebtoken')
import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next/types';
import { createJWT } from '../../library/cookie';
import { EmailExist, insertLogIn } from '../../library/mongodb';

const handler = nc<NextApiRequest, NextApiResponse>({
    onError: (err, req, res, next) => {
      console.error(err.stack);
      res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res) => {
      res.status(404).end("Page is not found");
    },
  })
    .post(async (req, res) => {
        const {email, password} = JSON.parse(req.body);

        if (await EmailExist(email)) {
            return res.json({data :"email already exist"})
        }
        
        const result = await insertLogIn(email, password);
        console.log(result)
        const id = result?.insertedId.toString();

        const token = createJWT({id})
        const max_age = 60 * 60 * 3;
        const domain = 'localhost'
        const path = '/'

        res.setHeader(`Set-Cookie`,`token=${token};Max-Age=${max_age};Domain=${domain};Path=${path}`)
        res.json({data : "success"})
    })
            

    export default handler