document.addEventListener("DOMContentLoaded", () => {
    const btnCadastro = document.getElementById("btnCadastro");

    if (btnCadastro) {
        btnCadastro.addEventListener("click", () => {
            window.location.href = "cadastroUsuario.html";
        });
    }
});

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