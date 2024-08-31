/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
    ],
  },
  env: {
    customKey: "my-value",
    PAYPAL_ID:
      "Aa27r4laM_ZpsZ2VRxsHX2Si2_SBew2l1KGMfSjs_WQQxzAGMsD_fuwtG9FrO3xYHYpq7fKYBI_73uLh",
    PAYPAL_KEY:
      "EA3hlryDoo3avZoeTzzmoRm3XfBzfpoYBRTmvCgBS8VUP2VZ0jqLxRnhx8-7wRzPdNRwhHZQkhSd9xR5",
  },
};

export default nextConfig;
