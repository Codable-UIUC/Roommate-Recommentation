
import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next/types';
import test from 'node:test';
import someMiddleware from "../../middleware/handler";
import { MongoClient, ObjectId } from 'mongodb';
import { isTemplateLiteralTypeNode } from 'typescript';
import requireAuth from '../../middleware/requireAuth';
import { findDetail, findUser } from '../../library/mongodb';
import { decodeJWT } from '../../library/cookie';


const handler = nc<NextApiRequest, NextApiResponse>({
    onError: (err, req, res, next) => {
      console.error(err.stack);
      res.status(500).end("api/user_info:: Something broke!");
    },
    onNoMatch: (req, res) => {
      res.status(404).end("api/user_info:: Page is not found");
    },
  })
    .post(async (req, res) => {
        const {token} = JSON.parse(req.body)
        const id = decodeJWT(token)
        const data = await findUser(id)
        const detail = await findDetail(id)
        
        return res.json({data,detail})
    });

    //
    export default handler