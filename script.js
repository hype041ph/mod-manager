// Lista de 10 mods com links do Google Drive (substitua os IDs pelos reais)
const modsOnline = [
    { name: "3 marias farm", url: "https://drive.google.com/file/d/1KcFQs4moduBMwPZI-HsT0m2f__n9E_uT/view?usp=sharing", img: "https://i.ytimg.com/vi/oTwzlE348fg/maxresdefault.jpg" },
    { name: "Scania P320 Roll_ON", 
        url: "https://drive.google.com/file/d/1zMsuu4w0jkxydoPO0KdVhV6tQrsv292v/view?usp=sharing", 
        img: "https://files.fs25.net/mods/2025/04/Scania-NTG-P320-Roll-On-1024x576.jpg" },
    { name: "Rancho Fundo", 
        url: "https://drive.google.com/file/d/1zuRckvIfBjLW4NpPTf1gyQMP1FjLeMcx/view?usp=sharing", 
        img: "https://i.ytimg.com/vi/qUFnMlaeD5w/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLArhPjSXRKk9iHfVdH5K-JVH_B8EQ" },
    { name: "Randon Rodotrem Basculante", url: "https://drive.google.com/file/d/1zRNj8awOFlHhtfyzbJuq9GYU4g0xkesy/view?usp=sharing", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi5sX_iLwmRhuPsgxq18fIlAx5ETDrR7-5ee6RpMwxQjzPudZD2s-YSGu8cipsCDKqBfe03TyxLCYlSP1CxVNKmJKONRy4g5oMeF6SZX_KEesHCc8pxTm-7HRv8zngJWWs5XzoSAhLoc3vcDMp0KUhEPrL9ssdBNuEbiNu9iT3HSq7HOT9EG_tohblf-xPa/w1200-h630-p-k-no-nu/screenshot5.jpg" },
    { name: "FS25_realGPS", url: "https://drive.google.com/file/d/1iOhkttvubiqTPMQ3HSbCCqFgHZzPOyn_/view?usp=sharing", img: "https://www.kingmods.net/uploads/fs25/mods/real-gps-mod-fs25-dPCap.jpg" },
    { name: "ToyotaHilux 22 Edit", url: "https://drive.google.com/file/d/1-hKErYMFYk0KOvvu1Bl2evrvC7U6sEPy/view?usp=sharing", img: "https://files.fs25.net/mods/2026/01/Toyota-Hilux-22-Edit-768x432.jpg" },
    { name: "Store Deliveries", url: "https://drive.google.com/file/d/1Dq1JHf7xODa8ef2rAxB--PwPRxhrmvVg/view?usp=sharing", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIB0qD5HCbCU28pApYbumh0fg0Z3bKzdlC6g&s" },
    { name: "ShedCowBarn", url: "https://drive.google.com/file/d/1aQcxlaabJgmJLBtwXSdxZdxcps3wtAWd/view?usp=sharing", img: "https://files.fs25.net/mods/2024/11/Shed-Cow-Barn-v1.02.webp" },
    { name: "ScreenshotMode", url: "https://drive.google.com/file/d/1VQyH3Flx1ZJ2wMZlTHaS2vztLaW4Sof1/view?usp=sharing", img: "https://files.fs25.net/mods/2025/06/Screenshot-Mode.jpg" },
    { name: "Realistic reFueling System", url: "https://drive.google.com/file/d/16C7PG9ERfDBt-KQ7TGZQi3BOdQRvXrEk/view?usp=sharing", img: "https://files.fs25.net/mods/2025/02/Realistic-refuel-times-v1.0.1.webp" }
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
            if(mod.url && mod.url !== "#"){
                window.open(mod.url, "_blank");
            } else {
                alert(`O mod "${mod.name}" não possui link de download.`);
            }
        });
        content.appendChild(btn);

        card.appendChild(content);
        modList.appendChild(card);
    });
}

// Upload funcional (adiciona como referência)
uploadBtn.addEventListener("click", () => {
    const file = modUpload.files[0];
    if(!file){
        alert("Selecione um arquivo para upload!");
        return;
    }

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
