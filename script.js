document.getElementById("search-input").addEventListener("input", function () {
    const searchValue = this.value.toLowerCase();
    const products = document.querySelectorAll(".produtos");

    products.forEach((product) => {
        const productName = product.querySelector(".produtoNome").textContent.toLowerCase();
        if (productName.includes(searchValue)) {
            product.style.display = "block"; // Mostrar produtos que correspondem à pesquisa
        } else {
            product.style.display = "none"; // Esconder produtos que não correspondem
        }
    });
})



function adicionarCarrinho(button) {

    const produtoDiv = button.closest('.produtos');
    const nome = produtoDiv.querySelector('.produtoNome').innerHTML;
    const preco = produtoDiv.querySelector('.produtoPreco').innerHTML;

    // Recupera a lista de produtos do sessionStorage
    let carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];  // Se não houver, cria um array vazio

    // Cria o objeto do produto a ser adicionado
    const novoProduto = {
        nome: nome,
        preco: preco,
        quantidade: 1  // Quantidade inicial
    };

    // Verifica se o produto já existe no carrinho
    const produtoExistente = carrinho.find(item => item.nome === novoProduto.nome);

    if (produtoExistente) {
        // Se o produto já existir no carrinho, aumenta a quantidade
        produtoExistente.quantidade += 1;
    } else {
        // Se o produto não existir, adiciona-o ao carrinho
        carrinho.push(novoProduto);
    }

    // Salva a lista de volta no sessionStorage
    sessionStorage.setItem("carrinho", JSON.stringify(carrinho));
}