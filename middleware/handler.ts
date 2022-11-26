import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

function someMiddleware(req: NextApiRequest, res: NextApiResponse, next: any) {
    if (req.method == "GET") {
        console.log("GET method called")
    }
  console.log(req.body);
  next();
}

export default someMiddleware;
