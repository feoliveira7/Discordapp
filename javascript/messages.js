const socket = io();
const mensagemInput = document.getElementById('mensagem');
const nomeInput = document.getElementById('nomeUsuario');
const messagesContainer = document.getElementById('messagesContainer');
const chatForm = document.querySelector('form'); // Acessando o formulário diretamente

// Define o ícone padrão (pode ser ajustado conforme a seleção do usuário)
var icone = 'assets/pfps/default.png';

function saveEdit(){
  document.getElementById('userEditContainer').style.display='none'
  document.getElementById('userName').innerHTML = document.getElementById('usernameID').value.trim();
  document.getElementById('displayName').innerHTML = document.getElementById('nomeUsuario').value.trim();
}

// Envia a mensagem ao servidor quando o formulário for enviado (Enter)
chatForm.addEventListener('submit', event => {
  event.preventDefault(); // Impede o envio do formulário padrão
  // const nome = document.getElementById('nome').value.trim(); // Obtém o nome do campo

  const mensagem = mensagemInput.value.trim();
  const nome = nomeInput.value.trim(); // Obtém o nome do campo
  if (mensagem && nome) {
    // Envia a mensagem para o servidor, junto com o ícone e nome
    socket.emit('chat message', { nome, mensagem, icone });
    mensagemInput.value = ''; // Limpa o campo de mensagem após envio
  }
});

// Escuta por novas mensagens do servidor
socket.on('chat message', dados => {
  console.log(dados); // Para depuração, veja o que está sendo recebido

  // Criação da estrutura HTML para a mensagem recebida
  const messageBoxDiv = document.createElement('div');
  messageBoxDiv.classList.add('messageBox');
  
  // Adiciona o ícone da pessoa que enviou a mensagem
  const img = document.createElement('img');
  img.src = dados.icone; // Usa o ícone que foi enviado do servidor
  img.alt = 'Foto de perfil';
  img.classList.add('userIcon');
  
  // Cria o conteúdo de texto da mensagem
  const textDiv = document.createElement('div');
  textDiv.classList.add('textBox');
  
  const nameContainer = document.createElement('div');
  nameContainer.classList.add('nameContainer');
  
  // Nome do usuário e horário
  const nomeSpan = document.createElement('span');
  nomeSpan.classList.add('usernameMsg');
  nomeSpan.textContent = dados.nome || 'Usuário';
  
  const timestampSpan = document.createElement('span');
  timestampSpan.classList.add('horarioMensagem');
  const dataHora = new Date();
  const hora = dataHora.getHours().toString().padStart(2, '0');
  const minuto = dataHora.getMinutes().toString().padStart(2, '0');
  timestampSpan.textContent = `Hoje às ${hora}:${minuto}`; // Hora e minuto da mensagem
  
  nameContainer.appendChild(nomeSpan);
  nameContainer.appendChild(timestampSpan);
  
  // Adiciona a mensagem de texto
  const mensagemSpan = document.createElement('span');
  mensagemSpan.textContent = dados.mensagem;
  mensagemSpan.classList.add('mensagemTexto');  // Adicionando a classe 'mensagemTexto'

  textDiv.appendChild(nameContainer);
  textDiv.appendChild(mensagemSpan);
  
  messageBoxDiv.appendChild(img);
  messageBoxDiv.appendChild(textDiv);
  
  // Adiciona a nova mensagem ao container
  messagesContainer.appendChild(messageBoxDiv);

  // Garante que a nova mensagem seja visível
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
});
