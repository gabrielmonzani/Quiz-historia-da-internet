# TechQuiz: Começo da Internet 🌐

Projeto de quiz interativo desenvolvido para o 2º semestre do curso superior de tecnologia em **Análise e Desenvolvimento de Sistemas**.

## 🎯 Tema
O quiz explora a história e a evolução da rede, abordando marcos fundamentais como os projetos militares pioneiros (ARPANET), a criação do TCP/IP, o nascimento da World Wide Web (WWW) por Tim Berners-Lee no CERN, a chegada da internet e dos portais ao Brasil, até os conceitos modernos de Web 2.0, Web 3.0 e segurança digital.

## 👥 Integrantes e Papéis
* **Gabriel Campos Monzani** - Desenvolvimento da lógica em JavaScript, integração assíncrona do JSON e fluxo de telas.
* **Alan Rosa da Silveira Neto** - Estruturação de estilos (CSS) e adaptação do layout responsivo.
* **Arthur Gomes de Jesus** - Elaboração, revisão e curadoria do banco de perguntas.
* **Cauã Silva Godoy** - Testes de usabilidade e validação do fluxo do usuário.
* **Gabriel Gomes Ferreira** - Implementação de acessibilidade, foco visível e navegação por teclado.
* **Matheus Bispo** - Documentação (README) e acompanhamento do deploy contínuo no GitHub Pages.

## 📌 Regras do Jogo
1. **Identificação:** Na tela inicial, o jogador insere seu nome para registrar sua pontuação no ranking.
2. **Dinâmica:** A cada partida, o sistema sorteia aleatoriamente **10 perguntas** a partir de um banco de dados robusto.
3. **Respostas e Feedback:** O usuário seleciona uma alternativa e recebe imediatamente um feedback visual indicando se acertou ou errou, acompanhado de uma explicação detalhada e link para fontes oficiais.
4. **Pontuação e Ranking:** Ao final das 10 questões, o sistema exibe a pontuação total e atualiza o **Ranking Geral** armazenado no navegador (`localStorage`), destacando a posição do jogador.
5. **Replay:** É possível reiniciar o quiz imediatamente ou trocar de jogador ao finalizar.

## 🚀 Tecnologias Utilizadas
* **HTML5** (Semântico e acessível)
* **CSS3** (Variáveis, Flexbox e CSS Grid para responsividade)
* **JavaScript (Vanilla ES6+)** (Manipulação de DOM, requisições Fetch e persistência local)

## 🛠️ Instruções de Execução Local
Caso deseje testar o projeto diretamente na sua máquina:
1. Clone este repositório ou faça o download dos arquivos compactados.
2. Certifique-se de que os arquivos `index.html`, `jogo.html`, `script.js`, `style.css` e `perguntas.json` estejam na mesma pasta.
3. Como o projeto utiliza requisições `fetch()` para carregar o arquivo JSON, **recomenda-se abrir a aplicação através de um servidor local** (como a extensão **Live Server** do VS Code) para evitar bloqueios de segurança do navegador (`CORS` / `file://`).

## 🔗 Link do Site Publicado
Acesse a versão online oficial hospedada no GitHub Pages:
👉 **[TechQuiz no GitHub Pages](https://gabrielmonzani.github.io/Quiz-historia-da-internet/)**

## ♿ Acessibilidade e Qualidade (Verificação do Grupo)
* **Contraste:** Utilização de uma paleta de cores escuras em alta definição para leitura confortável e sem fadiga visual.
* **Foco Visível:** Elementos interativos e botões contam com marcações de foco customizadas (`:focus-visible`) para suporte completo à navegação por teclado (`Tab`).
* **Responsividade:** Layout testado em diferentes resoluções (dispositivos móveis e desktops), garantindo ausência de barra de rolagem horizontal indesejada.
* **Qualidade de Conteúdo:** Questões revisadas gramaticalmente para garantir clareza e precisão histórica.
