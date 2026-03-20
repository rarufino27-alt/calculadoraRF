const express = require("express");
const cors = require("cors");
const { jsPDF } = require("jspdf");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// pasta pública
const pasta = path.join(__dirname, "public");
if (!fs.existsSync(pasta)) fs.mkdirSync(pasta);

app.use("/recibos", express.static(pasta));

// rota gerar PDF
app.post("/gerar-recibo", (req, res) => {

const {
origem,
parada,
destino,
total,
detalhes,
data,
hora
} = req.body;

const doc = new jsPDF();

doc.setFontSize(16);
doc.text("GRUPO DE VIAGENS RF", 20, 20);

doc.setFontSize(10);
doc.text("CNPJ: 58.615.336/0001-49", 20, 28);
doc.text("Cabo de Santo Agostinho - PE", 20, 34);

doc.setFontSize(12);
doc.text("RECIBO", 150, 20);

doc.line(20, 38, 190, 38);

let y = 50;

doc.text(`Origem: ${origem}`, 20, y);
y += 8;

if(parada){
doc.text(`Parada: ${parada}`, 20, y);
y += 8;
}

doc.text(`Destino: ${destino}`, 20, y);
y += 10;

doc.text(`Data: ${data}`, 20, y);
doc.text(`Hora: ${hora}`, 120, y);

y += 10;

doc.text("Detalhamento:", 20, y);
y += 8;

detalhes.split("\n").forEach(l => {
doc.text(l, 20, y);
y += 6;
});

y += 10;

doc.setFontSize(14);
doc.text(`TOTAL: R$ ${total}`, 20, y);

// salvar arquivo
const nome = `recibo_${Date.now()}.pdf`;
const caminho = path.join(pasta, nome);

doc.save(caminho);

// retornar link
const link = `https://SEU_BACKEND.onrender.com/recibos/${nome}`;

res.json({ link });

});

app.listen(3000, () => console.log("Servidor rodando"));
