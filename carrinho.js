// Recupera a lista de produtos armazenada no sessionStorage
const carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];

const carrinhoContainer = document.getElementById("carrinho-container");
const subtotalElement = document.querySelector(".subtotal");

// Função para calcular o subtotal
function calcularSubtotal() {
    const subtotal = carrinho.reduce((total, produto) => {
        const precoNumerico = parseFloat(produto.preco.replace("R$", "").replace(",", "."));
        return total + (precoNumerico * produto.quantidade);
    }, 0);
    return subtotal.toFixed(2);
}

// Atualiza o subtotal na interface
function atualizarSubtotal() {
    const subtotal = calcularSubtotal();
    subtotalElement.textContent = `Subtotal: R$ ${subtotal.replace(".", ",")}`;
}

// Verifica se o carrinho está vazio e exibe uma mensagem, se necessário
if (carrinho.length === 0) {
    carrinhoContainer.style.display = "grid";
    carrinhoContainer.style.placeItems = "center";
    carrinhoContainer.style.height = "45vh";
    carrinhoContainer.style.fontSize = "1.5em";
    carrinhoContainer.innerHTML = "<p>Seu carrinho está vazio.</p>";
} else {
    // Para cada item no carrinho, cria um parágrafo e o adiciona ao container
    carrinho.forEach((produto, index) => {
        const produtoDiv = document.createElement("div");
        produtoDiv.classList.add("produto");

        produtoDiv.style.display = "flex";
        produtoDiv.style.justifyContent = "space-between";
        produtoDiv.style.marginTop = "15px";
        produtoDiv.innerHTML = `
   
    <p>Produto: ${produto.nome}</p>
    <p>Preço: ${produto.preco}</p>
    <p id="quantidade-${index}">Quantidade: ${produto.quantidade}</p>
    <div>
        <button onclick="diminuirQuantidade(${index})" style="background-color: orange; color: white; border: none; padding: 4px 8px; cursor: pointer; border-radius: 4px; text-align: right;">
            -
        </button>
        <button onclick="adicionarQuantidade(${index})" style="background-color: green; color: white; border: none; padding: 4px 8px; cursor: pointer; border-radius: 4px; text-align: right;">
            +
        </button>
        <button onclick="removerProduto(${index})" style="background-color: red; color: white; border: none; padding: 4px 8px; cursor: pointer; border-radius: 4px; text-align: right; margin-right: 10px;">
            Remover
        </button>
    </div>
`;

        carrinhoContainer.appendChild(produtoDiv);
    });

    // Atualiza o subtotal após adicionar os produtos
    atualizarSubtotal();

    // Verifica se o número de produtos é maior ou igual a 9 para adicionar rolagem
    if (carrinho.length >= 10) {
        carrinhoContainer.style.overflowY = "auto"; // Ativa a rolagem vertical
        carrinhoContainer.style.maxHeight = "50vh"; // Define a altura máxima para a rolagem
    }

    function configurarRolagem() {
        const mediaQuery = window.matchMedia("(max-width: 1050px)");

        // Verifica se a largura da tela é de 760px ou menos e o número de produtos é 4 ou mais
        if (mediaQuery.matches && carrinho.length >= 4) {
            carrinhoContainer.style.fontSize = "1em";
            carrinhoContainer.style.overflowY = "auto"; // Ativa a rolagem vertical
            carrinhoContainer.style.maxHeight = "60vh";
            carrinhoContainer.style.overflowX = "hidden";
        } else {
            carrinhoContainer.style.overflowY = "visible"; // Desativa a rolagem
            carrinhoContainer.style.maxHeight = "none"; // Remove o limite de altura
        }

    }

    // Chama a função ao carregar a página e sempre que a tela for redimensionada
    configurarRolagem();
    window.addEventListener("resize", configurarRolagem);


}

// Função para adicionar mais unidades de um produto
function adicionarQuantidade(index) {
    const carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];
    carrinho[index].quantidade++; // Aumenta a quantidade do produto

    sessionStorage.setItem("carrinho", JSON.stringify(carrinho));

    // Atualiza a quantidade na interface e o subtotal
    document.getElementById(`quantidade-${index}`).textContent = carrinho[index].quantidade;
    atualizarSubtotal();
    window.location.reload();
}

// Função para diminuir a quantidade de um produto
function diminuirQuantidade(index) {
    const carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];
    if (carrinho[index].quantidade > 1) {
        carrinho[index].quantidade--; // Diminui a quantidade do produto

        sessionStorage.setItem("carrinho", JSON.stringify(carrinho));

        // Atualiza a quantidade na interface e o subtotal
        document.getElementById(`quantidade-${index}`).textContent = carrinho[index].quantidade;
        atualizarSubtotal();
        window.location.reload();
    }
}

// Função para remover o item do carrinho
function removerProduto(index) {
    const carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];
    carrinho.splice(index, 1); // Remove 1 item no índice especificado

    sessionStorage.setItem("carrinho", JSON.stringify(carrinho));

    // Atualiza a visualização do carrinho e o subtotal
    window.location.reload(); // Recarrega a página para refletir as alterações
}