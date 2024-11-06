function adicionarCarrinho(button) {
    window.alert("Produto adicionado ao carrinho!");
 
    const produtoDiv = button.closest('.produtos');
    const nome = produtoDiv.querySelector('.produtoNome').innerHTML;
    const preco = produtoDiv.querySelector('.produtoPreco').innerHTML;
 
     // Recupera a lista de produtos do sessionStorage
     let carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];  // Se não houver, cria um array vazio

     // Adiciona o novo produto à lista
     const novoProduto = {
         nome: nome,
         preco: preco
     };
     carrinho.push(novoProduto);  // Adiciona o novo item ao array
 
     // Salva a lista de volta no sessionStorage
     sessionStorage.setItem("carrinho", JSON.stringify(carrinho));

     

}