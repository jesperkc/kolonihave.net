import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateDoc, doc, collection, getDocs, query, where, orderBy, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import Listing from "./listing";
import { useRouter } from "next/navigation";

type Allotment = {
  id: any;
  data: any;
};

const Listings = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<Allotment[]>([]);

  const { user, updateUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, "listings");

      const q = query(listingsRef, where("userRef", "==", user.uid), orderBy("timestamp", "desc"));

      const querySnap = await getDocs(q);

      let listings: any = [];

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
    <>
      <h3>Dine annoncer</h3>
      {!loading && listings?.length > 0 && (
        <ul className="listingsList">
          {listings.map((listing) => (
            <Listing
              key={listing.id}
              listing={listing.data}
              id={listing.id}
              onDelete={() => onDelete(listing.id)}
              onEdit={() => onEdit(listing.id)}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default Listings;
