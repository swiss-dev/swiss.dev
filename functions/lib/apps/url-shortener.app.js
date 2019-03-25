"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const yub = require("yub");
const crypto_1 = require("crypto");
const firebase_admin_1 = require("firebase-admin");
const firebase_functions_1 = require("firebase-functions");
exports.app = express();
yub.init(firebase_functions_1.config().otp.id, firebase_functions_1.config().otp.key);
function generateId(url, offset = 0) {
    return __awaiter(this, void 0, void 0, function* () {
        let hash = crypto_1.createHmac('sha256', offset === 0 ? url : url + offset)
            .digest('hex');
        hash = hash.slice(hash.length - 8, hash.length);
        const doc = yield firebase_admin_1.firestore().collection('urls').doc(hash).get();
        if (doc.exists && doc.data().url !== url) {
            return yield generateId(url, offset + 1);
        }
        else {
            return hash;
        }
    });
}
function shorten(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(req.body && req.body.url && req.body.token)) {
            res.status(400).send('URL or Token missing.');
            return;
        }
        const url = req.body.url;
        const token = req.body.token;
        // todo: verify token
        const data = yield new Promise((resolve, reject) => yub.verify(token, (err, dat) => err ? reject(err) : resolve(dat)));
        if (!data.valid) {
            res.status(401).send('No valid token provided.');
            return;
        }
        else {
            const authorisedUsers = yield firebase_admin_1.firestore().collection('admin').doc('authorisedUsers').get();
            if (!authorisedUsers.data().users.some(u => u === data.identity)) {
                res.status(401).send('Unauthorised.');
                return;
            }
        }
        // generate id
        const id = yield generateId(url);
        yield firebase_admin_1.firestore().collection('urls').doc(id).set({
            url: url
        });
        res.status(200).send({
            url: `https://swiss.dev/l/${id}/`
        });
    });
}
function redirect(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        if (!id) {
            res.status(400).send('Invalid link specified.');
            return;
        }
        const doc = yield firebase_admin_1.firestore().collection('urls').doc(id).get();
        if (!doc.exists) {
            res.status(400).send('Invalid link specified.');
            return;
        }
        res.redirect(doc.data().url);
    });
}
const router = express.Router();
exports.app.use('/url', router);
exports.app.use('/l', router);
router.use(cors({ origin: '*' }));
router.post('/shorten', shorten);
router.get('/:id', redirect);
//# sourceMappingURL=url-shortener.app.js.map