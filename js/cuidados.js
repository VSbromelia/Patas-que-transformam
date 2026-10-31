
// Seleciona todos os itens do checklist
const itensCuidados = document.querySelectorAll(".item-cuidado");

// Seleciona os elementos da página
const textoProgresso = document.getElementById("texto-progresso");
const barraProgresso = document.getElementById("barra-progresso-cuidados");
const mensagemCuidados = document.getElementById("mensagem-cuidados");
const botaoLimpar = document.getElementById("limpar-cuidados");

// Chave utilizada para salvar o checklist no navegador
const chaveArmazenamento = "checklistCuidados";

// Recupera as marcações salvas no navegador
function carregarCuidados() {

    const cuidadosSalvos = JSON.parse(
        localStorage.getItem(chaveArmazenamento)
    );

    if (Array.isArray(cuidadosSalvos)) {

        itensCuidados.forEach((item, indice) => {
            item.checked = cuidadosSalvos[indice] === true;
        });

    }
}

// Salva as marcações no navegador
function salvarCuidados() {

    const cuidados = [];

    itensCuidados.forEach(item => {
        cuidados.push(item.checked);
    });

    localStorage.setItem(
        chaveArmazenamento,
        JSON.stringify(cuidados)
    );
}

// Atualiza o progresso do checklist
function atualizarProgresso() {

    let concluidos = 0;

    itensCuidados.forEach(item => {
        if (item.checked) {
            concluidos++;
        }
    });

    const total = itensCuidados.length;
    const porcentagem = total > 0
        ? (concluidos / total) * 100
        : 0;

    textoProgresso.textContent =
        `${concluidos} de ${total} cuidados concluídos`;

    barraProgresso.style.cssText = `
        display: block;
        width: ${porcentagem}%;
        height: 20px;
        background-color: green;
        transition: width 0.3s ease;
    `;

    if (concluidos === total && total > 0) {
        mensagemCuidados.textContent =
            "Parabéns! Você considerou todos os pontos do checklist. Continue se informando sobre a adoção responsável!";
    } else {
        mensagemCuidados.textContent = "";
    }
}

// Identifica quando um item é marcado ou desmarcado
itensCuidados.forEach(item => {

    item.addEventListener("change", function() {

        salvarCuidados();
        atualizarProgresso();

    });

});

// Limpa todas as marcações
botaoLimpar.addEventListener("click", function() {

    itensCuidados.forEach(item => {
        item.checked = false;
    });

    salvarCuidados();
    atualizarProgresso();

});

// Inicializa o checklist
carregarCuidados();
atualizarProgresso();
