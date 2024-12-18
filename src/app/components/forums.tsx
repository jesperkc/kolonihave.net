import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateDoc, doc, collection, getDocs, query, where, orderBy, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import Listing from "../unused_profile/components/listing";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TForum } from "../../types/forum.types";
import { getForums } from "../../../components/clientside-data";
import { useForum } from "../context/ForumContext";

const Forums = () => {
  const { loading, forums } = useForum();

  return (
    <>
      {!loading && forums?.length > 0 && (
        <ul className="listingsList">
          {forums.map((listing) => (
            <li key={listing.id}>
              <Link href={`/forum/${listing.slug}/`}>{listing.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Forums;
