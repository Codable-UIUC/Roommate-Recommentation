
import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next/types';
import test from 'node:test';
import someMiddleware from "../../middleware/handler";
import { MongoClient, ObjectId } from 'mongodb';
import { isTemplateLiteralTypeNode } from 'typescript';
import requireAuth from '../../middleware/requireAuth';

const url = "mongodb://localhost:27017/";
const client = new MongoClient(url)



const handler = nc<NextApiRequest, NextApiResponse>({
    onError: (err, req, res, next) => {
      console.error(err.stack);
      res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res) => {
      res.status(404).end("Page is not found");
    },
  })
    .use(someMiddleware)
    .use(requireAuth)
    .get(async (req, res) => {
        const SAMPLE_ID = "637adcac3000c17db821574a"
        try {
            let testCollection = client.db('test').collection('first')
            const result = await testCollection.findOne({_id : new ObjectId(SAMPLE_ID)})
            console.log(result)
            res.json(result)
        } catch (err) {
            console.log(err)
        } finally {
            await client.close()
        }
    })
    .post(async (req, res) => {
        try {
            let testCollection = client.db('test').collection('first')
            var obj = {value:'hello2'}
            const result =  await testCollection.insertOne(obj)
            const id = result.insertedId.toString()

            res.json({status : 'good', id})
            }
        catch(err) {
           console.log(err) 
        } finally {
            await client.close()
        } })
            
    
    .put(async (req, res) => {
      res.end("async/await is also supported!");
    })
    .patch(async (req, res) => {
      throw new Error("Throws me around! Error can be caught and handled.");
    });

    export default handler