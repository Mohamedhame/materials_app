const cbrTable = document.getElementById("cbr-table");
const cbrTableMold = document.getElementById("cbr-table-mold");
const cbrIcon = document.getElementById("cbr-icon");
const cbrMoldIcon = document.getElementById("cbr-mold-icon");
const cbrBlowsIcon = document.getElementById("cbr-blows-icon");
const cbrDiv = document.querySelector(".cbr");
let cbrlist = [
  {
    penetration: 0,
    blows10: "",
    blows25: "",
    blows65: "",
    load10: "",
    stress10: "",
    load25: "",
    stress25: "",
    load65: "",
    stress65: "",
  },
  {
    penetration: 0.025,
    blows10: "",
    blows25: "",
    blows65: "",
    load10: "",
    stress10: "",
    load25: "",
    stress25: "",
    load65: "",
    stress65: "",
  },
  {
    penetration: 0.05,
    blows10: "",
    blows25: "",
    blows65: "",
    load10: "",
    stress10: "",
    load25: "",
    stress25: "",
    load65: "",
    stress65: "",
  },
  {
    penetration: 0.075,
    blows10: "",
    blows25: "",
    blows65: "",
    load10: "",
    stress10: "",
    load25: "",
    stress25: "",
    load65: "",
    stress65: "",
  },
  {
    penetration: 0.1,
    blows10: "",
    blows25: "",
    blows65: "",
    load10: "",
    stress10: "",
    load25: "",
    stress25: "",
    load65: "",
    stress65: "",
  },
  {
    penetration: 0.125,
    blows10: "",
    blows25: "",
    blows65: "",
    load10: "",
    stress10: "",
    load25: "",
    stress25: "",
    load65: "",
    stress65: "",
  },
  {
    penetration: 0.15,
    blows10: "",
    blows25: "",
    blows65: "",
    load10: "",
    stress10: "",
    load25: "",
    stress25: "",
    load65: "",
    stress65: "",
  },
  {
    penetration: 0.175,
    blows10: "",
    blows25: "",
    blows65: "",
    load10: "",
    stress10: "",
    load25: "",
    stress25: "",
    load65: "",
    stress65: "",
  },
  {
    penetration: 0.2,
    blows10: "",
    blows25: "",
    blows65: "",
    load10: "",
    stress10: "",
    load25: "",
    stress25: "",
    load65: "",
    stress65: "",
  },
  {
    penetration: 0.3,
    blows10: "",
    blows25: "",
    blows65: "",
    load10: "",
    stress10: "",
    load25: "",
    stress25: "",
    load65: "",
    stress65: "",
  },
  {
    penetration: 0.4,
    blows10: "",
    blows25: "",
    blows65: "",
    load10: "",
    stress10: "",
    load25: "",
    stress25: "",
    load65: "",
    stress65: "",
  },
];

let cbrMold = [
  { id: "swell", label: "الانتفاش" },
  { id: "emptyMold", label: "وزن القالب فارغ" },
  { id: "volumMold", label: "حجم القالب" },
  { id: "samplePlusMold", label: "وزن القالب بالعينة" },
  { id: "wetDensity", label: "الكثافة الرطبة ( جم / سم 3)" },
  { id: "emptyBowl", label: "وزن الجفنة ( جم )" },
  { id: "wetSamplePlusBowl", label: "وزن الجفنة + العينة الرطبة (جم)" },
  { id: "drySamplePlusBowl", label: "وزن الجفنة + العينة الجافة ( جم )" },
  { id: "waterContent", label: "محتوي الماء" },
  { id: "dryDensity", label: "الكثافة الجافة ( جم / سم3 )" },
  { id: "proctorDensity", label: "كثافة بروكتور ( جم / سم3 )" },
  { id: "waterPercent", label: "نسبة المياة الأصولية ( % )" },
  { id: "compactPercent", label: "نسبة الدمك ( % )" },
];

let obj = {
  blows10: "",
  blows25: "",
  blows65: "",
};

let objectWetSample = obj;
let objectWaterWeight = obj;
let objectDrySample = obj;
let objectHumidity = obj;
let objWetDensity = obj;
let objdryDensity = obj;

cbrIcon.onclick = () => {
  if (cbrDiv.classList.contains("none")) {
    cbrDiv.classList.remove("none");
  } else {
    cbrDiv.classList.add("none");
  }
};

