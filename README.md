# TechQuiz: Começo da Internet

## 🌐 Tema
O quiz aborda a evolução histórica da rede, desde os projetos militares pioneiros (ARPANET) até a consolidação da World Wide Web e a era moderna da internet.

## 👥 Integrantes e Papéis
* **Gabriel Campos Monzani** - Desenvolvimento da lógica JavaScript e Integração do JSON.
* **Alan Rosa da Silveira Neto** - Estruturação de Estilos (CSS) e Layout Responsivo.
* **Arthur Gomes de Jesus** - Elaboração e revisão das perguntas em `perguntas.json`.
* **Cauã Silva Godoy** - Testes de usabilidade e fluxo de telas.
* **Gabriel Gomes Ferreira** - Implementação da acessibilidade e navegação por teclado.
* **Matheus Bispo** - Documentação (README) e validação do deploy no GitHub Pages.

## 📌 Regras do Jogo
1. O quiz apresenta 10 perguntas geradas aleatoriamente a partir de um banco de dados robusto.
2. Cada pergunta possui 4 alternativas, sendo apenas uma correta.
3. O botão "Próxima" só é habilitado após o usuário selecionar uma alternativa.
4. Ao final, é exibido um resumo detalhado com acertos, erros, explicações e links de fontes oficiais.

## 🚀 Instruções de Execução
1. Clone o repositório ou baixe os arquivos compactados.
2. Certifique-se de que os arquivos `index.html`, `jogo.html`, `style.css`, `script.js` e `perguntas.json` estejam na mesma pasta.
3. Como o projeto utiliza `fetch` para ler o arquivo JSON, execute-o através de um servidor local (como a extensão **Live Server** do VS Code) para evitar bloqueios de CORS do navegador (`file://`).
4. Acesse a versão publicada online: [Link do seu site no GitHub Pages]

## ♿ Verificação de Acessibilidade
O grupo realizou os seguintes testes de acessibilidade na aplicação:
- **Contraste:** Utilização de paleta de cores escuras de alto contraste (--bg-color: #0f172a e text-color: #f8fafc) aprovadas para leitura prolongada.
- **Foco Visível:** Os botões de opções e navegação possuem estados de `:hover` e `.selected` bem demarcados visualmente.
- **Navegação por Teclado:** É possível navegar pelos elementos interativos utilizando a tecla `Tab` e selecionar opções por clique/espaço.
- **Atributos semânticos:** Uso adequado de tags HTML semânticas e textos alternativos onde aplicável.
