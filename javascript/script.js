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
    price: "R$ 1.234,99",
    image: "https://maze.jetassets.com.br/produto/20250922134438_5014994986_H.jpg",
    description: "O Tênis Nike Air Max DN Masculino é um verdadeiro ícone da moda streetwear, sendo produzido com materiais de alta qualidade que garantem durabilidade e conforto. Confeccionado em tecido respirável, ele proporciona ventilação aos pés, mantendo-os frescos durante todo o dia. Seu design moderno e sofisticado combina perfeitamente com diversas peças do guarda-roupa, tornando-o ideal para quem busca um visual despojado e cheio de estilo."
  },
  {
    name: "Tênis Nike Shox Tl Print Prata/preto",
    price: "R$ 1.329,90 ",
    image: "https://maze.jetassets.com.br/produto/20250911091741_8215991785_D.jpg",
    description: "O Nike Shox TL eleva o amortecimento mecânico a um novo patamar. Uma versão repaginada do ícone de 2003, ele apresenta malha respirável e tecnologia Nike Shox em toda a extensão para absorção de impacto ideal e um visual arrojado."
  },
  {
    name: "Tênis Nike Dunk Low Retro Azul/branco",
    price: "R$ 854,90",
    image: "https://maze.jetassets.com.br/produto/20251029112812_6388993612_H.jpg",
    description: "Você sempre pode contar com um clássico. O Dunk Low Retro combina um visual monocromático com materiais premium e estofamento de pelúcia para um conforto revolucionário que dura. As possibilidades são infinitas — como você usará seu Dunk?"
  },
  {
    name: "Tênis Nike Air Max Dn8 Cinza/verde",
    price: "R$ 1.424,90",
    image: "https://maze.jetassets.com.br/produto/20251027144512_4857995143_H.jpg",
    description: "Mais Air, menos volume. O Dn8 pega nosso sistema Dynamic Air e o condensa em um pacote elegante e discreto. Alimentado por oito tubos de Air pressurizados, ele proporciona uma sensação de resposta a cada passo. Entre em uma experiência surreal de movimento."
  },
  {
    name: "Tênis Air Jordan 1 Low Se Azul/branco",
    price: "R$ 1.139,90",
    image: "https://maze.jetassets.com.br/produto/20251023112002_6371993629_D.jpg",
    description: "Sempre na moda, sempre novo. Assim como o original lançado em 1985, esta edição especial do AJ1 Low oferece um visual clean e clássico, além de conforto duradouro. Amarre-o e saia com um perfil icônico feito com materiais premium."
  },
  {
    name: "Tênis Mizuno Wave Prophecy LS Preto",
    price: "R$ 1.079,99",
    image: "https://maze.jetassets.com.br/produto/20240620104023_5235994765_H.jpg",
    description: "Mizuno Wave Prophecy LS Black Com o design icônico e característico da Mizuno, o Wave Prophecy LS Black apresenta uma estética harmoniosa que mescla elementos futuristas e tecnológicos em cada detalhe. O destaque principal deste modelo são as solas equipadas com um avançado sistema de amortecimento, projetado para melhorar o desempenho esportivo enquanto proporciona um conforto excepcional aos pés."
  },
  {
    name: "Tênis Mizuno Wave Prophecy Ls Preto/marrom",
    price: "R$ 1.234,99",
    image: "https://maze.jetassets.com.br/produto/20251013112525_2196997804_D.jpg",
    description: "Mizuno Wave Prophecy LS Preto/marrom Com o design icônico e característico da Mizuno, o Wave Prophecy LS Black apresenta uma estética harmoniosa que mescla elementos futuristas e tecnológicos em cada detalhe. O destaque principal deste modelo são as solas equipadas com um avançado sistema de amortecimento, projetado para melhorar o desempenho esportivo enquanto proporciona um conforto excepcional aos pés."
  },
  {
    name: "Tenis Mizuno Wave Prophecy B 2 Verde/rosa",
    price: "R$ 1.799,90",
    image: "https://maze.jetassets.com.br/produto/20241003090044_3354996646_D.jpg",
    description: "O novo cabedal mais leve e macio torna o legado do WAVE PROPHECY mais duradouro. Com technologia Smooth Ride: ranhuras no solado que permitem maior flexibilidade nas regiões de transição da passada. Evolução do U4iC, sendo mais leve e mais macio, proporcionando maior conforto durante a corrida. X10 composto de borracha e carbono que oferece maior durabilidade e aderência ao solado na entrada da pisada. Mizuno Wave, placa WAVE em TPU que proporciona maior estabilidade e absorção de impacto."
  },
  {
    name: "Tenis Mizuno Wave Prophecy Ls Dourado",
    price: "R$ 1.139,94",
    image: "https://maze.jetassets.com.br/produto/20241014111253_8017991983_D.jpg",
    description: "A clássica silhueta do Prophecy em uma collab exclusiva com a marca Shinzo. Esta colaboração é uma homenagem aos Jogos Olímpicos de 2024, sediados em Paris. O conceito por trás do produto é o Ouro parecer que o produto foi imergido em um tonel do mineral. Os materias escolhidos são refletivos, imitando o brilho da medalha. Shinzo é uma boutique de sneakers parisiense referência em streetwear."
  },
  {
    name: "Tenis Mizuno Wave Prophecy Ls Cinza",
    price: "R$ 759,96",
    image: "https://maze.jetassets.com.br/produto/20250818142618_819999181_D.jpg",
    description: "Mizuno Wave Prophecy LS Preto/marrom Com o design icônico e característico da Mizuno, o Wave Prophecy LS Black apresenta uma estética harmoniosa que mescla elementos futuristas e tecnológicos em cada detalhe. O destaque principal deste modelo são as solas equipadas com um avançado sistema de amortecimento, projetado para melhorar o desempenho esportivo enquanto proporciona um conforto excepcional aos pés."
  },
  {
    name: "Tênis Adidas Adi2000 Preto",
    price: "R$ 799,90",
    image: "https://maze.jetassets.com.br/produto/20241220141402_7241992759_D.jpg",
    description: "Inspirado na audácia dos anos 2000, o Adi2000 é um sneaker inovador da Adidas projetado para unir estilo contemporâneo com alto desempenho esportivo. Este modelo apresenta um design aerodinâmico e confortável, equipado com tecnologia avançada de amortecimento, ideal tanto para prática esportiva quanto para uso casual. O Adi2000 incorpora o DNA da Adidas no skate, com uma paleta totalmente preta, destacando as três listras de forma única nas laterais e um cabedal de couro que desta ainda mais o seu visual moderno e atraente."
  },
  {
    name: "Tenis Adidas Superstar Ii W Preto",
    price: "R$ 370,44",
    image: "https://maze.jetassets.com.br/produto/20250506094900_7364992636_H.jpg",
    description: "O verdadeiro original está de volta. Nascido nas quadras de basquete, ele ganhou os holofotes como parte da cena de hip hop dos anos 80. Porém, ele não parou por aí. O Superstar também foi o primeiro tênis adidas a ser adotado pela comunidade do skate. Esta versão mantém-se fiel ao icônico estilo shell-toe, que continua no auge há cinco décadas, sem previsão de ficar para trás. O cabedal em couro premium e cupsole volumoso são itens à altura de uma estrela do skate como você."
  },
  {
    name: "Tênis Adidas Rivalry Low Lux Preto",
    price: "R$ 332,45",
    image: "https://maze.jetassets.com.br/produto/20250428113416_137999863_D.jpg",
    description: "Com linhas elegantes e materiais premium, este tênis adidas eleva o estilo do basquete a qualquer visual. O cabedal em nobuck premium tem como base um cupsole de borracha semitranslúcido, conferindo um visual clássico e conforto extra. A estrutura de costura destaca as Três Listras em cores contrastantes."
  },
  {
    name: "Chinelo Adidas Yeezy Foam Rnr Bege",
    price: "R$ 455,94",
    image: "https://maze.jetassets.com.br/produto/20241008101519_9077990923_D.jpg",
    description: "Experimente o máximo em conforto e estilo com o adidas Yeezy Foam RNR Stone Salt. Esses tênis apresenta uma sola de espuma inovadora que fornece amortecimento máximo e um design elegante que certamente chamará a atenção. Fique por dentro da moda e do conforto com o Yeezy."
  },
  {
    name: "Tênis Adidas Tênis Yeezy 700 Mnvn Verde",
    price: "R$ 740,94",
    image: "https://maze.jetassets.com.br/produto/20240805173252_5908994092_D.jpg",
    description: "A coleção Yeezy da Adidas redefine o conceito de moda e inovação no universo dos calçados e vestuário. Criada em colaboração com o renomado designer Kanye West, a linha Yeezy é conhecida por seu design futurista e estética minimalista, que combina formas ousadas e cores neutras com tecnologia de ponta. Desde os icônicos Yeezy Boost 700 até as versões mais recentes, cada peça é projetada para oferecer conforto superior e estilo inigualável."
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