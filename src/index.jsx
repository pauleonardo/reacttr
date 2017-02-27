// index.jsx
import React from 'react'
import { render } from 'react-dom'
import firebase from 'firebase'

import App from './components/App'

  firebase.initializeApp({
    apiKey: 'AIzaSyAINDWtcBA_PeFZoZNbfzXQA5yAq8t6sq8',
    authDomain: 'clon-twitter.firebaseapp.com',
    databaseURL: 'https://clon-twitter.firebaseio.com',
    storageBucket: 'clon-twitter.appspot.com',
    messagingSenderId: '622046032510'
  });


render(<App />, document.getElementById('root'));