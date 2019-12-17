// Dynamically determining if we're in production or development 

const baseUrl = 
  process.env.NODE_ENV === "production"
  ? "https://the-rock-shop.now.sh"
  : 'http://localhost:3000';

export default baseUrl;