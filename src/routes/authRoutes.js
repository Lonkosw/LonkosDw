const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Caminho do arquivo JSON com usuários
const usersPath = path.join(__dirname, '..', 'data', 'users.json');

function getUsers() {
  if (fs.existsSync(usersPath)) {
    const data = fs.readFileSync(usersPath, 'utf-8');
    return JSON.parse(data);
  }
  return [];
}

router.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const users = getUsers();

  const user = users.find(u => u.email === email && u.senha === senha);

  if (user) {
    const token = `${user.tipo}-${user.id}-${Date.now()}`;
    return res.json({ mensagem: 'Login bem-sucedido', token, tipo: user.tipo });
  }

  return res.status(401).json({ erro: 'Credenciais inválidas' });
});

module.exports = router;

