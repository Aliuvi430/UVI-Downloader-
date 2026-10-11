module.exports = (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Please use POST method."
    });
  }

  const { url } = req.body || {};

  if (!url) {
    return res.status(400).json({
      error: "Please enter a URL."
    });
  }

  try {
    const parsed = new URL(url);

    if (!["http:", "https:"].includes(parsed.protocol)) {
      return res.status(400).json({
        error: "Only HTTP/HTTPS links are allowed."
      });
    }

    const host = parsed.hostname.toLowerCase();

    let platform = "Direct Media / Other Website";

    if (
      host === "youtube.com" ||
      host.endsWith(".youtube.com") ||
      host === "youtu.be"
    ) {
      platform = "YouTube";
    } else if (
      host === "tiktok.com" ||
      host.endsWith(".tiktok.com")
    ) {
      platform = "TikTok";
    } else if (
      host === "facebook.com" ||
      host.endsWith(".facebook.com") ||
      host === "fb.watch"
    ) {
      platform = "Facebook";
    }

    return res.status(200).json({
      ok: true,
      platform: platform,
      message:
        platform +
        " link detected. Only authorized downloads are supported."
    });

  } catch (error) {
    return res.status(400).json({
      error: "Please enter a valid URL."
    });
  }
};
