let API_URL = "";

if (window.location.hostname === "localhost") {
  // Local development
  API_URL = "http://localhost:5173";
} else {
  // Production (Render backend)
  API_URL = "https://food-resturdant-backend-1.onrender.com";
}

export default API_URL;
