const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

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

  console.log(`Tentativa de login: ${email}`);

  const user = users.find(u => u.email === email && u.senha === senha);

  if (user) {
    const token = `${user.tipo}-${user.id}-${Date.now()}`;
    console.log(`Login bem-sucedido: ${email}`);
    return res.json({ mensagem: 'Login bem-sucedido', token, tipo: user.tipo });
  }

  console.log(`Credenciais inválidas: ${email}`);
  return res.status(401).json({ erro: 'Credenciais inválidas' });
});

module.exports = router;