cbrMoldIcon.onclick = () => {
  if (cbrTableMold.classList.contains("none")) {
    cbrTableMold.classList.remove("none");
  } else {
    cbrTableMold.classList.add("none");
  }
};

cbrBlowsIcon.onclick = () => {
  if (cbrTable.classList.contains("none")) {
    cbrTable.classList.remove("none");
  } else {
    cbrTable.classList.add("none");
  }
};

function createRow(text, id1, id2, id3, text2, ids) {
  const tr = document.createElement("tr");
  //========= Penetration ======
  tr.appendChild(createLP(text));
  // ===== Blows10 =====
  tr.appendChild(createInput(id1, text2, ids));
  // ===== Blows25 =====
  tr.appendChild(createInput(id2, text2, ids));
  // ===== Blows65 =====
  tr.appendChild(createInput(id3, text2, ids));

  return tr;
}

function createLP(text) {
  const th = document.createElement("th");
  th.innerHTML = text;
  return th;
}

function localTransition(input, table) {
  for (let index = 0; index < 4; index++) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const allInput = Array.from(
          table.querySelectorAll(`td:nth-child(${index + 2}) input`)
        );
        const currentIndex = allInput.indexOf(e.target);
        if (currentIndex >= 0 && currentIndex < allInput.length - 1) {
          allInput[currentIndex + 1].focus();
        }
      }
    });
  }
}

function createInput(id, text, ids) {
  const td = document.createElement("td");
  const input = document.createElement("input");
  input.type = "number";
  input.id = id;
  td.appendChild(input);
  localTransition(input, cbrTableMold);
  localTransition(input, cbrTable);
  addTooltip(input, text, ids);

  return td;
}

function createTable() {
  cbrlist.forEach((item, index) => {
    cbrTable.appendChild(
      createRow(
        item.penetration,
        `blows10_${index}`,
        `blows25_${index}`,
        `blows65_${index}`
      )
    );
  });
  cbrMold.forEach((item) => {
    if (item.id === "wetDensity") {
      cbrTableMold.appendChild(
        createRow(
          item.label,
          `blows10-mold${item.id}`,
          `blows25-mold${item.id}`,
          `blows65-mold${item.id}`,
          cbrWetDensityText
        )
      );
    } else if (item.id === "waterContent") {
      cbrTableMold.appendChild(
        createRow(
          item.label,
          `blows10-mold${item.id}`,
          `blows25-mold${item.id}`,
          `blows65-mold${item.id}`,
          cbrHumitidyText
        )
      );
    } else {
      cbrTableMold.appendChild(
        createRow(
          item.label,
          `blows10-mold${item.id}`,
          `blows25-mold${item.id}`,
          `blows65-mold${item.id}`
        )
      );
    }
  });
  insertData();
  document.getElementById(`blows10-moldswell`).value = random().toFixed(3);
  document.getElementById(`blows25-moldswell`).value = random().toFixed(3);
  document.getElementById(`blows65-moldswell`).value = random().toFixed(3);
}

function insertData() {
  cbrlist.forEach((item, index) => {
    const blows10 = document.getElementById(`blows10_${index}`);
    const blows25 = document.getElementById(`blows25_${index}`);
    const blows65 = document.getElementById(`blows65_${index}`);
    blows10.oninput = () => {
      item.blows10 = blows10.value;
      item.load10 = calculateLoad(item.blows10);
      item.stress10 = calculateStress(item.load10);
    };
    //================
    blows25.oninput = () => {
      item.blows25 = blows25.value;
      item.load25 = calculateLoad(item.blows25);
      item.stress25 = calculateStress(item.load25);
    };
    //================
    blows65.oninput = () => {
      item.blows65 = blows65.value;
      item.load65 = calculateLoad(item.blows65);
      item.stress65 = calculateStress(item.load65);
    };
    //================
  });

  cbrMold.forEach((item) => {
    handleInputs(
      "blows10",
      objectWetSample.blows10,
      objectWaterWeight.blows10,
      objectDrySample.blows10,
      objWetDensity.blows10,
      objdryDensity.blows10
    );
    handleInputs(
      "blows25",
      objectWetSample.blows25,
      objectWaterWeight.blows25,
      objectDrySample.blows25,
      objWetDensity.blows25,
      objdryDensity.blows25
    );
    handleInputs(
      "blows65",
      objectWetSample.blows65,
      objectWaterWeight.blows65,
      objectDrySample.blows65,
      objWetDensity.blows25,
      objdryDensity.blows65
    );
  });
}

