const axios = require("axios");

module.exports = {
  name: "number-lookup",
  command: ".number",

  handler: async (sock, msg, args) => {
    if (args.length < 1) {
      await sock.sendMessage(msg.key.remoteJid, { text: "❌ Usage: .number <phone_number>" });
      return;
    }

    const phone = args[0];
    const API_KEY = process.env.NUMVERIFY_API_KEY; // keep key in env
    const BASE_URL = "https://api.apilayer.com/number_verification/validate";

    try {
      const res = await axios.get(`${BASE_URL}?number=${phone}`, {
        headers: { apikey: API_KEY }
      });

      const data = res.data;
      if (!data.valid) {
        await sock.sendMessage(msg.key.remoteJid, { text: ❌ ${phone} is not a valid number. });
        return;
      }

      const reply =
        📞 Number: ${phone}\n +
        ✅ Valid: ${data.valid}\n +
        🌍 Country: ${data.country_name || "Unknown"}\n +
        📡 Carrier: ${data.carrier || "Unknown"}\n +
        📱 Type: ${data.line_type || "Unknown"};

      await sock.sendMessage(msg.key.remoteJid, { text: reply });

    } catch (err) {
      await sock.sendMessage(msg.key.remoteJid, { text: ❌ API error: ${err.message} });
    }
  }
};
