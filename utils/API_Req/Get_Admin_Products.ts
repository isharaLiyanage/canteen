export const getServerSideProps = async () => {
    try {
      const BaseURl = process.env.Url;
  
      const url = BaseURl
        ? BaseURl + "/api/admin/products/"
        : "http://localhost:3000/api/admin/products";
  
      const response = await fetch(url, { method: "GET", cache: "no-store" });
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const res = await response.json();
      return { res };
    } catch (error) {

      return { error: error }; // Send error as a prop
    }
  };
  