//======== Inputs =====
function handleInputs(
  blows,
  wetSample,
  water,
  drySample,
  wetDensityPar,
  dryDensityPar
) {
  //============== Get IDS ===============
  //*********  Mold
  const emptyMoldWeight = document.getElementById(`${blows}-moldemptyMold`);
  const moldPlusWetSample = document.getElementById(
    `${blows}-moldsamplePlusMold`
  );
  const volumMold = document.getElementById(`${blows}-moldvolumMold`);
  const wetDensity = document.getElementById(`${blows}-moldwetDensity`);
  //*********  Bowl
  const wetSamplePlusBowl = document.getElementById(
    `${blows}-moldwetSamplePlusBowl`
  );
  const drySamplePlusBowl = document.getElementById(
    `${blows}-molddrySamplePlusBowl`
  );
  const emptyBowl = document.getElementById(`${blows}-moldemptyBowl`);
  const waterContent = document.getElementById(`${blows}-moldwaterContent`);
  const dryDensity = document.getElementById(`${blows}-molddryDensity`);
  const proctorDensity = document.getElementById(`${blows}-moldproctorDensity`);
  const waterPercent = document.getElementById(`${blows}-moldwaterPercent`);
  const compactPercent = document.getElementById(`${blows}-moldcompactPercent`);
  //============== End Get IDS ===============

  function emptyFeilds() {
    wetSample = "";
    wetDensityPar = "";
    wetDensity.value = wetDensityPar;
    dryDensityPar = "";
    dryDensity.value = dryDensityPar;
    compactPercent.value = "";
  }

  // ================ Mold ==========
  moldPlusWetSample.oninput = () => {
    insertPoctor(proctorDensity, waterPercent);
    if (emptyMoldWeight.value) {
      wetSample = calculateWetSample(
        moldPlusWetSample.value,
        emptyMoldWeight.value
      );
    }
    if (volumMold.value) {
      wetDensityPar = calculateWetDensity(wetSample, volumMold.value);
      wetDensity.value = wetDensityPar.toFixed(3);
      if (waterContent.value) {
        dryDensityPar = calculateDryDensity(wetDensityPar, waterContent.value);
        dryDensity.value = dryDensityPar.toFixed(3);
      }
    }
    if (dryDensity.value && proctorDensity.value) {
      compactPercent.value = calculateCompact(
        dryDensity.value,
        proctorDensity.value
      );
    }

    if (!moldPlusWetSample.value) {
      emptyFeilds();
    }
  };

  emptyMoldWeight.oninput = () => {
    insertPoctor(proctorDensity, waterPercent);
    if (!emptyMoldWeight.value) {
      emptyFeilds();
      return;
    }
    if (moldPlusWetSample.value) {
      wetSample = calculateWetSample(
        moldPlusWetSample.value,
        emptyMoldWeight.value
      );
      if (volumMold.value) {
        wetDensityPar = calculateWetDensity(wetSample, volumMold.value);
        wetDensity.value = wetDensityPar.toFixed(3);
        if (waterContent.value) {
          dryDensityPar = calculateDryDensity(
            wetDensityPar,
            waterContent.value
          );
          dryDensity.value = dryDensityPar.toFixed(3);
        }
      }
    }
    if (dryDensity.value && proctorDensity.value) {
      compactPercent.value = calculateCompact(
        dryDensity.value,
        proctorDensity.value
      );
    }
  };

  volumMold.oninput = () => {
    insertPoctor(proctorDensity, waterPercent);
    if (!volumMold.value) {
      emptyFeilds();
      return;
    }

    if (emptyMoldWeight.value && moldPlusWetSample.value) {
      wetSample = calculateWetSample(
        moldPlusWetSample.value,
        emptyMoldWeight.value
      );
      wetDensityPar = calculateWetDensity(wetSample, volumMold.value);
      wetDensity.value = wetDensityPar.toFixed(3);
      if (waterContent.value) {
        dryDensityPar = calculateDryDensity(wetDensityPar, waterContent.value);
        dryDensity.value = dryDensityPar.toFixed(3);
      }
    }
    if (dryDensity.value && proctorDensity.value) {
      compactPercent.value = calculateCompact(
        dryDensity.value,
        proctorDensity.value
      );
    }
  };

  wetDensity.oninput = () => {
    insertPoctor(proctorDensity, waterPercent);
    if (!wetDensity.value) {
      dryDensity.value = "";
      return;
    }
    wetDensityPar = wetDensity.value;
    if (dryDensity.value && proctorDensity.value) {
      compactPercent.value = calculateCompact(
        dryDensity.value,
        proctorDensity.value
      );
    }
    if (waterContent.value) {
      dryDensityPar = calculateDryDensity(wetDensityPar, waterContent.value);
      dryDensity.value = dryDensityPar.toFixed(3);
    }
  };

  //============ Bowls ================

  wetSamplePlusBowl.oninput = () => {
    insertPoctor(proctorDensity, waterPercent);
    if (drySamplePlusBowl.value) {
      water = calculateWater(wetSamplePlusBowl.value, drySamplePlusBowl.value);
      if (emptyBowl.value) {
        drySample = calculateDrySample(
          drySamplePlusBowl.value,
          emptyBowl.value
        );
        waterContent.value = calculateHumidity(water, drySample).toFixed(2);
        if (wetDensity.value) {
          dryDensityPar = calculateDryDensity(
            wetDensityPar,
            waterContent.value
          );
          dryDensity.value = dryDensityPar.toFixed(3);
        }
      }
    }
    if (dryDensity.value && proctorDensity.value) {
      compactPercent.value = calculateCompact(
        dryDensity.value,
        proctorDensity.value
      );
    }
  };

  drySamplePlusBowl.oninput = () => {
    insertPoctor(proctorDensity, waterPercent);
    if (wetSamplePlusBowl.value) {
      water = calculateWater(wetSamplePlusBowl.value, drySamplePlusBowl.value);

      if (emptyBowl.value) {
        drySample = calculateDrySample(
          drySamplePlusBowl.value,
          emptyBowl.value
        );
        waterContent.value = calculateHumidity(water, drySample).toFixed(2);
        if (wetDensity.value) {
          dryDensityPar = calculateDryDensity(
            wetDensityPar,
            waterContent.value
          );
          dryDensity.value = dryDensityPar.toFixed(3);
        }
      }
    }
    if (dryDensity.value && proctorDensity.value) {
      compactPercent.value = calculateCompact(
        dryDensity.value,
        proctorDensity.value
      );
    }
  };

  emptyBowl.oninput = () => {
    insertPoctor(proctorDensity, waterPercent);

    if (!emptyBowl.value) {
      water = "";
      waterContent.value = "";
      dryDensityPar = "";
      dryDensity.value = dryDensityPar;
      return;
    }

    if (wetSamplePlusBowl.value && drySamplePlusBowl.value) {
      water = calculateWater(wetSamplePlusBowl.value, drySamplePlusBowl.value);
      drySample = calculateDrySample(drySamplePlusBowl.value, emptyBowl.value);
      waterContent.value = calculateHumidity(water, drySample).toFixed(2);
      if (wetDensity.value) {
        dryDensityPar = calculateDryDensity(wetDensityPar, waterContent.value);
        dryDensity.value = dryDensityPar.toFixed(3);
      }
    }
    if (dryDensity.value && proctorDensity.value) {
      compactPercent.value = calculateCompact(
        dryDensity.value,
        proctorDensity.value
      );
    }
  };

  waterContent.oninput = () => {
    insertPoctor(proctorDensity, waterPercent);
    water = waterContent.value;
    if (!waterContent.value) {
      dryDensity.value = "";
      compactPercent.value = "";
      return;
    }

    if (wetDensity.value) {
      dryDensityPar = calculateDryDensity(wetDensityPar, waterContent.value);
      dryDensity.value = dryDensityPar.toFixed(3);
    }

    if (dryDensity.value && proctorDensity.value) {
      compactPercent.value = calculateCompact(
        dryDensity.value,
        proctorDensity.value
      );
    }
  };

  dryDensity.oninput = () => {
    insertPoctor(proctorDensity, waterPercent);
    dryDensityPar = dryDensity.value;
    if (proctorDensity.value) {
      compactPercent.value = calculateCompact(
        dryDensity.value,
        proctorDensity.value
      );
    }
  };

  proctorDensity.oninput = () => {
    if (!proctorDensity.value) {
      compactPercent.value = "";
      return;
    }

    if (dryDensity.value) {
      compactPercent.value = calculateCompact(
        dryDensity.value,
        proctorDensity.value
      ).toFixed(2);
    }
  };
}

