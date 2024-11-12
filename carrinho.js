const carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];

const carrinhoContainer = document.getElementById("carrinho-container");
const subtotalElement = document.querySelector(".subtotal");

function calcularSubtotal() {
    const subtotal = carrinho.reduce((total, produto) => {
        const precoNumerico = parseFloat(produto.preco.replace("R$", "").replace(",", "."));
        return total + (precoNumerico * produto.quantidade);
    }, 0);
    return subtotal.toFixed(2);
}

function atualizarSubtotal() {
    const subtotal = calcularSubtotal();
    subtotalElement.textContent = `Subtotal: R$ ${subtotal.replace(".", ",")}`;
}

if (carrinho.length === 0) {
    carrinhoContainer.style.display = "grid";
    carrinhoContainer.style.placeItems = "center";
    carrinhoContainer.style.height = "45vh";
    carrinhoContainer.style.fontSize = "1.5em";
    carrinhoContainer.innerHTML = "<p>Seu carrinho está vazio.</p>";
} else {
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
    atualizarSubtotal();

    if (carrinho.length >= 10) {
        carrinhoContainer.style.overflowY = "auto"; 
        carrinhoContainer.style.maxHeight = "50vh"; 
    }

    function configurarRolagem() {
        const mediaQuery = window.matchMedia("(max-width: 1050px)");


        if (mediaQuery.matches && carrinho.length >= 4) {
            carrinhoContainer.style.fontSize = "1em";
            carrinhoContainer.style.overflowY = "auto"; 
            carrinhoContainer.style.maxHeight = "60vh";
            carrinhoContainer.style.overflowX = "hidden";
        } else {
            carrinhoContainer.style.overflowY = "visible";
            carrinhoContainer.style.maxHeight = "none";
        }

    }

    configurarRolagem();
    window.addEventListener("resize", configurarRolagem);


}

function adicionarQuantidade(index) {
    const carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];
    carrinho[index].quantidade++; 

    sessionStorage.setItem("carrinho", JSON.stringify(carrinho));

    document.getElementById(`quantidade-${index}`).textContent = carrinho[index].quantidade;
    atualizarSubtotal();
    window.location.reload();
}

function diminuirQuantidade(index) {
    const carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];
    if (carrinho[index].quantidade > 1) {
        carrinho[index].quantidade--; 

        sessionStorage.setItem("carrinho", JSON.stringify(carrinho));

        document.getElementById(`quantidade-${index}`).textContent = carrinho[index].quantidade;
        atualizarSubtotal();
        window.location.reload();
    }
}


function removerProduto(index) {
    const carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];
    carrinho.splice(index, 1); 

    sessionStorage.setItem("carrinho", JSON.stringify(carrinho));

   
    window.location.reload(); 
}

document.getElementById("voltar").addEventListener("click", function () {
    history.back();
})