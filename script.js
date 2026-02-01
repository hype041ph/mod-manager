// Lista de mods com links do Google Drive
const modsOnline = [
    { 
        name: "3 Marias map", 
        url: "https://drive.google.com/file/d/1KcFQs4moduBMwPZI-HsT0m2f__n9E_uT/view?usp=sharing", 
        img: "https://i.ytimg.com/vi/oTwzlE348fg/maxresdefault.jpg" 
    },
    { 
        name: "Scania P320 Roll_ONll", 
        url: "https://drive.google.com/file/d/1zMsuu4w0jkxydoPO0KdVhV6tQrsv292v/view?usp=sharing", 
        img: "https://files.fs25.net/mods/2025/04/Scania-NTG-P320-Roll-On-1024x576.jpg" 
    },
    { 
        name: "Rancho Fundo", 
        url: "https://drive.google.com/file/d/1zuRckvIfBjLW4NpPTf1gyQMP1FjLeMcx/view?usp=sharing", 
        img: "https://i.ytimg.com/vi/qUFnMlaeD5w/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLArhPjSXRKk9iHfVdH5K-JVH_B8EQ" 
    }
];

const modList = document.getElementById("modList");
const uploadBtn = document.getElementById("uploadBtn");
const modUpload = document.getElementById("modUpload");
const fileLabel = document.getElementById("fileLabel");

// Atualiza o label ao selecionar arquivo
modUpload.addEventListener("change", () => {
    if(modUpload.files.length > 0){
        fileLabel.textContent = modUpload.files[0].name;
    } else {
        fileLabel.textContent = "Escolher Arquivo";
    }
});

// Renderiza os mods
function renderMods() {
    modList.innerHTML = "";
    modsOnline.forEach(mod => {
        const card = document.createElement("div");
        card.className = "mod-card";

        const img = document.createElement("img");
        img.src = mod.img || "https://via.placeholder.com/220x140?text=Mod";
        card.appendChild(img);

        const content = document.createElement("div");
        content.className = "mod-card-content";

        const title = document.createElement("h3");
        title.textContent = mod.name;
        content.appendChild(title);

        const btn = document.createElement("button");
        btn.textContent = "Download";
        btn.addEventListener("click", () => {
            window.open(mod.url, "_blank"); // abre o link do Drive em nova aba
        });
        content.appendChild(btn);

        card.appendChild(content);
        modList.appendChild(card);
    });
}

// Upload funcional (opcional: pode adicionar mods locais à lista, mas downloads Drive ainda funcionam)
uploadBtn.addEventListener("click", () => {
    const file = modUpload.files[0];
    if(!file){
        alert("Selecione um arquivo para upload!");
        return;
    }

    // Apenas adiciona à lista como referência (sem link real para Drive)
    modsOnline.push({ 
        name: file.name, 
        url: "#", 
        img: "https://via.placeholder.com/220x140?text=Mod"
    });

    renderMods();
    alert(`Arquivo "${file.name}" adicionado à lista!`);

    fileLabel.textContent = "Escolher Arquivo";
    modUpload.value = "";
});

// Inicializa a lista
renderMods();