function insertPoctor(proctorDensity, waterPercent) {
  if (MDD) {
    proctorDensity.value = MDD;
  }
  if (OMC) {
    waterPercent.value = OMC;
  }
}

//==================
function calculateLoad(readMeter) {
  const constant = 405.05;
  const load = (constant * Number(readMeter || 0)) / 10000;
  return load;
}

//=============
function calculateStress(load) {
  const constant = 223.21;
  const stress = (Number(load) * constant) / 3;
  return stress;
}

function CBRAt01InPenetration() {
  const stress10 = cbrlist.find((item) => item.penetration === 0.1).stress10;
  const stress25 = cbrlist.find((item) => item.penetration === 0.1).stress25;
  const stress65 = cbrlist.find((item) => item.penetration === 0.1).stress65;
  const cbe10 = (Number(stress10 || 0) * 100) / 1000;
  const cbe25 = (Number(stress25 || 0) * 100) / 1000;
  const cbe65 = (Number(stress65 || 0) * 100) / 1000;

  return { cbe10: cbe10, cbe25: cbe25, cbe65: cbe65 };
}

function CBRAt02InPenetration() {
  const stress10 = cbrlist.find((item) => item.penetration === 0.2).stress10;
  const stress25 = cbrlist.find((item) => item.penetration === 0.2).stress25;
  const stress65 = cbrlist.find((item) => item.penetration === 0.2).stress65;
  const cbe10 = (Number(stress10 || 0) * 100) / 1500;
  const cbe25 = (Number(stress25 || 0) * 100) / 1500;
  const cbe65 = (Number(stress65 || 0) * 100) / 1500;

  return { cbe10: cbe10, cbe25: cbe25, cbe65: cbe65 };
}

