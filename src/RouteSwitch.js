import React, { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "./firebaseConfig.js";

import {
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "firebase/auth";

import {
    getFirestore,
    collection,
    doc,
    addDoc,
    deleteDoc,
    getDocs,
    updateDoc,
    query,
    serverTimestamp,
    where,
    orderBy,
    collectionGroup,
} from "firebase/firestore/lite";

const RouteSwitch = () => {
    const getLevels = async () => {
        try {
            console.log(getFirestore());
            const levelsQuery = query(collection(getFirestore(), "gameLevels"));
            console.log(levelsQuery);

            const levelsQuerySnapshot = await getDocs(levelsQuery);
            levelsQuerySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
            });
        } catch (error) {
            console.log("sign out error: " + error);
        }
    };

    useEffect(() => {
        // getLevels();
    }, []);

    return (
        <BrowserRouter>
            <Routes></Routes>
        </BrowserRouter>
    );
};

export default RouteSwitch;
