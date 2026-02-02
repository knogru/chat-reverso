const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('Cliente conectado!');

  ws.on('message', function message(data) {
    const text = data.toString();
    console.log('Recebido:', text);

    const reversed = text.split('').reverse().join('');
    
    // Simula um delay de "digitação" de 1 segundo (opcional, mas legal para ver o loading)
    setTimeout(() => {
        ws.send(JSON.stringify({ 
            id: Date.now(), 
            text: reversed, 
            sender: 'bot' 
        }));
    }, 1000);
  });
});

console.log('Servidor WebSocket rodando na porta 8080...');

