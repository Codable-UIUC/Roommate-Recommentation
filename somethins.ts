// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";
import nc from "next-connect";
import someMiddleware from "../handler";
import { type } from "os";
import { idText } from "typescript";
import {useState} from "react";

const something = nc<NextApiRequest, NextApiRespose>({
	onError:(err,req,res,next) => {
		console.error(err.stack);
		res.status(500).end("something whent Wrong")
	}
	onNoMatch: (req, res) => {
		res.status(404).end("Page is not found");
	},
})
.use(someMiddleware)




