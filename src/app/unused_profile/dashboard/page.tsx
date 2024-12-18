"use client";
import Link from "next/link";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../../context/AuthContext";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Listings from "../components/listings";

const Dashboard = () => {
  const { user, logOut } = useAuth();
  const router = useRouter();

  return (
    <main>
      <h2>You are logged in!</h2>
      <button
        onClick={() => {
          logOut();
          router.push("/");
        }}
        className="button"
      >
        Log ud
      </button>

      <hr />

      <Link href={"/admin/profile"}>Profil</Link>
      <hr />
      <Listings />
      <hr />
      <div></div>
    </main>
  );
};

export default Dashboard;
