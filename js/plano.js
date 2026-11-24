// Seleciona os itens do checklist
const itensPlano = document.querySelectorAll(".item-plano");

// Seleciona os elementos da barra
const barraPlano = document.getElementById("barra-plano");
const textoPorcentagem = document.getElementById("texto-porcentagem");
const textoItens = document.getElementById("texto-itens");

// Seleciona a mensagem e o botao
const mensagemPlano = document.getElementById("mensagem-plano");
const botaoConcluir = document.getElementById("botao-concluir-plano");

// Total de tarefas
const totalItens = itensPlano.length;

// Atualiza o progresso
function atualizarProgresso() {

    let concluidos = 0;

    itensPlano.forEach(function(item) {

        if (item.checked) {
            concluidos++;
        }

    });

    const porcentagem = (concluidos / totalItens) * 100;

    barraPlano.style.width = porcentagem + "%";

    textoPorcentagem.textContent =
        Math.round(porcentagem) + "% Concluído";

    textoItens.textContent =
        concluidos + "/" + totalItens;

}

// Atualiza quando marcar ou desmarcar
itensPlano.forEach(function(item) {

    item.addEventListener("change", atualizarProgresso);

});

// Botao concluir plano
botaoConcluir.addEventListener("click", function() {

    const concluidos = document.querySelectorAll(
        ".item-plano:checked"
    ).length;

    if (concluidos === totalItens) {

        mensagemPlano.textContent =
            "Parabéns! Você concluiu todos os preparativos para receber seu novo companheiro! 🐾";

    } else {

        mensagemPlano.textContent =
            "Você concluiu " + concluidos + " de " + totalItens +
            " tarefas. Continue preparando seu lar!";

    }

});

// Inicializa a barra
atualizarProgresso();
