"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import LoginForm from "../../components/LoginForm";

const ProfileForm = ({}) => {
  const { user, logOut } = useAuth();
  console.log("user", user);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({
    displayName: user.profile.displayName,
  });

  // Use the signIn method from the AuthContext
  const { updateUserProfile } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    // Disable submit button until all fields are filled in
    const canSubmit = [...Object.values(allData)].every(Boolean);
    if (!canSubmit) {
      setSaving(false);
      return false;
    }
    try {
      await updateUserProfile(data.displayName);
      // const getRedirect = searchParams?.get("redirect");
      router.push("/profil/");
      setSaving(false);
    } catch (error: any) {
      setSaving(false);
      console.log(error.message);
    }
  };

  // Destructure data from the data object
  const { ...allData } = data;

  return (
    <div>
      {user ? (
        <form action="" onSubmit={handleSubmit} className="group">
          <div className="field">
            <label className="label" htmlFor="displayName">
              Navn
            </label>
            <div className="control">
              <input
                type="text"
                name="displayName"
                id="displayName"
                className="input"
                value={data.displayName}
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

          <button className="button" type="submit" disabled={saving}>
            Opdater
          </button>
        </form>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default ProfileForm;
