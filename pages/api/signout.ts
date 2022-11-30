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
    .get(async (req, res) => {
        const domain = process.env.NEXT_PUBLIC_FRONT_DOMAIN;
        //res.setHeader(`Set-Cookie`,`token=deleted;expires=Thu, 01 Jan 1970 00:00:00 GMT;Domain=${domain};Path=/`)
        res.setHeader(`Set-Cookie`,`token=;Max-Age=0;Domain=${domain};Path=/`)
    
        res.json({data : "success"})
    })
            

    export default handler
