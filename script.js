let todasAsPerguntas = [];
let perguntasDoQuiz = [];
let perguntaAtualIndex = 0;
let acertos = 0;
let respostasUsuario = [];

const contadorElement = document.getElementById('contador');
const enunciadoElement = document.getElementById('enunciado');
const alternativasElement = document.getElementById('alternativas');
const btnProxima = document.getElementById('btn-proxima');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const scoreSummary = document.getElementById('score-summary');
const reviewList = document.getElementById('review-list');

let opcaoSelecionada = null;

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
    todasAsPerguntas = await resposta.json();
    
    const perguntasEmbaralhadas = embaralharArray(todasAsPerguntas);
    perguntasDoQuiz = perguntasEmbaralhadas.slice(0, 10);

    exibirPergunta();
  } catch (erro) {
    console.error('Erro ao carregar perguntas:', erro);
    enunciadoElement.textContent = 'Erro ao carregar o banco de dados. Verifique se o arquivo perguntas.json está na mesma pasta.';
  }
}

function exibirPergunta() {
  opcaoSelecionada = null;
  btnProxima.disabled = true;
  btnProxima.style.opacity = '0.5';

  const q = perguntasDoQuiz[perguntaAtualIndex];
  contadorElement.textContent = `Pergunta ${perguntaAtualIndex + 1} de ${perguntasDoQuiz.length}`;
  enunciadoElement.textContent = q.pergunta;

  alternativasElement.innerHTML = '';
  const alternativasEmbaralhadas = embaralharArray(q.alternativas);

  alternativasEmbaralhadas.forEach((alt) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = alt;
    btn.onclick = () => selecionarOpcao(btn, alt);
    alternativasElement.appendChild(btn);
  });
}

function selecionarOpcao(btnElement, opcao) {
  const todosBotoes = alternativasElement.querySelectorAll('.option-btn');
  todosBotoes.forEach(b => b.classList.remove('selected'));

  btnElement.classList.add('selected');
  opcaoSelecionada = opcao;

  btnProxima.disabled = false;
  btnProxima.style.opacity = '1';
}

btnProxima.onclick = () => {
  if (opcaoSelecionada === null) return;

  const q = perguntasDoQuiz[perguntaAtualIndex];
  const acertou = opcaoSelecionada === q.resposta_correta;
  if (acertou) acertos++;

  respostasUsuario.push({
    pergunta: q.pergunta,
    respostaUsuario: opcaoSelecionada,
    respostaCorreta: q.resposta_correta,
    acertou: acertou,
    explicacao: q.explicacao,
    fonte: q.fonte
  });

  perguntaAtualIndex++;

  if (perguntaAtualIndex < perguntasDoQuiz.length) {
    exibirPergunta();
  } else {
    exibirResumoFinal();
  }
};

function exibirResumoFinal() {
  gameScreen.style.display = 'none';
  resultScreen.style.display = 'block';

  scoreSummary.textContent = `Você acertou ${acertos} de ${perguntasDoQuiz.length} perguntas!`;

  reviewList.innerHTML = '';
  respostasUsuario.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = `review-card ${item.acertou ? 'correct-card' : 'wrong-card'}`;
    
    div.innerHTML = `
      <h3>${idx + 1}. ${item.pergunta}</h3>
      <p><strong>Sua resposta:</strong> <span class="${item.acertou ? 'text-success' : 'text-danger'}">${item.respostaUsuario}</span></p>
      ${!item.acertou ? `<p><strong>Resposta correta:</strong> ${item.respostaCorreta}</p>` : ''}
      <p class="explanation"><strong>Explicação:</strong> ${item.explicacao}</p>
      ${item.fonte ? `<p><a href="${item.fonte}" target="_blank" rel="noopener noreferrer">Saiba mais (Fonte)</a></p>` : ''}
    `;
    reviewList.appendChild(div);
  });
}

carregarBancoDeDados();