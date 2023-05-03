// Your web app's Firebase configuration
const config = {
    apiKey: "AIzaSyC6n3Wgev9Lhfi18D9Cqc89qZ6m6TVgQvo",
    authDomain: "photo-tagging-game-9c180.firebaseapp.com",
    projectId: "photo-tagging-game-9c180",
    storageBucket: "photo-tagging-game-9c180.appspot.com",
    messagingSenderId: "247766781784",
    appId: "1:247766781784:web:0ed2d65de3c8d338a65f2d",
};

// Initialize Firebase
export function getFirebaseConfig() {
    if (!config || !config.apiKey) {
        throw new Error(
            "No Firebase configuration object provided." +
                "\n" +
                "Add your web app's configuration object to firebase-config.js"
        );
    } else {
        console.log("got config");
        return config;
    }
}
