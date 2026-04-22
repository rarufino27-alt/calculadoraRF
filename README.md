Preço Certo 💼
Aplicativo web profissional, de tela única, que calcula o preço ideal de serviços com precisão. Visual inspirado em fintechs modernas: claro, confiável e sem fricção.
> 100% HTML, CSS e JavaScript puro. Sem frameworks, sem dependências, pronto para deploy no GitHub Pages.
---
✨ Funcionalidades
Cálculo do valor por hora com base na renda mensal desejada
Cálculo do preço ideal combinando custo e tempo investido
Comparação entre o preço atual e o preço ideal (lucro × prejuízo)
Projeção mensal: quantos serviços são necessários para atingir a renda
Feedback automático sobre a saúde da sua precificação
Interface responsiva (mobile-first)
Validação de campos e tratamento para divisão por zero
---
🚀 Como usar
Abra o arquivo `index.html` em qualquer navegador moderno.
Preencha os campos:
Custo (R$) — gastos diretos para realizar o serviço
Tempo gasto (horas) — pode usar valores decimais (ex.: `2.5`)
Renda mensal desejada (R$) — quanto deseja faturar por mês
(Opcional) Ajuste Horas/mês (padrão: `160`) e informe seu Preço atual para comparar.
Clique em Calcular preço ideal.
---
🧮 Fórmulas utilizadas
```
valorHora           = rendaMensal / horasMes
custoTempo          = tempo * valorHora
precoIdeal          = custo + custoTempo

diferenca           = precoAtual - precoIdeal
percentual          = (diferenca / precoIdeal) * 100

ganhosPorServico    = precoAtual - custo
servicosNecessarios = rendaMensal / ganhosPorServico
```
Todos os valores monetários são exibidos com `toLocaleString("pt-BR")` em formato BRL com 2 casas decimais.
---
🎯 Objetivo
Ajudar autônomos, freelancers e prestadores de serviço a precificar de forma justa, evitando cobrar abaixo do que realmente vale o seu trabalho — com clareza, sem termos técnicos.
---
🎨 Design
Estilo: fintech / startup clean
Tipografia: Inter (Google Fonts)
Paleta:
Azul escuro `#0F172A`
Azul médio `#1E40AF`
Verde sucesso `#16A34A`
Vermelho erro `#DC2626`
Cinza claro `#F1F5F9`
---
📁 Estrutura
```
preco-certo/
├── index.html    # Estrutura semântica
├── style.css     # Tema fintech, responsivo
├── script.js     # Lógica e cálculos
└── README.md     # Este arquivo
```
---
🌐 Deploy no GitHub Pages
Crie um repositório no GitHub (ex.: `preco-certo`).
Suba os 4 arquivos para a branch `main`:
```bash
   git init
   git add .
   git commit -m "feat: Preço Certo"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/preco-certo.git
   git push -u origin main
   ```
No repositório, vá em Settings → Pages.
Em Source, selecione Deploy from a branch → branch `main` → pasta `/ (root)`.
Salve. Em alguns segundos seu site estará no ar em:
```
   https://SEU-USUARIO.github.io/preco-certo/
   ```
---
📜 Licença
MIT — use, modifique e distribua livremente.