function random() {
  return Math.random() * (0.9 - 0);
}

//وزن العينة رطبة ( جم )
function calculateWetSample(moldPlusWetSample, emptyMoldWeight) {
  // وزن العينة رطبة = (وزن القالب بالعينة رطبة) - وزن القالب فارغ
  let cbrWetSampleWeight = Number(moldPlusWetSample) - Number(emptyMoldWeight);
  return cbrWetSampleWeight;
}

//الكثافة الرطبة ( جم / سم 3)
function calculateWetDensity(cbrWetSampleWeight, cbrVolumMold) {
  // الكثافة الرطبة  = وزن العينة رطبة / حجم القالب
  let cbrWetDensity = Number(cbrWetSampleWeight) / Number(cbrVolumMold);
  return cbrWetDensity;
}

//الكثافة الجافة ( جم / سم3 )
function calculateDryDensity(wetDensity, humitity) {
  // الكثافة الجافة  = (الكثافة الرطبة) /((1+نسبة الرطوبة)/100);
  let dryDensity = Number(wetDensity) / (1 + humitity / 100);
  return dryDensity;
}

// وزن الماء ( جم )
function calculateWater(bowlWetSample, bowlDrySample) {
  // وزن الماء = وزن الحفنة بالعينة رطبة - وزن الجفنة بالعينة جافة
  let waterWeight = Number(bowlWetSample) - Number(bowlDrySample);
  return waterWeight;
}

//وزن العينة الجافة ( جم )
function calculateDrySample(bowlDrySample, emptyBowlWeight) {
  // وزن العينة جافة  = وزن الجفنة بالعينة جافة - وزن الحفنة فارغة
  let drySample = Number(bowlDrySample) - Number(emptyBowlWeight);
  return drySample;
}

// حساب نسبة الرطوبة
function calculateHumidity(weightWater, dryDensity) {
  // نسبة الرطوبة = وزن الماء / وزن العينة جافة *100
  let humitity = (Number(weightWater) / Number(dryDensity)) * 100;
  return humitity;
}

// حساب نسبة الدمك
function calculateCompact(dryDensity, proctor) {
  // نسبة الدمك = الكثافة الرطبة / كثافة البركتور *100
  let compact = (Number(dryDensity) / Number(proctor || 1)) * 100;
  return compact.toFixed(3);
}

createTable();
