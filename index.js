const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { args: ['--no-sandbox'] }
});

client.on('qr', qr => {
  console.log('=== SCAN QR DI RAILWAY TERMINAL ===');
  qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
  console.log('✅ Bot WA Badak siap jalan!');

  const groupId   = '1203630XXXXXXXX@g.us'; // Ganti: ID grup mu
  const numbers   = ['6281234567890','6282234567891']; // Tambah nomor di sini
  const delayMs   = 5000; // Delay 5 detik, untuk safety

  for (const num of numbers) {
    const jid = `${num}@c.us`;
    try {
      await client.groupAdd(groupId, [jid]);
      console.log(`✅ ↑ Ditambahkan: ${num}`);
    } catch (e) {
      console.log(`❌ Gagal: ${num} — ${e.message}`);
    }
    await new Promise(res => setTimeout(res, delayMs));
  }

  console.log('🎯 Semua nomor sudah diproses!');
});
