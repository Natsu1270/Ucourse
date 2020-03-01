import firebase from 'firebase/app'
import 'firebase/auth'


const config = {
    apiKey: "AIzaSyAUrh7-ykx7skRlJ-VdQwrsbK44r6rVE8I",
    authDomain: "ucourse-341920.firebaseapp.com",
    databaseURL: "https://ucourse-341920.firebaseio.com",
    projectId: "ucourse-341920",
    storageBucket: "ucourse-341920.appspot.com",
    messagingSenderId: "248160019178",
    appId: "1:248160019178:web:1c6b4c67f20f820b7b6d93",
    measurementId: "G-PRRJH3TTMQ"
}

firebase.initializeApp(config)

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe()
            resolve(userAuth)
        }, reject)
    })
}

export const auth = firebase.auth()

export const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })
export const getStartedWithGoogle = () => auth.signInWithPopup(googleProvider)

export default firebase