import { headers } from "next/headers";

export const getServerSideProps = async (id: string) => {
  try {
    const BaseURl = process.env.Url;

    const url = BaseURl
      ? BaseURl + "/api/users/" + id
      : "http://localhost:3000/api/users/" + id;

    const response = await fetch(url, {
      method: "GET",
      headers: headers(),
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const res = await response.json();
    return { res };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: error }; // Send error as a prop
  }
};
