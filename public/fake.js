const divider3 = document.getElementById("divider3");
const weightSampleFake = document.getElementById("weightSampleFake");
const numberSampleFake = document.getElementById("numberSampleFake");
const tableFake = document.getElementById("tableFake");
//===========
const testProctorFake = document.getElementById("test-proctor-fake");
const waterContentFake = document.getElementById("watercontent-fake");
const dryWeightFake = document.getElementById("dryweight-fake");
//===========
const liquidfrom = document.getElementById("liquidfrom");
const liquidto = document.getElementById("liquidto");
const plasticityfrom = document.getElementById("plasticityfrom");
const plasticityto = document.getElementById("plasticityto");
//=============
const weightWetSampleFake = document.getElementById("weightWetSampleFake");
const volumMoldFake = document.getElementById("volumMoldFake");
const area2 = document.getElementById("area2");

/*=================================
        Gradient
=================================*/
area2.value = soilClassification("Silty Sand with Gravel (SM)");

classification.onchange = () => {
  if (classification.value === "Fill/SM") {
    area2.value = soilClassification("Silty Sand with Gravel (SM)");
  }else if (classification.value === "Fill/SC") {
    area2.value = soilClassification("Clayey sand with gravel (SC)");
  }
};

let result;

let listFake = [
  {
    no: '4"',
    mm: "100",
    reserved: "",
    passing: "",
    from: "",
    to: "",
  },
  {
    no: '3"',
    mm: "75",
    reserved: "",
    passing: "",
    from: "",
    to: "",
  },
  {
    no: '2.5"',
    mm: "63",
    reserved: "",
    passing: "",
    from: "",
    to: "",
  },
  {
    no: '2"',
    mm: "50",
    reserved: "",
    passing: "",
    from: "",
    to: "",
  },
  {
    no: '1.5"',
    mm: "38",
    reserved: "",
    passing: "",
    from: "",
    to: "",
  },
  {
    no: '1"',
    mm: "25",
    reserved: "",
    passing: "",
    from: "",
    to: "",
  },
  {
    no: '3/4"',
    mm: "19",
    reserved: "",
    passing: "",
    from: "",
    to: "",
  },
  {
    no: '3/8"',
    mm: "9",
    reserved: "",
    passing: "",
    from: "",
    to: "",
  },
  {
    no: "4",
    mm: "4.75",
    reserved: "",
    passing: "",
    from: "",
    to: "",
  },

  {
    no: "10",
    mm: "2",
    reserved: "",
    passing: "",
    from: "",
    to: "",
  },
  {
    no: "40",
    mm: "0.425",
    reserved: "",
    passing: "",
    from: "",
    to: "",
  },
  {
    no: "200",
    mm: "0.075",
    reserved: "",
    passing: "",
    from: "",
    to: "",
  },
];

function createRowFake(item) {
  const tr = document.createElement("tr");
  // td 1
  const tdSievs = document.createElement("td");
  const spacer = document.createElement("div");
  const spanNo = document.createElement("span");
  const spanMm = document.createElement("span");
  spanNo.innerHTML = item.no;
  spanMm.innerHTML = item.mm;
  spacer.className = "spacer";
  spacer.appendChild(spanNo);
  spacer.appendChild(spanMm);
  tdSievs.appendChild(spacer);
  //====== End td 1=========

  // ======= td 2 (from)========
  const tdFrom = document.createElement("td");
  const fromInput = document.createElement("input");
  fromInput.type = "number";
  fromInput.value = item.from;
  fromInput.id = `from${item.no}`;
  fromInput.addEventListener("input", () => {
    item.from = fromInput.value;
  });
  tdFrom.appendChild(fromInput);
  // ======= End td 2 (from)========

  // ======= td 3 (to)========
  const tdto = document.createElement("td");
  const toInput = document.createElement("input");
  toInput.type = "number";
  toInput.value = item.to;
  toInput.id = `to${item.to}`;
  toInput.addEventListener("input", () => {
    item.to = toInput.value;
  });
  tdto.appendChild(toInput);
  // ======= End td 3 (to)========

  tr.appendChild(tdSievs);
  tr.appendChild(tdFrom);
  tr.appendChild(tdto);

  tableFake.appendChild(tr);
}

function createTableFake() {
  listFake.forEach((item) => createRowFake(item));
}

function randomData() {
  for (let i = 0; i < listFake.length; i++) {
    const item = listFake[i];
    let from = Number(item.from || 100);
    let to = Number(item.to || 100);
    let min = Math.min(from, to);
    let max = Math.max(from, to);

    if (i === 0) {
      item.passing = getNumber(min, max);
    } else {
      const prev = listFake[i - 1].passing;
      let upperLimit = Math.min(max, prev - 0.1);
      let lowerLimit = min;

      if (upperLimit < lowerLimit) {
        upperLimit = lowerLimit;
      }

      item.passing = getNumber(lowerLimit, upperLimit);
    }

    item.passing = Number(item.passing.toFixed(3));
  }

  if (weightSampleFake.value) {
    let total = Number(weightSampleFake.value);

    for (const item of listFake) {
      let passing = (Number(item.passing) / 100) * total;
      let reserved = total - passing;

      item.reserved = reserved;

      if (item.mm === "4.75") {
        break;
      }
    }
  }
}

createTableFake();

/*=================================
        Proctor
=================================*/
let templetFake = {
  no: 0,
  densityWet: "",
  waterContent: ["", ""],
  densityDry: ["", ""],
};

let listTrialFake = [];

