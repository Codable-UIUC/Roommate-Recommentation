import nc from "next-connect";

import { NextApiRequest, NextApiResponse } from "next";
import { decodeJWT } from "../library/cookie";

export default function requireAuth (req:any, res:NextApiResponse, next:any) {
    
    if(req.cookies.token) {
        //console.log('hi')   
        console.log("MW requireAuth::")
        var decoded = decodeJWT(req.cookies.token)
        if (req.method == 'GET') {
            return res.json({data:decoded.id})
        }
        req.idd = decoded.id
    }
    
    next();
}