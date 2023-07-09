import { db } from "../database/database.connection.js";

export const validateAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log(authorization, "a lá a validação e o carai");
    const token = authorization?.replace("Bearer ", "");
    const session = await db.collection('session').findOne({ token });

    if (!token || !session) return res.sendStatus(401);
    next();
  }
  catch (err) { res.status(500).send(err.message); }
};
/* {
  host: 'localhost:5000',
  connection: 'keep-alive',
  'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114"',
  accept: 'application/json, text/plain, ',
  'sec-ch-ua-mobile': '?0',
  authorization: 'Bearer undefined',
  'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
  'sec-ch-ua-platform': '"Linux"',
  origin: 'http://localhost:5173',
  'sec-fetch-site': 'same-site',
  'sec-fetch-mode': 'cors',
  'sec-fetch-dest': 'empty',
  referer: 'http://localhost:5173/',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'en-US,en;q=0.9,pt;q=0.8',
  'if-none-match': 'W/"2-l9Fw4VUO7kr8CvBlt4zaMCqXZ0w"'
} a lá a validação e o carai
{
  host: 'localhost:5000',
  connection: 'keep-alive',
  'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114"',
  accept: 'application/json, text/plain, ',
  'sec-ch-ua-mobile': '?0',
  authorization: 'Bearer undefined',
  'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
  'sec-ch-ua-platform': '"Linux"',
  origin: 'http://localhost:5173',
  'sec-fetch-site': 'same-site',
  'sec-fetch-mode': 'cors',
  'sec-fetch-dest': 'empty',
  referer: 'http://localhost:5173/',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'en-US,en;q=0.9,pt;q=0.8',
  'if-none-match': 'W/"2-l9Fw4VUO7kr8CvBlt4zaMCqXZ0w"'
} a lá a validação e o carai
 */