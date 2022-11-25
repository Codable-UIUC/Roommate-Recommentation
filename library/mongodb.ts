import { MongoClient, ObjectId } from "mongodb";

const crypto = require('crypto');


var sha512 = function(password:string, salt:string){
  var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  hash.update(password);
  var value = hash.digest('hex');
  return {
  salt:salt,
  passwordHash:value
  };
  };
  

function hashPassword(password: string) {
  const salt2= crypto.randomBytes(128).toString('base64');

  const {salt, passwordHash} = sha512(password, salt2);

  return {
      salt: salt,
      passwordHash: passwordHash,
  };
}

const DB = "test";
const DETAIL = "Details";
const MATCH = "Match";
const USER = "Users";
const LOGIN = "Login";
const URL = "mongodb://localhost:27017/";

export const insertUser = async (user: any) => {
  let result;
  const client = new MongoClient(URL);
  const userCollection = client.db(DB).collection(USER);
  try {
    result = await userCollection.insertOne(user);
  } catch (e) {
    console.log(e);
    result = null;
  } finally {
    await client.close();
    return result;
  }
};

export const insertDetail = async (id : any, detail : any) => {
  let result;
  const client = new MongoClient(URL);
  const detailCollection = client.db(DB).collection(DETAIL);

  try {
    result = await detailCollection.insertOne({
      _id : id,
      content : detail
    })
  } catch (e) {
    console.log(e);
    result = "";
  } finally {
    await client.close();
    return result;
  }
}

export const insertLogIn = async (email : any, pw : any) => {
  let result;
  const client = new MongoClient(URL);
  const detailCollection = client.db(DB).collection(LOGIN);
  const {salt, passwordHash} = hashPassword(pw);
  try {
    result = await detailCollection.insertOne({
      email : email,
      passwordHash : passwordHash,
      salt : salt
    })
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
    return result;
  }
}

export const insertMatch = async (id: any, array: string[]) => {
  let result;
  const client = new MongoClient(URL);
  const matchCollection = client.db(DB).collection(MATCH);
  try {

    result = await matchCollection.insertOne({
      _id: new ObjectId(id),
      match: array,
    });
  } catch (e) {
    console.log(e);
    result = null;
  } finally {
    await client.close();
    return result;
  }
};

export const findMatchUsers = async (id: string) => {
  console.log("findMatchUsers Exec")
  console.log(id)
  const client = new MongoClient(URL);
  const matchCollection = client.db(DB).collection(MATCH);
  const detailCollection = client.db(DB).collection(DETAIL);
  let users = [];
  try {
    const result = await matchCollection.findOne({ _id: new ObjectId(id) });
    console.log(result?.match)
    const query_strings = result?.match.map((id : string) => {
      return new ObjectId(id)
    })

     await detailCollection.find({_id: query_strings}).forEach((e:any) => {
      console.log(e)
      users.push(e)
    });
  } catch (e) {
    console.log(e)
    users.push("Error Occured") ;
  } finally {
    await client.close();
    return users;
  }
};

export const EmailExist = async (email: string) => {
  const client = new MongoClient(URL);
  const loginCollection = client.db(DB).collection(LOGIN);
  
    const result = await loginCollection.findOne({ email: email });
    console.log(result)
    if (result)
      return true
    else
      return false
};

export const verifyPassword = async (email:string, password:string) => {
  const client = new MongoClient(URL);
  const loginCollection = client.db(DB).collection(LOGIN);
  const result = await loginCollection.findOne({ email: email });

  const input = sha512(password,result?.salt).passwordHash
  const actual = result?.passwordHash

  if (input == actual) {

    return result?._id.toString()
  }
    
  
  return "wrong"
   
}