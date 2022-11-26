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

export const insertUser = async (user: any, id:string) => {
  console.log(`insertUser - (user - ${user}, id - ${id})`)
  let result;
  const client = new MongoClient(URL);
  const userCollection = client.db(DB).collection(USER);
  try {
    const doesUserExist = await userExist(id)
    if (!doesUserExist) {
      console.log("insertUser::insert initiate...")
      const insert = await userCollection.insertOne(user);
      result = insert.insertedId
      console.log("insertUser::new user inserted : " + result.toString() )
    } else {
      console.log("insertUser::update initiate...")
      const update = await userCollection.replaceOne({_id : user._id}, user, {upsert:true})
      console.log(update)
      result = user._id
      
      //console.log("insertUser::user updated : " + result.toString() )
    }
  } catch (e) {
    console.log('error while insertUser')
    console.log(e)
  } finally {
    await client.close();
    return result;
  }
};

export const userExist = async (id : string) : Promise<boolean> => {
  console.log(`userExist id - ${id}`)
  const client = new MongoClient(URL);
  const userCollection = client.db(DB).collection(USER);
  const result = await userCollection.find({_id : new ObjectId(id)})
  if (!result) {
    console.log("userExist:: false")
    await client.close();
    return false;
  }
  console.log("userExist:: true")
  await client.close();
  return true
}

export const insertDetail = async (id : string|undefined, detail : string) => {
  let result;
  const client = new MongoClient(URL);
  const detailCollection = client.db(DB).collection(DETAIL);

  try {
    result = await detailCollection.insertOne({
      _id : new ObjectId(id),
      content : detail
    })

    
  } catch (e) {
    result = await detailCollection.updateOne({_id : id},{content : detail})
    
  } finally {
    await client.close();
    return result;
  }
}

export const insertLogIn = async (email : string, pw : string) => {
  let result;
  const client = new MongoClient(URL);
  const loginCollection = client.db(DB).collection(LOGIN);
  const {salt, passwordHash} = hashPassword(pw);
  try {
    result = await loginCollection.insertOne({
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

export const matchExist = async (id: string) => {
  console.log(`userExist id - ${id}`)
  const client = new MongoClient(URL);
  const matchCollection = client.db(DB).collection(MATCH);
  const result = await matchCollection.find({_id : new ObjectId(id)})
  if (!result) {
    console.log("userExist:: false")
    await client.close();
    return false;
  }
  console.log("userExist:: true")
  await client.close();
  return true
}

export const insertMatch = async (id: string |undefined, array: string[], name : string) => {
  console.log(`insertMatch:: Exec id - ${id}, array - ${array}, name - ${name}
  result : `)
  let result;
  const client = new MongoClient(URL);
  const matchCollection = client.db(DB).collection(MATCH);
  try {
    if (id == undefined)
      throw "id is undefined"
    const idExist = await matchExist(id);
    if (!idExist) {
      result = await matchCollection.insertOne({
        _id: new ObjectId(id),
        match: array,
        name : name
      });
    } else {
      result = await matchCollection.replaceOne({_id : new ObjectId(id)},{
        _id: new ObjectId(id),
        match: array,
        name : name
      },{upsert : true})
    }
  } catch (e) {
    console.log('error while insertMatch')
    console.log(e);
    result = null;
  } finally {
    await client.close();
    console.log(result)
    return result;
  }
};

export const findMatchUsers = async (id: string) => {
  console.log(`findMatchUsers Exec (id - ${id})`)
  const client = new MongoClient(URL);
  const matchCollection = client.db(DB).collection(MATCH);
  const detailCollection = client.db(DB).collection(DETAIL);
  let users : any[] = [];
  try {
    const result = await matchCollection.findOne({ _id: new ObjectId(id) });

    if (!result) {
      console.log ('findMatchUsers:: No matching id in Match Collection')
      await client.close();
      return "no info"
    }
    
    const query_strings = result?.match.map((id : string) => {
      return new ObjectId(id)
    })

    console.log('query string = ' + query_strings)

     await detailCollection.find({_id: {$in :query_strings}}).forEach((doc) => {
      users.push(doc)
    });
  } catch (e) {
    console.log("findMatchUsers:: Catch Error")
    await client.close();
    return "Error";
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

export const findUser = async (id : string) => {
  console.log("findUser::Exec - id" + id)
  let result
  const client = new MongoClient(URL);
  const userCollection = client.db(DB).collection(USER);
  result = await userCollection.findOne({_id : new ObjectId(id)})
  client.close();
  return result
}

export const findDetail = async (id : string) => {
  console.log("findDetail::Exec - id" + id)
  let result
  const client = new MongoClient(URL);
  const detailCollection = client.db(DB).collection(DETAIL);
  result = await detailCollection.findOne({_id : new ObjectId(id)})
  client.close();
  return result
}