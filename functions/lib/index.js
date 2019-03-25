"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_functions_1 = require("firebase-functions");
const firebase_admin_1 = require("firebase-admin");
const url_shortener_app_1 = require("./apps/url-shortener.app");
firebase_admin_1.initializeApp();
firebase_admin_1.firestore().settings({ timestampsInSnapshots: true });
exports.api = firebase_functions_1.https.onRequest(url_shortener_app_1.app);
//# sourceMappingURL=index.js.map