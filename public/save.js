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
  cells2
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

  const response = await fetch("/api/update-excel", {
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
        { address: "F12", value: date },
        { address: "F12", value: sourceOfMaterial },
        { address: "E15", value: Number(sampleNumber) },
        { address: "I13", value: selectClassification },
        { address: "E14", value: Number(stockpile) },
      ],
      cells2: cells2,
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
    listCells2()
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
