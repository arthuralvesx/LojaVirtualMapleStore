//localStorage
const USUARIOS_KEY = 'usuariosMapleStore';
const PRODUTOS_KEY = 'produtosMapleStore';
const CARRINHO_KEY = 'carrinhoMapleStore';

//funçoes auxiliares
function lsGet(chave, padrao) {
  return JSON.parse(localStorage.getItem(chave)) || padrao;
}

function lsSet(chave, valor) {
  localStorage.setItem(chave, JSON.stringify(valor));
}

//ação carroesel
document.addEventListener('DOMContentLoaded', () => {
  const imagens = document.querySelectorAll('.carrossel img');
  let index = 0;

  if (imagens.length > 0) {
    const activeIndex = Array.from(imagens).findIndex(img => img.classList.contains('active'));
    index = activeIndex !== -1 ? activeIndex : 0;
    imagens[index].classList.add('active');
  }

  function trocarImagem() {
    if (imagens.length > 0) imagens[index].classList.remove('active');
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

  //cadastro
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

      setTimeout(() => window.location.href = 'login.html', 1200);
    });
  }

  //login
  if (fLogin) {
    fLogin.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = document.getElementById('logEmail').value.trim().toLowerCase();
      const usuarios = lsGet(USUARIOS_KEY, []);
      const usuario = usuarios.find(u => u.email === email);

      if (usuario) {
        lsSet('usuarioLogado', { email: usuario.email });
        msgLog.textContent = `Login efetuado! Bem-vindo, ${usuario.email}.`;
        setTimeout(() => window.location.href = 'index.html', 1000);
      } else {
        msgLog.textContent = 'E-mail não encontrado. Verifique ou cadastre-se.';
      }
    });
  }

  //botões de navegação
  const btnVoltar = document.getElementById('btnVoltar');
  const btnVoltarIndex = document.getElementById('btnVoltarIndex');
  const btnCadastro = document.getElementById('btnCadastro');

  if (btnVoltar) btnVoltar.addEventListener('click', () => window.location.href = 'login.html');
  if (btnVoltarIndex) btnVoltarIndex.addEventListener('click', () => window.location.href = 'index.html');
  if (btnCadastro) btnCadastro.addEventListener('click', () => window.location.href = 'cadastroUsuario.html');
}

document.addEventListener('DOMContentLoaded', iniciarLoginCadastro);

//lista de produtos
const produtos = [
  {
    name: "Tênis Nike Air Max DN Masculino",
    price: "1.234,99",
    image: "https://maze.jetassets.com.br/produto/20250922134438_5014994986_H.jpg",
    description: "O Tênis Nike Air Max DN Masculino é um verdadeiro ícone da moda streetwear, sendo produzido com materiais de alta qualidade que garantem durabilidade e conforto. Confeccionado em tecido respirável, ele proporciona ventilação aos pés, mantendo-os frescos durante todo o dia. Seu design moderno e sofisticado combina perfeitamente com diversas peças do guarda-roupa, tornando-o ideal para quem busca um visual despojado e cheio de estilo."
  },
  {
    name: "Mizuno Wave Prophecy LS Preto",
    price: "1.079,99",
    image: "https://maze.jetassets.com.br/produto/20240620104023_5235994765_H.jpg",
    description: "Mizuno Wave Prophecy LS Black Com o design icônico e característico da Mizuno, o Wave Prophecy LS Black apresenta uma estética harmoniosa que mescla elementos futuristas e tecnológicos em cada detalhe. O destaque principal deste modelo são as solas equipadas com um avançado sistema de amortecimento, projetado para melhorar o desempenho esportivo enquanto proporciona um conforto excepcional aos pés."
  },
  {
    name: "Tênis Adidas Adi2000 Preto",
    price: "799,90",
    image: "https://maze.jetassets.com.br/produto/20241220141402_7241992759_D.jpg",
    description: "Inspirado na audácia dos anos 2000, o Adi2000 é um sneaker inovador da Adidas projetado para unir estilo contemporâneo com alto desempenho esportivo. Este modelo apresenta um design aerodinâmico e confortável, equipado com tecnologia avançada de amortecimento, ideal tanto para prática esportiva quanto para uso casual. O Adi2000 incorpora o DNA da Adidas no skate, com uma paleta totalmente preta, destacando as três listras de forma única nas laterais e um cabedal de couro que desta ainda mais o seu visual moderno e atraente."
  }
];

//salva produtos no localStorage (caso não exista)
if (!localStorage.getItem(PRODUTOS_KEY)) {
  lsSet(PRODUTOS_KEY, produtos);
}

//redenrizar produtos na página inicial
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

