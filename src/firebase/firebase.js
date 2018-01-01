import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBC6Zcri8_DvKJJV0Tfn_JYtzWgu84_MFM",
    authDomain: "tfdes-dev-43714.firebaseapp.com",
    databaseURL: "https://tfdes-dev-43714.firebaseio.com",
    projectId: "tfdes-dev-43714",
    storageBucket: "tfdes-dev-43714.appspot.com",
    messagingSenderId: "29757115519"
};

firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default }; 

//const notes = [
//    {
//        id: 12,
//        title: 'test',
//        body: 'body1'
//    },
//    {
//        id: 13,
//        title: 'test srgrs',
//        body: 'body1'
//    }
//];
//
//database.ref('notes').set(notes);

//database.ref().on('value', (snapshot) => {
//    console.log(snapshot.val());
//})

//firebase.database().ref().set({
//    name: 'Shreshth',
//    age: 28,
//    isMarried: false,
//    location: {
//        city: 'New Delhi',
//        country: 'India'
//    }
//});


database.ref('notes').once('value')
    .then((snapshot) => {
        const val = snapshot.val();
        console.log(val[0]);
    })
    .catch((error) => {
        console.log('error:', error );
    });