// إنشاء العناصر الابتدائية (4 صفوف افتراضيًا)
function initTrials(count = 4) {
  listTrialFake = [];
  for (let i = 0; i < count; i++) {
    const newItem = JSON.parse(JSON.stringify(templetFake));
    newItem.no = i + 1;
    listTrialFake.push(newItem);
    createTrialRow(newItem);
  }
}

// ===============================
// 🧱 إنشاء عمود واحد (UI)
// ===============================
function createTrialRow(newItem) {
  testProctorFake.appendChild(createTh2("من", "الي"));
  waterContentFake.appendChild(
    create2td(
      `waterContentFake${newItem.no}_1`,
      `waterContentFake${newItem.no}_2`
    )
  );

  dryWeightFake.appendChild(
    create2td(`dryWeightFake${newItem.no}_1`, `dryWeightFake${newItem.no}_2`)
  );

  inputDryWeight(newItem, 1);
  inputDryWeight(newItem, 2);
}

function inputDryWeight(newItem, num) {
  const dryWeightFake = document.getElementById(
    `dryWeightFake${newItem.no}_${num}`
  );

  const waterContentFake = document.getElementById(
    `waterContentFake${newItem.no}_${num}`
  );

  dryWeightFake.oninput = () => {
    newItem.densityDry[num - 1] = dryWeightFake.value;
  };
  waterContentFake.oninput = () => {
    newItem.waterContent[num - 1] = waterContentFake.value;
  };
}

function calcDryDensit() {
  let moistureContent_w = [];
  let dryDensity_yd = [];
  let wetUnitWeigh = [];
  let dataAll = [];
  listTrialFake.forEach((item) => {
    const randomWater = getNumber(
      Number(item.waterContent[0]),
      Number(item.waterContent[1])
    );
    moistureContent_w.push(randomWater);
    //==============
    const randomDensity = getNumber(
      Number(item.densityDry[0]),
      Number(item.densityDry[1])
    );
    dryDensity_yd.push(randomDensity);
    wetUnitWeigh.push(calcWetUnitWeigh(randomDensity, randomWater));
    item.densityWet = calcWetUnitWeigh(randomDensity, randomWater);
    let oneRow = {
      moistureContent_w: randomWater,
      dryDensity_yd: randomDensity,
      wetUnitWeigh: calcWetUnitWeigh(randomDensity, randomWater),
    };
    dataAll.push(oneRow);
  });
  result = calculator(moistureContent_w, dryDensity_yd);

  return dataAll;
}

function saveFake() {
  let num = Number(numberSampleFake.value || 1);
  const numberSample = document.getElementById("numberSample");
  let numberOfSample = Number(numberSample.value || 1);
  const sourceOfMaterial = document.getElementById("source");
  const selectClassification = document.getElementById("classification");
  const stockpile = document.getElementById("stockpile");
  for (let index = 0; index < num; index++) {
    randomData();
    //==============
    let llFrom = liquidfrom.value;
    let llTo = liquidto.value;
    let liquitLimit;
    //============
    if (llFrom && llTo) {
      liquitLimit = getNumber(Number(llFrom), Number(llTo));
    }
    //============

    let piFrom = plasticityfrom.value;
    let piTo = plasticityto.value;
    let plastcityIndex;

    if (piFrom && piTo) {
      plastcityIndex = getNumber(Number(piFrom), Number(piTo));
    }

    //============
    let proctorExcel = calcDryDensit();
    let cells2 = [
      { address: "E17", value: Number(proctorExcel[0].wetUnitWeigh) },
      { address: "F17", value: Number(proctorExcel[1].wetUnitWeigh) },
      { address: "G17", value: Number(proctorExcel[2].wetUnitWeigh) },
      { address: "H17", value: Number(proctorExcel[3].wetUnitWeigh) },
      //======= water ============
      { address: "E18", value: Number(proctorExcel[0].moistureContent_w) },
      { address: "F18", value: Number(proctorExcel[1].moistureContent_w) },
      { address: "G18", value: Number(proctorExcel[2].moistureContent_w) },
      { address: "H18", value: Number(proctorExcel[3].moistureContent_w) },
      //=====================
      { address: "F36", value: result.MDD },
      { address: "F37", value: result.OMC },
    ];

    if (proctorExcel.length === 5) {
      cells2.push(
        {
          address: "I17",
          value: Number(proctorExcel[4].wetUnitWeigh),
        },
        {
          address: "I18",
          value: Number(proctorExcel[4].moistureContent_w),
        }
      );
    }

    if (cells2.length === 0) {
      cells2 = [];
    }

    sendData(
      liquitLimit,
      plastcityIndex,
      listFake,
      area2,
      date.value,
      sourceOfMaterial.value,
      `${numberOfSample + index}`,
      selectClassification.value,
      stockpile.value,
      cells2
    );
  }
}

function calcWetUnitWeigh(ddensity, wContent) {
  const gamma_d = Number(ddensity);
  const w = Number(wContent);

  if (isNaN(gamma_d) || isNaN(w) || gamma_d <= 0) {
    throw new Error(
      "يجب إدخال قيم رقمية صحيحة لكل من الكثافة الجافة ونسبة الرطوبة"
    );
  }
  const wetUnitWeight = gamma_d * (1 + w / 100);

  return wetUnitWeight;
}

function addColFake() {
  if (listTrialFake.length >= 5) return;

  const newNo = listTrialFake.length + 1;
  const newItem = JSON.parse(JSON.stringify(templetFake));
  newItem.no = newNo;
  listTrialFake.push(newItem);
  createTrialRow(newItem);
}

function getNumber(min, max) {
  if (isNaN(min) || isNaN(max) || min === max) return min;
  return Math.random() * (max - min) + min;
}

initTrials();
