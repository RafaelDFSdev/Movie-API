const Pesquisar = document.querySelector("form");
const apiKey ="c388e102";
const lista = document.querySelector("div.filmes");
const pagina = document.querySelector("main");
var contador = 0;
var maximoElementos = 1;

Pesquisar.onsubmit = (ev) =>{
    ev.preventDefault();
    const pesquisa = ev.target.pesquisa.value;
    if(pesquisa===""){
        alert("Preencha o Campo")
        return;
    }
    limparLista();
    Altura();
    fetch(`https://www.omdbapi.com/?s=${pesquisa}&apikey=${apiKey}`)
        .then(result=>result.json())
        .then(json => carregaLista(json));
};

const carregaLista = (json) => {

    // Verifica se json.Search está definido e é uma array
    if (!json.Search || !Array.isArray(json.Search)) {
        let altura2 = document.createElement("div");
        altura2.style.height="100vh";
        lista.appendChild(altura2);
        return;
    };

    json.Search.forEach(element => {
        console.log(element);

        let item = document.createElement("div");
        item.classList.add("item");
        item.innerHTML = `<img src="${element.Poster}" /><div class="text"><h2>${element.Title}</h2></div>`;
        lista.appendChild(item);
        setTimeout(() => {
            item.classList.add("show");
        }, 50);
    });
};
const limparLista = () => {
    // Limpa os itens da lista removendo todos os filhos
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    };
};
const Altura = () =>{
    if(pagina.style.height= "100vh"){
        pagina.style.height= "auto"
    }else{
        pagina.style.height= "100vh"
    }
};