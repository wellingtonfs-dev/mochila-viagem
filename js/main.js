// acesso o formulario
const form = document.getElementById("novoItem");
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((elemento) => {
    criaElemento(elemento);
});

// crio o evento que escuta quando o formulario é enviado
form.addEventListener("submit", (evento) => {
    // interrompo o processo natural do evento
    evento.preventDefault();
    const nome = evento.target.elements["nome"];
    const quantidade = evento.target.elements["quantidade"];
    const existe = itens.find(elemento => elemento.nome === nome.value)
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if(existe){
        itemAtual.id = existe.id;

        atualizaElemento(itemAtual)

        // Atualiza o localStorage
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    }else{
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id +1 : 0;
        
    // acesso os elementos contidos no array com seus determinados valores
        criaElemento(itemAtual)

        //Salva os dados no localStorage    
        itens.push(itemAtual);
    }
    //Atualiza o localStorage
    localStorage.setItem("itens", JSON.stringify(itens));

    //Limpa os dados do adicionar item
    nome.value = ""
    quantidade.value = ""
});

//CRIA UM ITEM NA LISTA
function criaElemento(item){
    // crio uma nova lista
    const novoItem = document.createElement('li')
    // adiciono a classe lista para a lista receber a formatação
    novoItem.classList.add('item');
    // crio a tag strong para receber o numero
    const numeroItem = document.createElement('strong');
    // adiciono o numero recebido da quantidade dentro da tag strong
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;
    // adiciono o numero dentro do novo item que é a li
    novoItem.appendChild(numeroItem)
    //concateno o numero e o seu nome
    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta(item.id))
    // adiciono os valores a tela
    lista.appendChild(novoItem)       
}

// ATUALIZA UM ITEM DA LISTA
function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

//INSERE UM BOTÃO COM EVENTO DE CLIQUE NOS ITENS DA LISTA
function botaoDeleta(id){
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";

    elementoBotao.addEventListener("click", function(){
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

// DELETA UM ELEMENTO NO LOCALSTORAGE
function deletaElemento(tag, id){
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    //Atualiza o localStorage
    localStorage.setItem("itens", JSON.stringify(itens));    

}