function renderProdutosPagina() {
  const grid = document.getElementById('produtosGrid');
  if (!grid) return;

  const produtos = lsGet(PRODUTOS_KEY, []);
  grid.innerHTML = produtos.map(cardProdutoHTML).join('');
  ligarBotoesProduto();
}

document.addEventListener('DOMContentLoaded', renderProdutosPagina);

//página de produto
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
  if (!productData) return;

  const img = document.querySelector(".imagem-principal-produto");
  const titulo = document.querySelector(".titulo-produto");
  const preco = document.querySelector(".preco-produto");
  const desc = document.querySelector(".descricao p");
  const btnCarrinho = document.getElementById("btnAdicionarCarrinho");

  if (img) img.src = productData.image;
  if (titulo) titulo.textContent = productData.name;
  if (preco) preco.textContent = productData.price;
  if (desc) desc.textContent = productData.description;

  if (btnCarrinho) {
    btnCarrinho.addEventListener("click", () => adicionarAoCarrinho(productData));
  }
});

//carrinho de compras
function adicionarAoCarrinho(produto) {
  if (!produto) return;

  const carrinho = lsGet(CARRINHO_KEY, []);
  const existente = carrinho.find(p => p.name === produto.name);

  if (existente) existente.qtd += 1;
  else carrinho.push({ ...produto, qtd: 1 });

  lsSet(CARRINHO_KEY, carrinho);
  alert("Produto adicionado ao carrinho!");
}

function renderizarCarrinho() {
  const container = document.getElementById("itensCarrinho");
  if (!container) return;

  const carrinho = lsGet(CARRINHO_KEY, []);
  container.innerHTML = "";

  if (carrinho.length === 0) {
    container.innerHTML = "<p>Seu carrinho está vazio</p>";
    document.getElementById("subtotal").textContent = "R$ 0,00";
    document.getElementById("valorTotal").textContent = "R$ 0,00";
    return;
  }

  let total = 0;

  carrinho.forEach((item, index) => {

    const preco = parseFloat(item.price.replace(/[^\d,]/g, "").replace(",", "."));

    const subtotal = preco * item.qtd;
    total += subtotal;

    const formatarValor = valor => {
      return valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const div = document.createElement("div");
    div.classList.add("item-carrinho");
    div.innerHTML = `
    <div class="col-info-item">
      <span class="btn-remover-item" data-index="${index}">⊗</span>
      <img src="${item.image}" alt="${item.name}" class="img-item">
      <span class="nome-item">${item.name}</span>
    </div>
    <span class="preco-item">R$ ${formatarValor(preco)}</span>
    <div class="controle-qtd-item">
      <button class="btn-qtd" data-action="menos" data-index="${index}">-</button>
      <input value='${item.qtd}' class="input-qtd" readonly>
      <button class="btn-qtd" data-action="mais" data-index="${index}">+</button>
    </div>
    <span class="valor-subtotal-item">R$ ${formatarValor(subtotal)}</span>
  `;
    container.appendChild(div);
  });

  document.getElementById("subtotal").textContent =
    "R$ " + total.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  document.getElementById("valorTotal").textContent =
    "R$ " + total.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  //ações botões
  document.querySelectorAll(".btn-qtd").forEach(btn => {
    btn.addEventListener("click", e => {
      const index = parseInt(e.target.dataset.index);
      const action = e.target.dataset.action;
      alterarQuantidade(index, action);
    });
  });

  document.querySelectorAll(".btn-remover-item").forEach(btn => {
    btn.addEventListener("click", e => removerItem(parseInt(e.target.dataset.index)));
  });
}

function alterarQuantidade(index, acao) {
  const carrinho = lsGet(CARRINHO_KEY, []);
  if (acao === "mais") carrinho[index].qtd++;
  else if (acao === "menos" && carrinho[index].qtd > 1) carrinho[index].qtd--;
  else if (acao === "menos") carrinho.splice(index, 1);

  lsSet(CARRINHO_KEY, carrinho);
  renderizarCarrinho();
}

function removerItem(index) {
  const carrinho = lsGet(CARRINHO_KEY, []);
  carrinho.splice(index, 1);
  lsSet(CARRINHO_KEY, carrinho);
  renderizarCarrinho();
}

//esvaziar carrinho
document.addEventListener("DOMContentLoaded", () => {
  const btnEsvaziar = document.getElementById("btnEsvaziar");
  const btnVoltarIndex = document.getElementById("btnVoltarIndex");

  if (btnEsvaziar) {
    btnEsvaziar.addEventListener("click", () => {
      localStorage.removeItem(CARRINHO_KEY);
      renderizarCarrinho();
    });
  }

  if (btnVoltarIndex) {
    btnVoltarIndex.addEventListener("click", () => window.location.href = "index.html");
  }

  renderizarCarrinho();
});