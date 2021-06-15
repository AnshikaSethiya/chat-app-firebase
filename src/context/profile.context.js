import { createContext, useState, useContext, useEffect } from "react";
import { auth, database } from "../misc/Firebase";
import firebase from "firebase/app";

// Used "firebase real-time presence" for code info visit 
// "https://firebase.google.com/docs/firestore/solutions/presence"

 export const isOfflineForDatabase = {
    state: 'offline',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
  };
  
export const isOnlineForDatabase = {
    state: 'online',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
  };
  
export const ProfileContext = createContext();
  
  export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      let useRef;
      let userStatusRef;
  
      const authUnsub = auth.onAuthStateChanged(authObj => {
        if (authObj) {
          userStatusRef = database.ref(`/status/${authObj.uid}`);
          useRef = database.ref(`/profiles/${authObj.uid}`);
          useRef.on('value', snap => {
            const { name, createdAt, avatar } = snap.val();
  
            const data = {
              name,
              createdAt,
              avatar,
              uid: authObj.uid,
              email: authObj.email,
            };
            setProfile(data);
            setIsLoading(false);
          });
  
          database
            .ref('.info/connected')
            .on('value', snapshot => {
              // If we're not currently connected, don't do anything.
              if (snapshot.val() === false) {
                return;
              }
  
              userStatusRef
                .onDisconnect()
                .set(isOfflineForDatabase)
                .then(() => {
                  userStatusRef.set(isOnlineForDatabase);
                });
            });
        } else {
          if (useRef) {
            useRef.off();
          }
  
          if (userStatusRef) {
            userStatusRef.off();
          }

          database
            .ref('.info/connected').off()

          setProfile(null);
          setIsLoading(false);
        }
      });
      return () => {
        authUnsub();

        database
            .ref('.info/connected').off()
  
        if (useRef) {
          useRef.off();
        }
        if (userStatusRef) {
          userStatusRef.off();
        }
      };
    }, []);
    return (
      <ProfileContext.Provider value={{ profile, isLoading }}>
        {children}
      </ProfileContext.Provider>
    );
  };
  
 export const useProfile = () => useContext(ProfileContext);

//   export default useProfile;