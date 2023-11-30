"use client";

import { useState, useEffect } from "react";
// import { updateProfile } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
// import { getAuth } from "../../../firebase";
import { useRouter } from "next/navigation";
import { updateDoc, doc, collection, getDocs, query, where, orderBy, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { toast } from "react-toastify";
import ListingItem from "../../components/ListingItem";
import Link from "next/link";

function Profile() {
  const { user, updateUser } = useAuth();
  // const auth = {
  //   currentUser: {
  //     uid: "uid",
  //     displayName: "displayName",
  //     email: "email",
  //   },
  // };
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({});

  const { displayName, email } = formData;
  const router = useRouter();

  useEffect(() => {
    setFormData({
      displayName: user.displayName ?? "",
      email: user.email,
    });
    const fetchUserListings = async () => {
      const listingsRef = collection(db, "listings");

      const q = query(listingsRef, where("userRef", "==", user.uid), orderBy("timestamp", "desc"));

      const querySnap = await getDocs(q);

      let listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings(listings);
      setLoading(false);
    };

    fetchUserListings();
  }, [user]);

  const onLogout = () => {
    auth.signOut();
    router.push("/");
  };

  const onSubmit = async () => {
    try {
      if (user.displayName !== displayName) {
        // Update display name in fb
        await updateUser(displayName);

        // Update in firestore
        // const userRef = doc(db, "users", user.uid);
        // await updateDoc(userRef, {
        //   displayName,
        // });
      }
    } catch (error) {
      console.log(error);
      toast.error("Kunne ikke opdatere profilen");
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onDelete = async (listingId) => {
    // if (window.confirm("Er du sikker på du vil slette?")) {
    //   await deleteDoc(doc(db, "listings", listingId));
    //   const updatedListings = listings.filter((listing) => listing.id !== listingId);
    //   setListings(updatedListings);
    //   toast.success("Profilen blev slettet");
    // }
  };

  const onEdit = (listingId) => router.push(`/admin/edit/?id=${listingId}`);

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">Min profil</p>
        <button type="button" className="logOut" onClick={onLogout}>
          Log ud
        </button>
      </header>

      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personlige oplysninger</p>
          <button
            className="button"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? "Gem oplysninger" : "Ret oplysninger"}
          </button>
        </div>

        <div className="profileCard">
          <form>
            <input type="text" id="displayName" className={"input"} disabled={!changeDetails} value={displayName} onChange={onChange} />
            <input type="email" id="email" className={"input"} disabled={!changeDetails} value={email} onChange={onChange} />
          </form>
        </div>

        <Link href="/create-listing" className="button">
          Sælg din kolonihave
        </Link>

        {!loading && listings?.length > 0 && (
          <>
            <h3>Dine annoncer</h3>
            <ul className="listingsList">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}

export default Profile;
