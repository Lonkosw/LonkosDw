// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Caminho do arquivo JSON com usuários
const usersPath = path.join(__dirname, '..', 'data', 'users.json');

// Função auxiliar para carregar usuários
function getUsers() {
  if (fs.existsSync(usersPath)) {
    const data = fs.readFileSync(usersPath, 'utf-8');
    return JSON.parse(data);
  }
  return [];
}

// Login
router.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const users = getUsers();

  const user = users.find(u => u.email === email && u.senha === senha);

  if (user) {
    // Simulação de token simples
    const token = `${user.tipo}-${user.id}-${Date.now()}`;
    return res.json({ mensagem: 'Login bem-sucedido', token, tipo: user.tipo });
  }

  return res.status(401).json({ erro: 'Credenciais inválidas' });
});

module.exports = router;
