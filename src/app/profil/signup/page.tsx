"use client";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SignupPage() {
  const [data, setData] = useState({
    email: "",
    displayName: "",
    password: "",
  });

  // Use the signUp method from the AuthContext
  const { signUp } = useAuth();
  const router = useRouter();

  const handleRegistration = async (e: any) => {
    e.preventDefault();
    try {
      await signUp(data.email, data.password, data.displayName);
      router.push("/profil");
    } catch (error: any) {
      console.log(error.message);
    }
    console.log(data);
  };

  // Destructure data from the data object
  const { ...allData } = data;

  // Disable submit button until all fields are filled in
  const canSubmit = [...Object.values(allData)].every(Boolean);

  return (
    <main className="login">
      <h1>Opret konto</h1>
      <form action="" onSubmit={handleRegistration}>
        <div className="field">
          <label className="label">Dit navn</label>
          <div className="control">
            <input
              type="text"
              name="displayName"
              id="displayName"
              className="input"
              required
              onChange={(e: any) => {
                setData({
                  ...data,
                  displayName: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Din e-mail</label>
          <div className="control">
            <input
              type="email"
              name="email"
              id="email"
              className="input"
              autoComplete="off"
              required
              pattern="[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              onChange={(e: any) => {
                setData({
                  ...data,
                  email: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Dit kodeord</label>
          <div className="control">
            <input
              type="password"
              name="password"
              id="password"
              className="input"
              pattern=".{8,}"
              required
              onChange={(e: any) => {
                setData({
                  ...data,
                  password: e.target.value,
                });
              }}
            />
          </div>
        </div>

        <button type="submit" disabled={!canSubmit} className="button">
          Opret konto
        </button>
        <div className="">
          <Link href="/profil/">Log ind</Link>
        </div>
      </form>
    </main>
  );
}

export default SignupPage;
