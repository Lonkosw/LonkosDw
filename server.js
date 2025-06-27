const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Importa as rotas de autenticação corretamente
const authRoutes = require('./src/routes/authRoutes');
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Servidor está rodando 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
