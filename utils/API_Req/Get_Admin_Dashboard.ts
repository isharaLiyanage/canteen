export const Get_Admin_Dashboard = async () => {
  try {
    const BaseURl = process.env.Url;

    const url = BaseURl
      ? BaseURl + "/api/admin/dashboard/"
      : "http://localhost:3000/api/admin/dashboard";

    const response = await fetch(url, { method: "GET", cache: "no-store" });
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
