let FRONT_URL = "http://localhost:3000";

const SECRET_KEY = "This is a Secret Key"

export async function fetchData (token : string) {
    if (token) {
      const result = await fetch(FRONT_URL + '/api/signin')
      const result_id = await result.json()
      return result_id.data
    }
  }

export const parseCookie = (cookie : string ) =>
cookie
  .split(';')
  .map(v => v.split('='))
  .reduce((acc : any, v) => {
    acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
    return acc;
  }, {});

export const getIDwithCookie = (cookie : string) => {
    const token = parseCookie(cookie);
    return fetchData(token)
}

export const decodeJWT = (token : string) => {
    const jwt = require('jsonwebtoken');
    var decoded = jwt.verify(token, SECRET_KEY);
    return decoded
}

export const createJWT = (object : any) => {
    const jwt = require('jsonwebtoken');
    return jwt.sign(object, SECRET_KEY)
}