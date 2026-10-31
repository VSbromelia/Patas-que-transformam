
const perguntas = [
    {
        pergunta: "1. Adotar um animal significa assumir uma responsabilidade por quanto tempo?",
        alternativas: [
            "Apenas enquanto eu tiver disponibilidade para cuidar dele.",
            "Durante toda a vida do animal, considerando suas necessidades em cada fase.",
            "Até que ele deixe de ser filhote."
        ],
        correta: 1,
        feedbackCorreto: "Muito bem! A adoção é um compromisso de longo prazo. O animal dependerá de cuidados, atenção e proteção durante toda a sua vida.",
        feedbackIncorreto: "Vamos aprender juntos! A adoção é um compromisso de longo prazo. O animal precisa de cuidados e proteção durante toda a sua vida."
    },
    {
        pergunta: "2. Se eu passar muitas horas fora de casa, o que devo considerar antes de adotar?",
        alternativas: [
            "Que o animal consegue ficar sozinho o dia inteiro sem problemas.",
            "Que posso deixá-lo sozinho sem precisar organizar uma rotina.",
            "Que preciso planejar uma rotina que garanta alimentação, atenção, higiene e companhia."
        ],
        correta: 2,
        feedbackCorreto: "Isso mesmo! Planejar a rotina é importante para garantir que o animal receba os cuidados e a atenção necessários.",
        feedbackIncorreto: "É importante pensar na rotina antes da adoção. O animal precisa de alimentação, atenção, higiene e companhia."
    },
    {
        pergunta: "3. Quais despesas devo considerar ao adotar um animal?",
        alternativas: [
            "Apenas a alimentação.",
            "Alimentação, vacinação, consultas veterinárias, higiene e possíveis emergências.",
            "Somente os gastos do momento da adoção."
        ],
        correta: 1,
        feedbackCorreto: "Muito bem! Planejar os gastos ajuda a garantir que o animal receba todos os cuidados necessários.",
        feedbackIncorreto: "A alimentação é importante, mas existem outros gastos, como vacinas, consultas veterinárias, higiene e emergências."
    },
    {
        pergunta: "4. Ao adotar um animal, como devo agir em relação à vacinação e à saúde dele?",
        alternativas: [
            "Procurar acompanhamento veterinário e manter a vacinação e os cuidados preventivos em dia.",
            "Levar ao veterinário somente quando apresentar um problema grave.",
            "Evitar consultas veterinárias para economizar."
        ],
        correta: 0,
        feedbackCorreto: "Excelente! O acompanhamento veterinário ajuda a prevenir doenças e manter a saúde do animal.",
        feedbackIncorreto: "A prevenção é muito importante! Consultas veterinárias e vacinação ajudam a proteger a saúde do animal."
    },
    {
        pergunta: "5. Se o animal apresentar dificuldades de adaptação ao novo lar, o que devo fazer?",
        alternativas: [
            "Devolvê-lo imediatamente.",
            "Ignorar o comportamento até que ele mude sozinho.",
            "Ter paciência, respeitar seu tempo e buscar orientação quando necessário."
        ],
        correta: 2,
        feedbackCorreto: "Isso mesmo! Cada animal tem seu próprio tempo de adaptação e precisa de acolhimento, segurança e paciência.",
        feedbackIncorreto: "A adaptação pode levar algum tempo. É importante oferecer acolhimento, segurança e respeitar o ritmo do animal."
    },
    {
        pergunta: "6. Se minha rotina mudar e eu tiver dificuldades para cuidar do animal, qual deve ser minha atitude?",
        alternativas: [
            "Abandoná-lo em um local onde possa encontrar outra família.",
            "Buscar alternativas responsáveis, como apoio de pessoas próximas ou orientação de uma organização de proteção animal.",
            "Deixá-lo sem os cuidados necessários."
        ],
        correta: 1,
        feedbackCorreto: "Muito bem! Buscar apoio e alternativas responsáveis é a melhor maneira de proteger o animal.",
        feedbackIncorreto: "Mudanças podem acontecer, mas o abandono nunca é uma solução. É importante buscar alternativas responsáveis."
    }
];

// Variáveis de controle
let perguntaAtual = 0;
let pontuacao = 0;
let respostas = [];

// Elementos da página
const perguntaContainer = document.getElementById("pergunta-container");
const feedbackContainer = document.getElementById("feedback-container");
const resultadoContainer = document.getElementById("resultado-container");

