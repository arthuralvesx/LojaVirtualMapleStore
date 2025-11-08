//ação do botão ir para tela de cadastro usuario
document.addEventListener("DOMContentLoaded", () => {
  const btnCadastro = document.getElementById("btnCadastro");
  
  if (btnCadastro) {
    btnCadastro.addEventListener("click", () => {
      window.location.href = "cadastroUsuario.html";
    });
  }
});

//ações de voltar btn
document.addEventListener("DOMContentLoaded", () => {
  const btnVoltar = document.getElementById("btnVoltar");
  const btnVoltarIndex = document.getElementById("btnVoltarIndex");

  if (btnVoltar) {
    btnVoltar.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }

  if (btnVoltarIndex) {
    btnVoltarIndex.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
});

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