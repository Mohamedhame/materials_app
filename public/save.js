async function sendData(
  llValue,
  liValue,
  sieves,
  textValue,
  date,
  sourceOfMaterial,
  sampleNumber,
  selectClassification,
  stockpile,
  cells2,
  blows10,
  blows25,
  blows65
) {
  //=== liquid limit and plastcity index
  let liquidLimit = llValue;
  if (!llValue) {
    liquidLimit = "N.P";
  }
  let plasticLimit = liValue;
  if (!liValue) {
    plasticLimit = "N.P";
  }
  let indexLimt = "N.P";
  if (liValue && llValue) {
    indexLimt = Number(llValue) - Number(liValue);
  }

  const response = await fetch("/api/report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cells: [
        { address: "E18", value: Number(sieves[0].passing) },
        { address: "F18", value: Number(sieves[1].passing) },
        { address: "G18", value: Number(sieves[2].passing) },
        { address: "H18", value: Number(sieves[3].passing) },
        { address: "I18", value: Number(sieves[4].passing) },
        { address: "J18", value: Number(sieves[5].passing) },
        { address: "K18", value: Number(sieves[6].passing) },
        { address: "L18", value: Number(sieves[7].passing) },
        { address: "M18", value: Number(sieves[8].passing) },
        { address: "N18", value: Number(sieves[9].passing) },
        { address: "O18", value: Number(sieves[10].passing) },
        { address: "P18", value: Number(sieves[11].passing) },
        { address: "B36", value: textValue },
        { address: "P13", value: liquidLimit },
        { address: "P14", value: indexLimt },
        { address: "P15", value: plasticLimit },
        { address: "F11", value: date },
        { address: "F12", value: sourceOfMaterial },
        { address: "E15", value: Number(sampleNumber) },
        { address: "I13", value: selectClassification },
        { address: "E14", value: Number(stockpile) },
      ],
      cells2: cells2,
      blows10Cell: blows10,
      blows25Cell: blows25,
      blows65Cell: blows65,
    }),
  });

  if (!response.ok) {
    console.error("Server error:", await response.text());
    return;
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${sampleNumber ? `${sampleNumber}.xlsx` : "null.xlsx"}`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}

function saveData() {
  const llValue = lL.value;
  const liValue = pI.value;
  let sieves = [...list, ...listFine];
  const textValue = area.value;
  const sourceOfMaterial = document.getElementById("source");
  const numberSample = document.getElementById("numberSample");
  const selectClassification = document.getElementById("classification");
  const stockpile = document.getElementById("stockpile");

  sendData(
    llValue,
    liValue,
    sieves,
    textValue,
    date.value,
    sourceOfMaterial.value,
    numberSample.value,
    selectClassification.value,
    stockpile.value,
    listCells2(),
    blows10Cell(),
    blows25Cell(),
    blows65Cell()
  );
}

function listCells2() {
  let cells2;
  if (excelCells == listTrial) {
    cells2 = [
      { address: "E17", value: Number(excelCells[0].wetDenisty) },
      { address: "F17", value: Number(excelCells[1].wetDenisty) },
      { address: "G17", value: Number(excelCells[2].wetDenisty) },
      { address: "H17", value: Number(excelCells[3].wetDenisty) },
      //======= water ============
      { address: "E18", value: Number(excelCells[0].avrghumitidy) },
      { address: "F18", value: Number(excelCells[1].avrghumitidy) },
      { address: "G18", value: Number(excelCells[2].avrghumitidy) },
      { address: "H18", value: Number(excelCells[3].avrghumitidy) },
      //=====================
      { address: "F36", value: MDD },
      { address: "F37", value: OMC },
    ];
  } else {
    cells2 = [
      { address: "E17", value: Number(excelCells[0].densityWet) },
      { address: "F17", value: Number(excelCells[1].densityWet) },
      { address: "G17", value: Number(excelCells[2].densityWet) },
      { address: "H17", value: Number(excelCells[3].densityWet) },
      //======= water ============
      { address: "E18", value: Number(excelCells[0].avrghumitidy) },
      { address: "F18", value: Number(excelCells[1].avrghumitidy) },
      { address: "G18", value: Number(excelCells[2].avrghumitidy) },
      { address: "H18", value: Number(excelCells[3].avrghumitidy) },
      //=====================
      { address: "F36", value: MDD },
      { address: "F37", value: OMC },
    ];
  }

  if (excelCells.length === 5) {
    if (excelCells == listTrial) {
      cells2.push(
        {
          address: "I17",
          value: Number(excelCells[4].wetDenisty),
        },
        {
          address: "I18",
          value: Number(excelCells[4].avrghumitidy),
        }
      );
    } else {
      cells2.push(
        {
          address: "I17",
          value: Number(excelCells[4].densityWet),
        },
        {
          address: "I18",
          value: Number(excelCells[4].avrghumitidy),
        }
      );
    }
  }

  return cells2;
}
function blows10Cell() {
  let swell = document.getElementById(`blows10-moldswell`);
  let waterContent = document.getElementById(`blows10-moldwaterContent`);
  let dryDensity = document.getElementById(`blows10-molddryDensity`);
  let cell = [
    { address: "K19", value: Number(cbrlist[0].blows10) },
    { address: "K20", value: Number(cbrlist[1].blows10) },
    { address: "K21", value: Number(cbrlist[2].blows10) },
    { address: "K22", value: Number(cbrlist[3].blows10) },
    { address: "K23", value: Number(cbrlist[4].blows10) },
    { address: "K24", value: Number(cbrlist[5].blows10) },
    { address: "K25", value: Number(cbrlist[6].blows10) },
    { address: "K26", value: Number(cbrlist[7].blows10) },
    { address: "K27", value: Number(cbrlist[8].blows10) },
    { address: "K28", value: Number(cbrlist[9].blows10) },
    { address: "K29", value: Number(cbrlist[10].blows10) },
    { address: "I34", value: Number(swell.value) },
    { address: "E35", value: Number(waterContent.value) },
    { address: "I35", value: Number(dryDensity.value) },
  ];

  return cell;
}

function blows25Cell() {
  let swell = document.getElementById(`blows25-moldswell`);
  let waterContent = document.getElementById(`blows25-moldwaterContent`);
  let dryDensity = document.getElementById(`blows25-molddryDensity`);
  let cell = [
    { address: "K19", value: Number(cbrlist[0].blows25) },
    { address: "K20", value: Number(cbrlist[1].blows25) },
    { address: "K21", value: Number(cbrlist[2].blows25) },
    { address: "K22", value: Number(cbrlist[3].blows25) },
    { address: "K23", value: Number(cbrlist[4].blows25) },
    { address: "K24", value: Number(cbrlist[5].blows25) },
    { address: "K25", value: Number(cbrlist[6].blows25) },
    { address: "K26", value: Number(cbrlist[7].blows25) },
    { address: "K27", value: Number(cbrlist[8].blows25) },
    { address: "K28", value: Number(cbrlist[9].blows25) },
    { address: "K29", value: Number(cbrlist[10].blows25) },
    { address: "I34", value: Number(swell.value) },
    { address: "E35", value: Number(waterContent.value) },
    { address: "I35", value: Number(dryDensity.value) },
  ];

  return cell;
}

function blows65Cell() {
  let swell = document.getElementById(`blows65-moldswell`);
  let waterContent = document.getElementById(`blows65-moldwaterContent`);
  let dryDensity = document.getElementById(`blows65-molddryDensity`);
  let cell = [
    { address: "K19", value: Number(cbrlist[0].blows65) },
    { address: "K20", value: Number(cbrlist[1].blows25) },
    { address: "K21", value: Number(cbrlist[2].blows65) },
    { address: "K22", value: Number(cbrlist[3].blows65) },
    { address: "K23", value: Number(cbrlist[4].blows65) },
    { address: "K24", value: Number(cbrlist[5].blows65) },
    { address: "K25", value: Number(cbrlist[6].blows65) },
    { address: "K26", value: Number(cbrlist[7].blows65) },
    { address: "K27", value: Number(cbrlist[8].blows65) },
    { address: "K28", value: Number(cbrlist[9].blows65) },
    { address: "K29", value: Number(cbrlist[10].blows65) },
    { address: "I34", value: Number(swell.value) },
    { address: "E35", value: Number(waterContent.value) },
    { address: "I35", value: Number(dryDensity.value) },
  ];

  return cell;
}
