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

  const user = users.find(u => u.email === email && u.senha === senha);

  if (user) {
    const token = `${user.tipo}-${user.id}-${Date.now()}`;
    return res.json({ mensagem: 'Login bem-sucedido', token, tipo: user.tipo });
  }

  return res.status(401).json({ erro: 'Credenciais inválidas' });
});

router.post('/cadastrar', (req, res) => {
  const { nome, email, telefone, senha } = req.body;
  if (!nome || !email || !telefone || !senha) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios!' });
  }

  const users = getUsers();

  const existente = users.find(u => u.email === email);
  if (existente) {
    return res.status(409).json({ erro: 'Email já cadastrado!' });
  }

  const novoUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    nome,
    email,
    telefone,
    senha,
    tipo: 'cliente' // fixo como cliente
  };

  users.push(novoUser);
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

  res.json({ mensagem: 'Cadastro realizado com sucesso!', usuario: novoUser });
});

module.exports = router;
