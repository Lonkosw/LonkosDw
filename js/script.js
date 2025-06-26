console.log("Script carregado!");


function iniciarScripts() {
  document.querySelector('.btn-login').addEventListener('click', mostrarLogin);
  document.querySelector('.btn-destaque').addEventListener('click', iniciarPedido);
  document.querySelector('.voltar-seta').addEventListener('click', fecharModal);
  document.querySelector('#login-form .btn-confirmar').addEventListener('click', fazerLogin);
  document.querySelector('#cadastro-form .btn-confirmar').addEventListener('click', fazerCadastro);

  document.querySelector('#login-form .link-verde').addEventListener('click', mostrarCadastro);
  document.querySelector('#cadastro-form .link-verde').addEventListener('click', mostrarLogin);
}

function iniciarPedido() {
  window.location.href = "menu.html";
}

function mostrarLogin() {
  document.getElementById('login-modal').style.display = 'flex';
  mostrarLogin(); // garante que o formulário correto esteja visível
}

function fecharModal() {
  document.getElementById('login-modal').style.display = 'none';
}

function mostrarCadastro() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('cadastro-form').style.display = 'block';
}

function mostrarLoginForm() {
  document.getElementById('cadastro-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'block';
}

function fazerLogin() {
  const usuario = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;

  if (usuario === 'admin' && senha === '1234') {
    alert('Login realizado com sucesso!');
    fecharModal();
  } else {
    alert('Usuário ou senha incorretos.');
  }
}

function fazerCadastro() {
  const cpf = document.getElementById('cpf').value;
  const telefone = document.getElementById('telefone').value;
  const nome = document.getElementById('nome').value;
  const senha = document.getElementById('senha-cadastro').value;
  const repetir = document.getElementById('senha-confirmar').value;

  if (!cpf || !telefone || !nome || !senha || !repetir) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  if (senha !== repetir) {
    alert('As senhas não coincidem.');
    return;
  }

  alert('Cadastro realizado com sucesso!');
  mostrarLoginForm();
}

function iniciarScripts() {
  document.querySelector('.btn-login').addEventListener('click', abrirModalLogin);
  document.querySelector('.btn-destaque').addEventListener('click', iniciarPedido);
  document.querySelector('.voltar-seta').addEventListener('click', fecharModal);

  document.getElementById('btn-login').addEventListener('click', fazerLogin);
  document.getElementById('btn-cadastrar').addEventListener('click', fazerCadastro);

  // clique em texto
  document.querySelector('#login-form .link-verde').addEventListener('click', mostrarCadastro);
  document.querySelector('#cadastro-form .link-verde').addEventListener('click', mostrarLoginForm);
}

function iniciarPedido() {
  window.location.href = "menu.html";
}

function abrirModalLogin() {
  document.getElementById('login-modal').style.display = 'flex';
  mostrarLoginForm();
}

function fecharModal() {
  document.getElementById('login-modal').style.display = 'none';
}

function mostrarCadastro() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('cadastro-form').style.display = 'block';
}

function mostrarLoginForm() {
  document.getElementById('cadastro-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'block';
}

function fazerLogin() {
  const usuario = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;

  if (usuario === 'admin' && senha === '1234') {
    alert('Login realizado com sucesso!');
    fecharModal();
  } else {
    alert('Usuário ou senha incorretos.');
  }
}

function fazerCadastro() {
  const cpf = document.getElementById('cpf').value;
  const telefone = document.getElementById('telefone').value;
  const nome = document.getElementById('nome').value;
  const senha = document.getElementById('senha-cadastro').value;
  const repetir = document.getElementById('senha-confirmar').value;

  if (!cpf || !telefone || !nome || !senha || !repetir) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  if (senha !== repetir) {
    alert('As senhas não coincidem.');
    return;
  }

  alert('Cadastro realizado com sucesso!');
  mostrarLoginForm();
}

  