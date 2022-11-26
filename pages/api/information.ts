// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ConnectionPoolReadyEvent, MongoClient, ObjectId } from "mongodb";
import nc from "next-connect";
import { insertDetail, insertMatch, insertUser } from "../../library/mongodb";
import requireAuth from "../../middleware/requireAuth";
import logger from "../../library/logger"
import { info } from "console";
import { getModeForResolutionAtIndex } from "typescript";

const BACK_URL = process.env.NEXT_PUBLIC_BACK_URL;
//const BACK_URL = "http://illinoiskorean.web.illinois.edu/predict";


async function getMatchList (id : string |undefined) {
  logger.info({id}, 'getMatchList::exec - Request to BackEnd server Result Below')
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
  const final = axiosResult.data
  logger.info({final}, 'getMatchList:: Retrieved Data')
  return final
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
      logger.info({reqbody: parsedBody}, 'api/information:: POST request')
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

      console.log(matchList)

      const listId : any = matchList.id
      const listName : any = matchList.names

      await insertMatch(id_string, listId, listName)
      
      return res.send("success")

    } catch (e) {
      logger.error (e, 'api/information:: ERROR occured')
      //console.log(e);
      return res.send("fail")
    }


    })
  .get(async (_req, res) => {

    return res.send("hello")
  });

export default handler;
