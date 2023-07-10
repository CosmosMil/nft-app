const serverURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001"
    : "https://nft-app-server.vercel.app";

export { serverURL };