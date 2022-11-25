// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ConnectionPoolReadyEvent, MongoClient, ObjectId } from "mongodb";
import nc from "next-connect";
import someMiddleware from "../../middleware/handler";
import { insertDetail, insertMatch, insertUser } from "../../library/mongodb";
import requireAuth from "../../middleware/requireAuth";

const BACK_URL = "http://127.0.0.1:5000/roomie";
//const BACK_URL = "http://illinoiskorean.web.illinois.edu/predict";
const DB = "test"
const DETAIL = "Details"
const USER = "Users"
const url = "mongodb://localhost:27017/";

type Data = {
  name: string;
};

async function getMatchList (id : string |undefined) {
  console.log(`getMatchList(${id}) - Request to BackEnd server Result Below:`)
  var axios = require("axios");
  var config = {
    method: "post",
    url: BACK_URL,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ id }),
  };
  let axiosResult = await axios(config);
  console.log(axiosResult.data)
  return axiosResult.data
}

const handler = nc<any, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .use(requireAuth)
  .post(async (req, res) => {
    try {
      
      const parsedBody = JSON.parse(req.body);
      const objectToInsert = {
        _id : new ObjectId(req.idd),
        name: parsedBody.name,
        MBTI: parsedBody.mbti,
        sex: parsedBody.gender,
        m_n: parsedBody.lifePattern,
        major: parsedBody.majorCategory,
        friend: parsedBody.numberInvitation,
        food: parsedBody.favoriteFoodCategory,
        age: parsedBody.ageCategory,
        year: parsedBody.schoolYear,
        religion: parsedBody.religionCategory,
      };

      const inserted_id  = await insertUser(objectToInsert, req.idd);
      const id_string = inserted_id?.toString()
      await insertDetail(id_string, parsedBody.description);

      const matchList = await getMatchList(id_string)

      const listId : any = matchList.map((e: any)=> {
        return e.id;
      })

      await insertMatch(id_string, listId, objectToInsert.name)
      
      return res.send("success")

    } catch (e) {
      console.log("error occurred while Information ts")
      //console.log(e);
      return res.send("fail")
    }


    })
  .get(async (_req, res) => {
    // let testCollection = client.db("test").collection("Users");
    // var obj = { value: "hello2" };
    // const result = await testCollection.insertOne(obj);
    // const id = result.insertedId.toString();

    // var axios = require("axios");

    // var config = {
    //   method: "post",
    //   url: BACK_URL,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: req.body,
    // };

    // axios(config)
    //   .then(function (response: any) {
    //     console.log(response.data);
    //     res.status(200).json(response.data);
    //   })
    //   .catch(function (err: any) {
    //     console.log(err);
    //     res.status(400).send(err);
    //   });
    return res.send("hello")
  });

export default handler;
