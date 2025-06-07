function main() {
  document.querySelector("#btnimg").addEventListener("click", puxarImagem);
  document.querySelector("#btnnomes").addEventListener("click", puxarNomes);
}

function baixarImagem(url) {
  fetch(url)
    .then((resp) => {
      return resp.blob();
    })
    .then((blob) => {
      const imageObjectURL = URL.createObjectURL(blob);
      let img = document.createElement("img");
      img.src = imageObjectURL;
      document.querySelector("#imagens").appendChild(img);
    });
}

function puxarImagem() {
  const imagens = [
    "adelia-da-silva-saraiva",
    "alexandre-garcia-de-oliveira",
    "alexandre-sobrino-gananca",
  ];
  imagens.forEach((imagem) => {
    baixarImagem("https://fatecrl.edu.br/public/images/docentes/" + imagem + ".jpg");
  });
}

function puxarNomes() {
  fetch("https://fatecrl.edu.br/wally")
    .then((resp) => resp.text())
    .then((text) => {
      let d = new DOMParser();
      let nome = d.parseFromString(text, "text/html");
      extrairNome(nome);
    })
    .catch((error) => {
      console.error("Erro:", error);
      document.querySelector("#res").textContent = "Erro ao carregar nomes";
    });
}

function extrairNome(nome) {
  let div = document.querySelector("#res");
  let nomeExtraido = nome.querySelectorAll(".card-title");
  nomeExtraido.forEach((text) => {
    let p = document.createElement("p");
    p.textContent = text.textContent;
    div.appendChild(p);
  });
}

window.onload = main;
