export async function getServerSideProps(id: string) {
  try {
    const BaseURl = process.env.Url;

    const url = BaseURl
      ? BaseURl + "/api/order/" + id
      : "http://localhost:3000/api/order/" + id;

    const response = await fetch(url, { method: "GET", cache: "no-store" });
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const orders = await response.json();
    return { orders };
  } catch (error) {

    return { error: error }; // Send error as a prop
  }
}
