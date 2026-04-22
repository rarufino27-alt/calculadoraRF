/* ============================================================
   Preço Certo — Lógica de cálculo
   Fórmulas:
     valorHora           = rendaMensal / horasMes
     custoTempo          = tempo * valorHora
     precoIdeal          = custo + custoTempo
     diferenca           = precoAtual - precoIdeal
     percentual          = (diferenca / precoIdeal) * 100
     servicosNecessarios = rendaMensal / (precoAtual - custo)
   ============================================================ */

(() => {
  "use strict";

  // Formatador BRL
  const brl = (n) =>
    n.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  // Elementos
  const form = document.getElementById("form");
  const erroEl = document.getElementById("erro");
  const resultado = document.getElementById("resultado");
  const valorHoraEl = document.getElementById("valor-hora");
  const precoIdealEl = document.getElementById("preco-ideal");
  const composicaoEl = document.getElementById("composicao");
  const comparacaoEl = document.getElementById("comparacao");
  const statusIconEl = document.getElementById("status-icon");
  const statusTituloEl = document.getElementById("status-titulo");
  const diferencaEl = document.getElementById("diferenca");
  const percentualEl = document.getElementById("percentual");
  const recomendacaoEl = document.getElementById("recomendacao");
  const servicosMsg = document.getElementById("servicos-msg");
  const servicosNumEl = document.getElementById("servicos-num");

  function mostrarErro(msg) {
    erroEl.textContent = msg;
    erroEl.hidden = false;
  }

  function limparErro() {
    erroEl.hidden = true;
    erroEl.textContent = "";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    limparErro();

    // Captura valores
    const custo = parseFloat(document.getElementById("custo").value);
    const tempo = parseFloat(document.getElementById("tempo").value);
    const renda = parseFloat(document.getElementById("renda").value);
    const horasMes = parseFloat(document.getElementById("horas-mes").value) || 160;
    const precoAtualRaw = document.getElementById("preco-atual").value.trim();
    const precoAtual = precoAtualRaw === "" ? null : parseFloat(precoAtualRaw);

    // Validação
    if (isNaN(custo) || isNaN(tempo) || isNaN(renda)) {
      mostrarErro("Preencha todos os campos obrigatórios com valores válidos.");
      resultado.hidden = true;
      return;
    }
    if (horasMes <= 0) {
      mostrarErro("Horas trabalhadas no mês deve ser maior que zero.");
      resultado.hidden = true;
      return;
    }

    // Cálculos principais
    const valorHora = renda / horasMes;
    const custoTempo = tempo * valorHora;
    const precoIdeal = custo + custoTempo;

    // Renderiza topo / destaque
    valorHoraEl.textContent = brl(valorHora);
    precoIdealEl.textContent = brl(precoIdeal);
    composicaoEl.textContent =
      "Custo " + brl(custo) + " + Tempo " + brl(custoTempo);
    recomendacaoEl.textContent = brl(precoIdeal);

    // Comparação se há preço atual
    if (precoAtual !== null && !isNaN(precoAtual)) {
      const diferenca = precoAtual - precoIdeal;
      const percentual = precoIdeal > 0 ? (diferenca / precoIdeal) * 100 : 0;
      const ganhosPorServico = precoAtual - custo;
      const servicosNecessarios =
        ganhosPorServico > 0 ? renda / ganhosPorServico : null;

      const lucro = diferenca >= 0;
      comparacaoEl.classList.toggle("lucro", lucro);
      comparacaoEl.classList.toggle("prejuizo", !lucro);
      statusIconEl.textContent = lucro ? "↗" : "↘";
      statusTituloEl.textContent = lucro
        ? "Seu preço está saudável"
        : "Você está cobrando abaixo do ideal";

      diferencaEl.textContent = brl(diferenca);
      percentualEl.textContent = percentual.toFixed(2) + "%";
      comparacaoEl.hidden = false;

      if (servicosNecessarios !== null && isFinite(servicosNecessarios)) {
        servicosNumEl.textContent = Math.ceil(servicosNecessarios);
        servicosMsg.hidden = false;
      } else {
        servicosMsg.hidden = true;
      }
    } else {
      comparacaoEl.hidden = true;
      servicosMsg.hidden = true;
    }

    // Mostra resultado e rola até ele
    resultado.hidden = false;
    // Reinicia animação
    resultado.style.animation = "none";
    void resultado.offsetWidth;
    resultado.style.animation = "";
    resultado.scrollIntoView({ behavior: "smooth", block: "start" });
  });
})();
