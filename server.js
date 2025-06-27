const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para ler JSON
app.use(express.json());

// ⬇️ Importa as rotas de autenticação
const authRoutes = require('./src/routes/authRoutes');
app.use('/auth', authRoutes); // /auth/login vai funcionar aqui

// Rota de teste raiz
app.get('/', (req, res) => {
  res.send('Servidor está rodando 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
