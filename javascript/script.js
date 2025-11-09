//localStorage
const USUARIOS_KEY = 'usuariosMapleStore';

function lsGet(chave, padrao) {
  return JSON.parse(localStorage.getItem(chave)) || padrao;
}

function lsSet(chave, valor) {
  localStorage.setItem(chave, JSON.stringify(valor));
}

//ação carrossel
document.addEventListener('DOMContentLoaded', () => {
  const imagens = document.querySelectorAll('.carrossel img');
  let index = 0;

  if (imagens.length > 0) {
    const activeIndex = Array.from(imagens).findIndex(img => img.classList.contains('active'));
    index = activeIndex !== -1 ? activeIndex : 0;
    imagens[index].classList.add('active');
  }

  function trocarImagem() {
    if (imagens.length > 0) {
      imagens[index].classList.remove('active');
    }
    index = (index + 1) % imagens.length;
    imagens[index].classList.add('active');
  }
  setInterval(trocarImagem, 4000);
});

// Função principal para iniciar os eventos de login e cadastro
function iniciarLoginCadastro() {
  const fCad = document.getElementById('formCadastro');
  const fLog = document.getElementById('formLogin');
  const msgCad = document.getElementById('msgCadastro');
  const msgLog = document.getElementById('msgLogin');

  if (fCad) {
    fCad.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = document.getElementById('cadEmail').value.trim().toLowerCase();
      const senha = document.getElementById('cadSenha').value;
      const confirmar = document.getElementById('cadConfirmar').value;

      if (!email || !senha || !confirmar) {
        msgCad.textContent = 'Preencha todos os campos.';
        return;
      }

      if (senha !== confirmar) {
        msgCad.textContent = 'As senhas não conferem.';
        return;
      }

      const usuarios = lsGet(USUARIOS_KEY, []);

      if (usuarios.some(u => u.email === email)) {
        msgCad.textContent = 'E-mail já cadastrado.';
        return;
      }

      usuarios.push({ email, senha });
      lsSet(USUARIOS_KEY, usuarios);

      msgCad.textContent = 'Cadastro realizado com sucesso! Redirecionando para o login...';
      fCad.reset();

      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1200);
    });
  }

  if (fLog) {
    fLog.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = document.getElementById('logEmail').value.trim().toLowerCase();
      const usuarios = lsGet(USUARIOS_KEY, []);

      const usuario = usuarios.find(u => u.email === email);

      if (usuario) {
        lsSet('usuarioLogado', { email: usuario.email });
        msgLog.textContent = `Login efetuado! Bem-vindo, ${usuario.email}.`;
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1000);
      } else {
        msgLog.textContent = 'E-mail não encontrado. Verifique ou cadastre-se.';
      }
    });
  }

  //ações btn
  const btnVoltar = document.getElementById('btnVoltar');
  const btnVoltarIndex = document.getElementById('btnVoltarIndex');
  const btnCadastro = document.getElementById('btnCadastro');

  if (btnVoltar) {
    btnVoltar.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }

  if (btnVoltarIndex) {
    btnVoltarIndex.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }

  if (btnCadastro) {
    btnCadastro.addEventListener('click', () => {
      window.location.href = 'cadastroUsuario.html';
    });
  }
}

document.addEventListener('DOMContentLoaded', iniciarLoginCadastro);