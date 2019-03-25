import * as express from 'express';
import * as cors from 'cors';
import * as yub from 'yub';
import {createHmac} from 'crypto';
import {firestore} from 'firebase-admin';
import {config} from 'firebase-functions';

export const app = express();
yub.init(config().otp.id, config().otp.key);

async function generateId(url: string, offset = 0): Promise<string> {

  let hash: string = createHmac('sha256', offset === 0 ? url : url + offset)
    .digest('hex');
  hash = hash.slice(hash.length - 8, hash.length);
  const doc = await firestore().collection('urls').doc(hash).get();
  if (doc.exists) {
    return await generateId(url, offset + 1);
  } else {
    return hash;
  }
}

async function shorten(req: express.Request, res: express.Response) {
  if (!(req.body && req.body.url && req.body.token)) {
    res.status(400).send('URL or Token missing.');
    return;
  }
  const url: string = req.body.url;
  const token: string = req.body.token;

  // todo: verify token
  const data = await new Promise<yub.YubResponse>((resolve, reject) => yub.verify(token, (err, dat) => err ? reject(err) : resolve(dat)));

  if (!data.valid) {
    res.status(401).send('No valid token provided.');
    return;
  } else {
    const authorisedUsers = await firestore().collection('admin').doc('authorisedUsers').get();
    if (!authorisedUsers.data().users.some(u => u === data.identity)) {
      res.status(401).send('Unauthorised.');
      return;
    }
  }

  // generate id
  const id = await generateId(url);

  await firestore().collection('urls').doc(id).set({
    url: url
  });

  res.status(200).send({
    url: `https://swiss.dev/l/${id}/`
  });

}

async function redirect(req: express.Request, res: express.Response) {
  const id = req.params.id;
  if (!id) {
    res.status(400).send('Invalid link specified.');
    return;
  }
  const doc = await firestore().collection('urls').doc(id).get();
  if (!doc.exists) {
    res.status(400).send('Invalid link specified.');
    return;
  }
  res.redirect(doc.data().url);
}
const router = express.Router();

app.use('/url', router);
app.use('/l', router);



router.use(cors({origin: '*'}));
router.post('/shorten', shorten);
router.get('/:id', redirect);
