const menu = require("./commands/menu");

const http = require("http");

http.createServer((req, res) => {
  res.writeHead(200);
  res.end("BGK BOT ONLINE");
}).listen(process.env.PORT || 3000);

const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason
} = require("@whiskeysockets/baileys");

const pino = require("pino");

async function iniciarBot() {
  const { state, saveCreds } = await useMultiFileAuthState("auth_info");

  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: "silent" }),
    printQRInTerminal: false
  });

  sock.ev.on("creds.update", saveCreds);
  
  sock.ev.on("messages.upsert", async ({ messages }) => {
  const msg = messages[0];

  if (!msg.message) return;

  const texto =
    msg.message.conversation ||
    msg.message.extendedTextMessage?.text ||
    "";

  if (texto.trim().toLowerCase() === "7menu") {
    await menu(sock, msg);
  }
});

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
        console.log("❌ Erro ao gerar código:", erro);
      }
    }, 3000);
  }

  sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
    if (connection === "open") {
      console.log("✅ BGK BOT CONECTADO AO WHATSAPP!");
    }

    if (connection === "close") {
      const codigoErro =
        lastDisconnect?.error?.output?.statusCode;

      const deveReconectar =
        codigoErro !== DisconnectReason.loggedOut;

      if (deveReconectar) {
        console.log("🔄 Conexão perdida. Reiniciando...");
        iniciarBot();
      } else {
        console.log("❌ Sessão encerrada. Será necessário vincular novamente.");
      }
    }
  });
}

iniciarBot();