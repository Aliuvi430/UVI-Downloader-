
async function handleDownload() {
  const urlInput = document.getElementById('urlInput'); // اپنے Input Box کی ID
  const statusMsg = document.getElementById('statusMessage'); // Status Text کی ID
  const downloadBtn = document.getElementById('downloadBtn');

  const videoUrl = urlInput.value.trim();

  if (!videoUrl) {
    statusMsg.innerText = "براہ کرم لنک درج کریں!";
    return;
  }

  downloadBtn.disabled = true;
  statusMsg.innerText = "لنک کی جانچ کی جا رہی ہے...";

  try {
    // api/check.js کو ریکوئسٹ بھیجیں
    const response = await fetch('/api/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ videoUrl }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'ایرر پیش آیا');
    }

    statusMsg.innerText = "ڈاؤن لوڈ شروع ہو رہا ہے...";

    // براؤزر میں فائل کا ڈاؤن لوڈ شروع کرنے کے لیے عارضی لنک بنائیں
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = data.downloadUrl;
    downloadAnchor.target = '_blank';
    downloadAnchor.download = `${data.title || 'video'}.mp4`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);

  } catch (error) {
    statusMsg.innerText = `خرابی: ${error.message}`;
  } finally {
    downloadBtn.disabled = false;
  }
                                 }
