import { setJesperAsAdmin } from "../functions/serverside/serverside-functions";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET() {
  const res = await setJesperAsAdmin();
  console.log("GET", res);

  return Response.json(res);
}