// Atualiza a barra de progresso
function atualizarProgresso() {
    const barra = document.getElementById("barra-progresso");
    const textoProgresso = document.getElementById("progresso-texto");

    const progresso = (perguntaAtual / perguntas.length) * 100;

    barra.style.cssText = `
        display: block;
        width: ${progresso}%;
        height: 20px;
        background-color: green;
        transition: width 0.3s ease;
    `;

    textoProgresso.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
}

// Exibe uma pergunta por vez
function mostrarPergunta() {
    feedbackContainer.innerHTML = "";
    resultadoContainer.innerHTML = "";

    const pergunta = perguntas[perguntaAtual];

    atualizarProgresso();

    perguntaContainer.innerHTML = `
        <h2>${pergunta.pergunta}</h2>

        <div class="alternativas">
            ${pergunta.alternativas.map((alternativa, indice) => `
                <button type="button" onclick="selecionarResposta(${indice})">
                    ${alternativa}
                </button>
            `).join("")}
        </div>
    `;
}

// Verifica a resposta escolhida
function selecionarResposta(indice) {
    const pergunta = perguntas[perguntaAtual];
    const acertou = indice === pergunta.correta;

    respostas.push({
        pergunta: pergunta.pergunta,
        respostaEscolhida: pergunta.alternativas[indice],
        acertou: acertou
    });

    if (acertou) {
        pontuacao++;

        feedbackContainer.innerHTML = `
            <p>${pergunta.feedbackCorreto}</p>
        `;
    } else {
        feedbackContainer.innerHTML = `
            <p>${pergunta.feedbackIncorreto}</p>
        `;
    }

    perguntaContainer.querySelectorAll("button").forEach(botao => {
        botao.disabled = true;
    });

    feedbackContainer.innerHTML += `
        <button type="button" onclick="proximaPergunta()">
            ${perguntaAtual === perguntas.length - 1
                ? "Ver resultado"
                : "Próxima pergunta"}
        </button>
    `;
}

// Avança para a próxima pergunta
function proximaPergunta() {
    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        atualizarProgresso();
        mostrarResultado();
    }
}

// Envia o resultado para o Flask
async function enviarResultado() {

    const dadosQuestionario = {
        pontuacao: pontuacao,
        totalPerguntas: perguntas.length,
        percentualAcertos: (pontuacao / perguntas.length) * 100,
        respostas: respostas
    };

    const mensagemEnvio = document.createElement("p");

    mensagemEnvio.textContent = "Enviando suas respostas...";

    resultadoContainer.appendChild(mensagemEnvio);

    try {
        const resposta = await fetch(
            "http://127.0.0.1:5000/api/questionario",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosQuestionario)
            }
        );

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(resultado.mensagem);
        }

        mensagemEnvio.textContent =
            "Suas respostas foram enviadas ao backend com sucesso!";

    } catch (erro) {

        console.error("Erro ao enviar respostas:", erro);

        mensagemEnvio.textContent =
            "Não foi possível enviar suas respostas. Verifique se o backend está funcionando.";
    }
}

// Apresenta o resultado final
function mostrarResultado() {
    perguntaContainer.innerHTML = "";
    feedbackContainer.innerHTML = "";

    let mensagem = "";

    if (pontuacao >= 5) {
        mensagem = "Você demonstra uma boa compreensão sobre a adoção responsável! Continue aprendendo e compartilhando esses conhecimentos.";
    } else if (pontuacao >= 3) {
        mensagem = "Você já conhece pontos importantes sobre a adoção responsável! Aproveite para aprofundar alguns cuidados.";
    } else {
        mensagem = "Este é um ótimo começo para aprender mais! Conhecer as responsabilidades da adoção é um passo importante para transformar vidas.";
    }

    document.getElementById("progresso-texto").textContent =
        "Questionário concluído!";

    resultadoContainer.innerHTML = `
        <h2>Seu resultado!</h2>
        <p>Você acertou ${pontuacao} de ${perguntas.length} perguntas.</p>
        <p>${mensagem}</p>

        <button type="button" onclick="reiniciarQuestionario()">
            Refazer questionário
        </button>
    `;

    // Envia as respostas ao backend
    enviarResultado();
}

// Reinicia o questionário
function reiniciarQuestionario() {
    perguntaAtual = 0;
    pontuacao = 0;
    respostas = [];

    mostrarPergunta();
}

// Inicia o questionário
mostrarPergunta();
