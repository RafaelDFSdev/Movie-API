const Pesquisar = document.querySelector("form");
const apiKey = "c388e102";
const lista = document.querySelector("div.filmes");
const overlayBackground = document.querySelector(".overlay-background");
var contador = 0;
var maximoElementos = 1;
let divCriada = false;

Pesquisar.onsubmit = (ev) => {
    ev.preventDefault();
    const pesquisa = ev.target.pesquisa.value;
    if (pesquisa === "") {
        alert("Preencha o Campo")
        return;
    }
    limparLista();
    Altura();
    fetch(`https://www.omdbapi.com/?s=${pesquisa}&apikey=${apiKey}`)
        .then(result => result.json())
        .then(json => carregaLista(json));
};

const carregaLista = (json) => {

    // Verifica se json.Search está definido e é uma array
    if (!json.Search || !Array.isArray(json.Search)) {
        let altura2 = document.createElement("div");
        altura2.classList.add("NF");
        altura2.innerHTML = "<h3>MOVIE NOT FOUND</h3>"
        altura2.style.height = "100vh";
        lista.appendChild(altura2);
        return;
    };

    json.Search.forEach(element => {
        console.log(element);
        cleanDetails();
        let item = document.createElement("div");
        var larguraDaTela = window.innerWidth || document.documentElement.clientWidth;
        item.classList.add("item");
        if (larguraDaTela <= 999) {
            item.classList.add("animate__animated");
            item.classList.add("animate__flipInY");
        } else {
        };

        item.innerHTML = `<img src="${element.Poster}" /><div class="text"><h2>${element.Title}</h2></div>`;

        item.addEventListener('click', () => {
            Details(element.imdbID);
        });

        lista.appendChild(item);
        setTimeout(() => {
            item.classList.add("show");
        }, 50);
    });
};


const Details = (imdbID) => {
    if (divCriada) {
        return;
    };

    fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`)
        .then(result => result.json())
        .then(json => {
            console.log(json);
            const DetailsDiv = document.createElement("div");
            DetailsDiv.classList.add("Details");
            DetailsDiv.innerHTML = `
                <button id="CloseDetails">X</button>
                <img src="${json.Poster}" alt="${json.Title} Poster"/>
                <div class="DetailsText"
                <h2>${json.Title}</h2>
                <p>Diretor: ${json.Director}</hp >
                <p>Ano: ${json.Year}</p>
                <p>Nota: ${json.imdbRating}</p>
                </div>
            `;
            cleanDetails();
            overlayBackground.appendChild(DetailsDiv);

            setTimeout(() => {
                DetailsDiv.classList.add("show");
                overlayBackground.classList.add("visible");
            }, 50);

            const CloseButton = DetailsDiv.querySelector("#CloseDetails");
            CloseButton.addEventListener('click', () => {
                overlayBackground.removeChild(DetailsDiv);
                overlayBackground.classList.remove("visible");
            });

        });
};

const cleanDetails = () => {
    const DetailsDiv = overlayBackground.querySelector(".Details");
    if (DetailsDiv) {
        DetailsDiv.remove();
    }
};

const limparLista = () => {
    // Limpa os itens da lista removendo todos os filhos
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    };
};
const Altura = () => {
    if (overlayBackground.style.height = "100vh") {
    } else {
        overlayBackground.style.height = "100vh"
    }
};