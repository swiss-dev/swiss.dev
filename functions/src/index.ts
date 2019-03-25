import {https} from 'firebase-functions';
import {firestore, initializeApp} from 'firebase-admin';
import {app as urlShortenerApp} from './apps/url-shortener.app';


initializeApp();
firestore().settings({timestampsInSnapshots: true});

export const api = https.onRequest(urlShortenerApp);