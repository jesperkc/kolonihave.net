import fetch from "node-fetch";
import { schedule } from "@netlify/functions";

// This is a sample build hook URL
const BUILD_HOOK = "https://api.netlify.com/build_hooks/659677f8c4277053c8e86bc9";

// Schedules the handler function to run at midnight every month, on the first day of the month
const handler = schedule("0 0 1 * -", async () => {
  await fetch(BUILD_HOOK, {
    method: "POST",
  }).then((response) => {
    console.log("Build hook response:", response);
  });

  return {
    statusCode: 200,
  };
});

export { handler };
