const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

io.on('connection', (socket) => {
    console.log('Usuário conectado');

    socket.on('chat message', (data) => {
        console.log('Mensagem recebida:', data);
        io.emit('chat message', { 
            nome: data.nome || 'Usuário', // Nome padrão se não for enviado
            mensagem: data.mensagem, 
            icone: data.icone
        });
    });

    socket.on('disconnect', () => console.log('Usuário desconectado'));
});

http.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} - Link http://localhost:${PORT}`);
});
