// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const initializeApp = require("firebase/app");
const getAnalytics = require("firebase/analytics");

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain.firebaseapp.com",
  projectId: "your-projectId",
  storageBucket: "your-storage-bucket.firebasestorage.app",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  measurementId: "your-analytics-tag"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

app.use(cors());
app.use(bodyParser.json());

const TELEGRAM_BOT_TOKEN = "BOT-TOKEN"; // Substitua pelo token do seu bot
const TELEGRAM_CHAT_ID = "CHAT-TOKEN"; // Substitua pelo ID do chat (ou grupo) para onde quer enviar

app.post("/send-location", async (req, res) => {
  const { latitude, longitude } = req.body;

  const message = `A localização do usuário é:\nLatitude: ${latitude}\nLongitude: ${longitude}`;

  try {
    // Envia a localização para o Telegram
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Erro ao enviar a localização para o Telegram." });
  }
});

app.listen(8088, () => {
  console.log("Servidor rodando na porta 8088");
});
