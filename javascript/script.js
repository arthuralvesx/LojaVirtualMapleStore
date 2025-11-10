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

//login e cadastro
function iniciarLoginCadastro() {
  const fCadastro = document.getElementById('formCadastro');
  const fLogin = document.getElementById('formLogin');
  const msgCad = document.getElementById('msgCadastro');
  const msgLog = document.getElementById('msgLogin');

  if (fCadastro) {
    fCadastro.addEventListener('submit', function (e) {
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
      fCadastro.reset();

      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1200);
    });
  }

  if (fLogin) {
    fLogin.addEventListener('submit', function (e) {
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


//lista de produtos
const produtos = [
  {
    name: "Tênis Nike Air Max DN Masculino",
    price: "R$ 1.234,99",
    image: "https://maze.jetassets.com.br/produto/20250922134438_5014994986_H.jpg",
    description: "O Tênis Nike Air Max DN Masculino é um verdadeiro ícone da moda streetwear, sendo produzido com materiais de alta qualidade que garantem durabilidade e conforto. Confeccionado em tecido respirável, ele proporciona ventilação aos pés, mantendo-os frescos durante todo o dia. Seu design moderno e sofisticado combina perfeitamente com diversas peças do guarda-roupa, tornando-o ideal para quem busca um visual despojado e cheio de estilo."
  },
  {
    name: "Mizuno Wave Prophecy LS Preto",
    price: "R$ 1.079,99",
    image: "https://maze.jetassets.com.br/produto/20240620104023_5235994765_H.jpg",
    description: "Mizuno Wave Prophecy LS Black Com o design icônico e característico da Mizuno, o Wave Prophecy LS Black apresenta uma estética harmoniosa que mescla elementos futuristas e tecnológicos em cada detalhe. O destaque principal deste modelo são as solas equipadas com um avançado sistema de amortecimento, projetado para melhorar o desempenho esportivo enquanto proporciona um conforto excepcional aos pés."
  },
  {
    name: "Tênis Adidas Adi2000 Preto",
    price: "R$ 799,90",
    image: "https://maze.jetassets.com.br/produto/20241220141402_7241992759_D.jpg",
    description: "Inspirado na audácia dos anos 2000, o Adi2000 é um sneaker inovador da Adidas projetado para unir estilo contemporâneo com alto desempenho esportivo. Este modelo apresenta um design aerodinâmico e confortável, equipado com tecnologia avançada de amortecimento, ideal tanto para prática esportiva quanto para uso casual. O Adi2000 incorpora o DNA da Adidas no skate, com uma paleta totalmente preta, destacando as três listras de forma única nas laterais e um cabedal de couro que desta ainda mais o seu visual moderno e atraente."
  }
];

//função para gerar o HTML de um produto
function cardProdutoHTML(p) {
  return `
    <div class="product-card-container" 
         data-name="${p.name}" 
         data-price="${p.price}" 
         data-image="${p.image}"
         data-description="${p.description}">
      <div class="product-image-container">
        <img class="product-image" src="${p.image}" alt="${p.name}">
      </div>
      <div class="product-details-container">
        <h2 class="product-name">${p.name}</h2>
        <p class="product-price">${p.price}</p>
      </div>
    </div>
  `;
}

//renderiza todos os produtos
function renderProdutosPagina() {
  const grid = document.getElementById('produtosGrid');
  if (!grid) return;

  grid.innerHTML = produtos.map(cardProdutoHTML).join('');

  //renderiza, liga os cliques
  ligarBotoesProduto();
}

//função assim que a página carregar
document.addEventListener('DOMContentLoaded', renderProdutosPagina);

function ligarBotoesProduto() {
  const productCards = document.querySelectorAll(".product-card-container");

  productCards.forEach(card => {
    card.addEventListener("click", () => {
      const productData = {
        name: card.dataset.name,
        price: card.dataset.price,
        image: card.dataset.image,
        description: card.dataset.description
      };

      localStorage.setItem("selectedProduct", JSON.stringify(productData));
      window.location.href = "produto.html";
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const productData = JSON.parse(localStorage.getItem("selectedProduct"));

  if (productData) {
    document.querySelector(".imagem-principal-produto").src = productData.image;
    document.querySelector(".titulo-produto").textContent = productData.name;
    document.querySelector(".preco-produto").textContent = productData.price;
    document.querySelector(".descricao p").textContent = productData.description;
  }
});