let todasAsPerguntas = [];
let perguntasDoQuiz = [];
let perguntaAtualIndex = 0;
let acertos = 0;
let respostasUsuario = [];
let respondeuAtual = false;

// Recupera o nome do jogador (ou define "Anônimo" caso acesse direto)
const nomeJogador = localStorage.getItem('techquiz_jogador_atual') || 'Anônimo';

const playerDisplay = document.getElementById('player-display');
const contadorElement = document.getElementById('contador');
const enunciadoElement = document.getElementById('enunciado');
const alternativasElement = document.getElementById('alternativas');
const feedbackBox = document.getElementById('feedback-box');
const btnProxima = document.getElementById('btn-proxima');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const scoreSummary = document.getElementById('score-summary');
const rankingBody = document.getElementById('ranking-body');
const reviewList = document.getElementById('review-list');
const btnReplay = document.getElementById('btn-replay');

playerDisplay.textContent = `Jogador: ${nomeJogador}`;

function embaralharArray(array) {
  let arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

async function carregarBancoDeDados() {
  try {
    const resposta = await fetch('perguntas.json');
    if (!resposta.ok) throw new Error('Falha ao buscar JSON');
    todasAsPerguntas = await resposta.json();
    iniciarPartida();
  } catch (erro) {
    console.error('Erro ao carregar perguntas:', erro);
    enunciadoElement.textContent = 'Erro ao carregar o banco de dados. Verifique se o arquivo perguntas.json está na mesma pasta.';
  }
}

function iniciarPartida() {
  perguntaAtualIndex = 0;
  acertos = 0;
  respostasUsuario = [];
  
  const perguntasEmbaralhadas = embaralharArray(todasAsPerguntas);
  perguntasDoQuiz = perguntasEmbaralhadas.slice(0, 10);

  resultScreen.style.display = 'none';
  gameScreen.style.display = 'block';

  exibirPergunta();
}

function exibirPergunta() {
  respondeuAtual = false;
  btnProxima.disabled = true;
  feedbackBox.style.display = 'none';
  feedbackBox.className = 'feedback-box';

  const q = perguntasDoQuiz[perguntaAtualIndex];
  contadorElement.textContent = `Pergunta ${perguntaAtualIndex + 1} de ${perguntasDoQuiz.length}`;
  enunciadoElement.textContent = q.pergunta;

  alternativasElement.innerHTML = '';
  const alternativasEmbaralhadas = embaralharArray(q.alternativas);

  alternativasEmbaralhadas.forEach((alt) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = alt;
    btn.onclick = () => verificarResposta(btn, alt, q);
    alternativasElement.appendChild(btn);
  });
}

function verificarResposta(btnSelecionado, opcaoEscolhida, questao) {
  if (respondeuAtual) return; // Impede múltiplos cliques na mesma questão
  respondeuAtual = true;

  const todosBotoes = alternativasElement.querySelectorAll('.option-btn');
  const acertou = opcaoEscolhida === questao.resposta_correta;

  todosBotoes.forEach((btn) => {
    btn.disabled = true; // Trava opções após resposta
    if (btn.textContent === questao.resposta_correta) {
      btn.classList.add('correct');
    } else if (btn === btnSelecionado && !acertou) {
      btn.classList.add('wrong');
    }
  });

  if (acertou) {
    acertos++;
    feedbackBox.classList.add('feedback-success');
    feedbackBox.innerHTML = `<strong>✅ Correto!</strong> ${questao.explicacao}`;
  } else {
    feedbackBox.classList.add('feedback-error');
    feedbackBox.innerHTML = `<strong>❌ Incorreto!</strong> A resposta certa é: <em>${questao.resposta_correta}</em>.<br>${questao.explicacao}`;
  }

  feedbackBox.style.display = 'block';

  respostasUsuario.push({
    pergunta: questao.pergunta,
    respostaUsuario: opcaoEscolhida,
    respostaCorreta: questao.resposta_correta,
    acertou: acertou,
    explicacao: questao.explicacao,
    fonte: questao.fonte
  });

  btnProxima.disabled = false;
  btnProxima.focus(); // Facilita navegação por teclado (basta apertar Enter)
}

btnProxima.onclick = () => {
  perguntaAtualIndex++;
  if (perguntaAtualIndex < perguntasDoQuiz.length) {
    exibirPergunta();
  } else {
    finalizarQuiz();
  }
};

function finalizarQuiz() {
  gameScreen.style.display = 'none';
  resultScreen.style.display = 'block';

  scoreSummary.textContent = `${nomeJogador}, você acertou ${acertos} de ${perguntasDoQuiz.length} perguntas!`;

  salvarNoRanking(nomeJogador, acertos);
  renderizarRanking();
  renderizarRevisao();
}

function salvarNoRanking(nome, pontuacao) {
  const rankingAtual = JSON.parse(localStorage.getItem('techquiz_ranking')) || [];
  rankingAtual.push({
    nome: nome,
    acertos: pontuacao,
    data: new Date().toLocaleDateString('pt-BR')
  });

  // Ordena do maior para o menor número de acertos
  rankingAtual.sort((a, b) => b.acertos - a.acertos);

  // Mantém o Top 10
  const top10 = rankingAtual.slice(0, 10);
  localStorage.setItem('techquiz_ranking', JSON.stringify(top10));
}

function renderizarRanking() {
  const ranking = JSON.parse(localStorage.getItem('techquiz_ranking')) || [];
  rankingBody.innerHTML = '';

  ranking.forEach((item, index) => {
    const tr = document.createElement('tr');
    if (item.nome === nomeJogador && item.acertos === acertos) {
      tr.classList.add('highlight-row');
    }
    tr.innerHTML = `
      <td>${index + 1}º</td>
      <td>${item.nome}</td>
      <td><strong>${item.acertos}/10</strong></td>
    `;
    rankingBody.appendChild(tr);
  });
}

function renderizarRevisao() {
  reviewList.innerHTML = '';
  respostasUsuario.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = `review-card ${item.acertou ? 'correct-card' : 'wrong-card'}`;
    
    div.innerHTML = `
      <h4>${idx + 1}. ${item.pergunta}</h4>
      <p><strong>Sua resposta:</strong> <span class="${item.acertou ? 'text-success' : 'text-danger'}">${item.respostaUsuario}</span></p>
      ${!item.acertou ? `<p><strong>Resposta correta:</strong> ${item.respostaCorreta}</p>` : ''}
      <p class="explanation"><strong>Explicação:</strong> ${item.explicacao}</p>
      ${item.fonte ? `<p><a href="${item.fonte}" target="_blank" rel="noopener noreferrer">Saiba mais (Fonte)</a></p>` : ''}
    `;
    reviewList.appendChild(div);
  });
}

// Replay imediato
btnReplay.onclick = () => {
  iniciarPartida();
};

carregarBancoDeDados();