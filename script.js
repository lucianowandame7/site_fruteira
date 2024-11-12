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

    let carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];  

    const novoProduto = {
        nome: nome,
        preco: preco,
        quantidade: 1  
    };

   
    const produtoExistente = carrinho.find(item => item.nome === novoProduto.nome);

    if (produtoExistente) {
        produtoExistente.quantidade += 1;
    } else {
        carrinho.push(novoProduto);
    }

    sessionStorage.setItem("carrinho", JSON.stringify(carrinho));
}