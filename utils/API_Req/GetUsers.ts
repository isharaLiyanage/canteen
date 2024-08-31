import { Data } from "../types/Users";

export async function getServerSideProps() {
  try {
    const BaseURl = process.env.Url;

    const response = await fetch(
      `${BaseURl ? BaseURl + "/api/users" : "http://localhost:3000/api/users"}`,
      { method: "GET", cache: "no-store" }
    );
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const users = await response.json();
    return { users };
  } catch (error) {

    return { error: error }; // Send error as a prop
  }
}
