// services/llmService.js
import axios from "axios";

// Replace with your actual public ngrok endpoint
const LOCAL_API_URL = "https://0b10-34-83-189-202.ngrok-free.app/generate";

export async function analyzeDdosAttack(ip, trafficVolume, anomalies, setLoading) {
  try {
    setLoading(true); // Start loading
    const res = await axios.post(LOCAL_API_URL, {
      ip,
      traffic: trafficVolume,
      anomaly: anomalies,
    });
    return res.data.response || "⚠️ Model did not return a response.";
  } catch (err) {
    console.error("❌ Colab API Error:", err);
    return "⚠️ Could not connect to model backend.";
  } finally {
    setLoading(false); // Stop loading
  }
}