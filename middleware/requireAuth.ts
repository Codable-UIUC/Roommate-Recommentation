const jwt = require('jsonwebtoken');
import nc from "next-connect";

import { NextApiRequest, NextApiResponse } from "next";

export default function requireAuth (req:any, res:NextApiResponse, next:any) {
    
    if(req.cookies.token) {
        //console.log('hi')   
        var decoded = jwt.verify(req.cookies.token, 'This is a Secret Key');
        if (req.method == 'GET') {
            return res.json({data:decoded.id})
        }
        req.idd = decoded.id
    }
    
    next();
}