const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason
} = require("@whiskeysockets/baileys");

const pino = require("pino");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function iniciarBot() {
  const { state, saveCreds } = await useMultiFileAuthState("auth_info");

  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: "silent" }),
    printQRInTerminal: false
  });

  sock.ev.on("creds.update", saveCreds);

  if (!state.creds.registered) {
    const numero = "5544988041262";

    setTimeout(async () => {
      try {
        const codigo = await sock.requestPairingCode(numero);
        console.log("=================================");
        console.log("CÓDIGO DE VINCULAÇÃO DO BGK BOT:");
        console.log(codigo);
        console.log("=================================");
      } catch (erro) {
        console.log("Erro ao gerar código:", erro);
      }
    }, 3000);
  }

  sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
    if (connection === "open") {
      console.log("✅ BGK BOT CONECTADO AO WHATSAPP!");
    }

    if (connection === "close") {
      const deveReconectar =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

      if (deveReconectar) {
        console.log("🔄 Reconectando...");
        iniciarBot();
      } else {
        console.log("❌ WhatsApp desconectado.");
      }
    }
  });
}

iniciarBot();