"use client";
import { useState } from "react";
import { saveAiUser } from "../../../../components/clientside-data";
import { TUser } from "../../../types/user.types";
import { useAuth } from "../../context/AuthContext";

function EditProfileComponent({ user }: { user: TUser }) {
  const { updateUser } = useAuth();

  const [data, setData] = useState(user);
  console.log("EditProfileComponent", user);
  const { id, displayName } = data;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit");
    const savedValues = await updateUser({ displayName });
    console.log("handleSubmit done", savedValues);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Navn</label>
        <div className="control">
          <input
            className="input"
            name="displayName"
            value={displayName}
            onChange={(e: any) => {
              setData({
                ...data,
                displayName: e.target.value,
              });
            }}
          />
        </div>
      </div>

      <br />
      <br />
      <button className="button">Gem</button>
    </form>
  );
}

export default EditProfileComponent;
