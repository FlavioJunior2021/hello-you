import React from 'react';
import {Route, Switch} from 'react-router-dom';
import { FacebookAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { createContext, useState, useEffect } from 'react';
import { HomePage } from '../pages/loginPage/index';
import { NewRoom } from '../pages/newRoom/index';
import { ChatRoom } from '../pages/Room/index'


export const AuthContext = createContext({});

export function AuthContextProvider() {

    const [user, setUser] = useState();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            const { displayName, photoURL, uid } = user
    
            if (!displayName || !photoURL) {
              throw new Error('Missing information from Google Account.');
            }
            setUser({
              id: uid,
              name: displayName,
              avatar: photoURL
            })
          }
        })
        return () => {
          unsubscribe();
        }
    },[])

  async function signInWithGoogle(){
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider)
    if(result.user){
      const {displayName, photoURL, uid} = result.user;
      if(!displayName || !photoURL){
        throw new Error("Missing information from Google Account");
      }
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }
  async function signInWithFacebook(){
    const provider = new FacebookAuthProvider();
        const auth = getAuth();
        const result = await  signInWithPopup(auth, provider);
       
        if(result.user){
          const {displayName, photoURL, uid} = result.user;
          if(!displayName || !photoURL){
            throw new Error("Missing information from Google Account");
          }
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
        }
  }
    return(
        <AuthContext.Provider value={{user, signInWithGoogle, signInWithFacebook}} >
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/rooms/new" component={NewRoom} />
            <Route path="/rooms/:id"  component={ChatRoom} />
          </Switch>
        </AuthContext.Provider>
    );
}