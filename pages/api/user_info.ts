
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
        console.log(req)
        console.log("req.body 검사")
        console.log(req.body) // req body 가 자동으로 바뀌네 ㅎ....
        const token = (req.body)
        console.log("token 검사")
        console.log(token) 
        const id = decodeJWT(token)
        console.log("id 검사")
        console.log(id) 
        const data = await findUser(id)
        const detail = await findDetail(id)

        if (!data && !detail){
            res.json({data : 'no matching'})
        }
        
        return res.json({data,detail})
    });

    
export default handler