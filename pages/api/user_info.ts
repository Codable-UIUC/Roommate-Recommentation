
import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next/types';
import { findDetail, findUser } from '../../library/mongodb';
import { decodeJWT } from '../../library/cookie';


const handler = nc<NextApiRequest, NextApiResponse>({
    onError: (err, req, res, next) => {
        console.log('api/user_info::Error ')
      console.error(err.stack);
      res.status(500).end("api/user_info:: Something broke!");
    },
    onNoMatch: (req, res) => {
      res.status(404).end("api/user_info:: Page is not found");
    },
  })
    .post(async (req, res) => {
        console.log('api/user_info::POST request')
        //console.log(req.body) // req body 가 자동으로 바뀌네 ㅎ....
        const {token} = (req.body)
        const id = decodeJWT(token)
        const data = await findUser(id)
        const detail = await findDetail(id)

        if (!data && !detail){
            res.json({data : 'no matching'})
        }
        
        return res.json({data,detail})
    });

    
export default handler