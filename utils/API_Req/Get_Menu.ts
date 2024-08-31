export const GetData = async () => {
  const BaseUrl = process.env.BaseUrl;
  const Fetch = await fetch(
    `${BaseUrl ? BaseUrl : "http://localhost:3000"}/api/product/menu`,
    {
      method: "Get",
      cache: "default",
    }
  );
  const data = await Fetch.json();

  return data;
};
