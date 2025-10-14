const shorts = document.getElementById("shorts");
const shortsBtn = document.getElementById("shorts-btn");
const wetWeightShort = document.getElementById("wetweight-short");
const waterContentShort = document.getElementById("watercontent-short");
const dryWeightShort = document.getElementById("dryweight-short");
const rowInputProctor = document.getElementById("row-input-proctor");

let templetShorts = {
  no: 0,
  densityWet: "",
  avrghumitidy: "",
  drydenisity: "",
};

let listTrialShorts = [];

for (let i = 0; i < 4; i++) {
  const newItem = JSON.parse(JSON.stringify(templetShorts));
  newItem.no = i + 1;
  listTrialShorts.push(newItem);
}

function createTableShorts() {
  listTrialShorts.forEach((item) => {
    oneColShorts(item);
  });
}

function oneColShorts(newItem) {
  wetWeightShort.appendChild(createtd(`wetWeightShort${newItem.no}`));
  waterContentShort.appendChild(createtd(`waterContentShort${newItem.no}`));

  dryWeightShort.appendChild(
    createtd(`dryWeightShort${newItem.no}`, false, drydenisityShort, [
      `wetWeightShort${newItem.no}`,
      `waterContentShort${newItem.no}`,
    ])
  );

  const wetDenistyShort = document.getElementById(
    `wetWeightShort${newItem.no}`
  );
  const waterShort = document.getElementById(`waterContentShort${newItem.no}`);
  const dryShorts = document.getElementById(`dryWeightShort${newItem.no}`);

  wetDenistyShort.addEventListener("input", () => {
    newItem.densityWet = wetDenistyShort.value;
  });

  waterShort.addEventListener("input", () => {
    newItem.avrghumitidy = waterShort.value;
    if (wetDenistyShort.value) {
      newItem.drydenisity =
        Number(newItem.densityWet) / (1 + Number(newItem.avrghumitidy) / 100);
      dryShorts.value = newItem.drydenisity.toFixed(3);
      calcFinal("max-density-shorts", "water-percent-shorts", listTrialShorts);
    }
  });

  dryShorts.addEventListener("input", () => {
    newItem.drydenisity = dryShorts.value;
  });
}

function addColShorts() {
  if (listTrialShorts.length >= 5) {
    return;
  }
  const newNo = listTrialShorts.length + 1;
  const newItem = JSON.parse(JSON.stringify(templetShorts));
  newItem.no = newNo;
  listTrialShorts.push(newItem);
  oneColShorts(newItem);
}

function showHide() {
  if (proctor.classList.contains("none")) {
    proctor.classList.remove("none");
    shorts.classList.add("none");
    shortsBtn.innerHTML = "مختصر";
    rowInputProctor.style.display = "flex";
    excelCells = listTrial;
    
  } else {
    proctor.classList.add("none");
    shorts.classList.remove("none");
    shortsBtn.innerHTML = "الكامل";
    rowInputProctor.style.display = "none";
    excelCells = listTrialShorts;
  }
}

createTableShorts();
