import { useEffect, useState } from "react";
import firebase, { auth } from "../../firebase";

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("auth", auth);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
}
