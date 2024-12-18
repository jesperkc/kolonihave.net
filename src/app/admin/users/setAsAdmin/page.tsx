"use server";

import { setJesperAsAdmin } from "../../../functions/serverside/serverside-functions";


async function ProfileIndex() {
  const outcome = await setJesperAsAdmin();

  return <main className="forums"></main>;
}

export default ProfileIndex;
