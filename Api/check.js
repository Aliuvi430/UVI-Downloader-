module.exports = (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed. Please use POST."
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
        error: "Only HTTP/HTTPS URLs are allowed."
      });
    }

    return res.status(200).json({
      ok: true,
      message: "URL received successfully. Only authorized media URLs are supported."
    });
  } catch (error) {
    return res.status(400).json({
      error: "Please enter a valid URL."
    });
  }
};
