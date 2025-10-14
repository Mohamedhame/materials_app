const proctor = document.getElementById("proctor");
const headTr = document.getElementById("headTr");
const weightMoldSample = document.getElementById("weightMoldSample");
const weightWetSample = document.getElementById("weightWetSample");
const wetDenisty = document.getElementById("wetDenisty");
const weightMold = document.getElementById("weightMold");
const volumMold = document.getElementById("volumMold");
const emptybowlWeight = document.getElementById("emptybowlWeight");
const bowlwetsample = document.getElementById("bowlwetsample");
const bowldrysample = document.getElementById("bowldrysample");
const weightwater = document.getElementById("weightwater");
const sampledry = document.getElementById("sampledry");
const humitidy = document.getElementById("humitidy");
const avrghumitidy = document.getElementById("avrghumitidy");
const drydenisity = document.getElementById("drydenisity");
const angleDown2 = document.getElementById("icon2");
const divider2 = document.getElementById("divider2");
const proctorTable = document.getElementById("proctor-table");
const td = document.querySelectorAll(".td");

let templet = {
  no: 0,
  totalWeight: "",
  wetSample: "",
  wetDenisty: "",
  emptybowlWeight: ["", ""],
  bowlwetsample: ["", ""],
  bowldrysample: ["", ""],
  weightwater: ["", ""],
  sampledry: ["", ""],
  humitidy: ["", ""],
  avrghumitidy: "",
  drydenisity: "",
};

let listTrial = [];
excelCells = listTrial;

for (let i = 0; i < 4; i++) {
  const newItem = JSON.parse(JSON.stringify(templet));
  newItem.no = i + 1;
  listTrial.push(newItem);
}

angleDown2.addEventListener("click", () => {
  if (angleDown2.classList.contains("fa-angle-down")) {
    angleDown2.classList.remove("fa-angle-down");
    angleDown2.classList.add("fa-angle-up");
    proctorTable.style.display = "";
  } else {
    angleDown2.classList.remove("fa-angle-up");
    angleDown2.classList.add("fa-angle-down");
    proctorTable.style.display = "none";
  }
});

weightMold.addEventListener("input", () => calcWeight("input"));
weightMold.addEventListener("change", () => calcWeight("change"));
//===================================================
volumMold.addEventListener("input", () => calcVolum("input"));
volumMold.addEventListener("change", () => calcVolum("change"));

let moistureContent_w = [];
let dryDensity_yd = [];

function addTooltip(element, text, ids) {
  if (!element || !text) return;

  element.setAttribute("title", text);

  element.addEventListener("mouseenter", () => {
    if (ids && Array.isArray(ids)) {
      ids.forEach((item) => {
        const el = document.getElementById(item);
        if (el) {
          el.classList.add("details");
        }
      });
    }
  });

  element.addEventListener("mouseleave", () => {
    if (ids && Array.isArray(ids)) {
      ids.forEach((item) => {
        const el = document.getElementById(item);
        if (el) {
          el.classList.remove("details");
        }
      });
    }
  });
}

function createTh(data) {
  const th = document.createElement("th");
  th.innerHTML = data;
  return th;
}

function createTh2(data1, data2) {
  const th = document.createElement("th");
  const spacer = document.createElement("div");
  spacer.classList.add("spacer");
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");
  //========================
  span1.style.display = "block";
  span2.style.display = "block";
  span1.style.width = "48%";
  span2.style.width = "48%";
  //=========================
  span1.innerHTML = data1;
  span2.innerHTML = data2;
  spacer.appendChild(span1);
  spacer.appendChild(span2);
  th.appendChild(spacer);
  return th;
}

function createtd(id, disabled, text, ids) {
  const td = document.createElement("td");
  const input = document.createElement("input");
  input.type = "number";
  input.id = id;
  input.disabled = disabled;
  input.step = "any";
  addTooltip(input, text, ids);
  td.appendChild(input);
  return td;
}

function create2td(id1, id2, disabled, text, ids1, ids2) {
  const td = document.createElement("td");

  const wrapper = document.createElement("div");
  wrapper.classList.add("input-pair");

  const input1 = document.createElement("input");
  const input2 = document.createElement("input");

  input1.classList.add("bowl");
  input2.classList.add("bowl");

  input1.type = "number";
  input2.type = "number";
  input1.disabled = disabled;
  input2.disabled = disabled;
  input1.step = "any";
  input2.step = "any";

  input1.id = id1;
  input2.id = id2;
  addTooltip(input1, text, ids1);
  addTooltip(input2, text, ids2);
  wrapper.appendChild(input1);
  wrapper.appendChild(input2);
  td.appendChild(wrapper);

  return td;
}

function createTable() {
  listTrial.forEach((item, index) => {
    oneCol(item, index);
  });
}
// ========== calc bowls ================
function calcWWater(item, num, bowlwet, wwater) {
  item.weightwater[num - 1] =
    Number(bowlwet.value) - Number(item.bowldrysample[num - 1]);
  wwater.value = item.weightwater[num - 1].toFixed(2);
}

function calcSdry(item, num, ebow, sdry) {
  item.sampledry[num - 1] = item.bowldrysample[num - 1] - Number(ebow.value);
  sdry.value = item.sampledry[num - 1].toFixed(2);
}

function calcHumidity(item, num, hum) {
  item.humitidy[num - 1] =
    (Number(item.weightwater[num - 1]) / Number(item.sampledry[num - 1])) * 100;
  hum.value = item.humitidy[num - 1].toFixed(2);
}

function calcBowldry(item, num, bowldry, bowlwet) {
  item.bowldrysample[num - 1] =
    Number(item.sampledry[num - 1] || 0) +
    Number(item.emptybowlWeight[num - 1] || 0);
  bowldry.value = item.bowldrysample[num - 1].toFixed(2);

  if (bowlwet) {
    bowldry.value =
      Number(item.bowlwetsample[num - 1]) -
      Number(item.weightwater[num - 1]).toFixed(2);
  }
}

function calcBowlwet(item, num, wwater, bowldry, ebow, bowlwet, sdry, hum) {
  if (wwater.value) {
    item.bowldrysample[num - 1] =
      Number(item.bowlwetsample[num - 1]) - Number(item.weightwater[num - 1]);
    bowldry.value = item.bowldrysample[num - 1].toFixed(2);
  }
  if (bowldry.value) {
    calcWWater(item, num, bowlwet, wwater);
    if (ebow.value) {
      calcSdry(item, num, ebow, sdry);
      calcHumidity(item, num, hum);
      calcAvargr(item);
    }
  }
}
// ========== End calc bowls ================
function handelBowl(item, num) {
  // وزن الجفنة فارغة
  const ebow = document.getElementById(`ebow${item.no}_${num}`);
  ebow.addEventListener("input", () => {
    item.emptybowlWeight[num - 1] = ebow.value;
  });
  //====================
  ebow.addEventListener("change", () => {
    if (!bowldry.value && sdry.value) {
      item.bowldrysample[num - 1] =
        Number(item.emptybowlWeight[num - 1]) + Number(item.sampledry[num - 1]);
      bowldry.value = item.bowldrysample[num - 1].toFixed(2);
    }
    if (bowldry.value) {
      if (bowlwet.value) {
        calcWWater(item, num, bowlwet, wwater);
      }
      calcSdry(item, num, ebow, sdry);
      calcHumidity(item, num, hum);
      calcBowldry(item, num, bowldry, bowlwet);
      calcAvargr(item);
      calcFinal("max-density", "water-percent", listTrial);
    }
  });

  // وزن الجفنة + العينة رطبة
  const bowlwet = document.getElementById(`bowlwet${item.no}_${num}`);
  bowlwet.addEventListener("input", () => {
    item.bowlwetsample[num - 1] = bowlwet.value;
  });
  //==========================
  bowlwet.addEventListener("change", () => {
    calcBowlwet(item, num, wwater, bowldry, ebow, bowlwet, sdry, hum);
    calcFinal("max-density", "water-percent", listTrial);
  });

  // وزن الجفنة + العينة جافة
  const bowldry = document.getElementById(`bowldry${item.no}_${num}`);
  bowldry.addEventListener("input", () => {
    item.bowldrysample[num - 1] = bowldry.value;

    if (!bowldry.value) {
      return;
    }
    if (bowlwet.value) {
      calcWWater(item, num, bowlwet, wwater);
    }

    if (ebow.value) {
      calcSdry(item, num, ebow, sdry);
      calcHumidity(item, num, hum);
      calcAvargr(item);
      calcFinal("max-density", "water-percent", listTrial);
    }
  });

  //وزن المياه
  const wwater = document.getElementById(`wwater${item.no}_${num}`);
  wwater.addEventListener("change", () => {
    item.weightwater[num - 1] = wwater.value;
    if (sdry.value) {
      calcHumidity(item, num, hum);
      calcAvargr(item);
    }

    if (bowlwet.value) {
      calcBowldry(item, num, bowldry, bowlwet.value);
    }
  });
  // وزن العينة جافة
  const sdry = document.getElementById(`sdry${item.no}_${num}`);
  sdry.addEventListener("change", () => {
    item.sampledry[num - 1] = sdry.value;
    if (ebow.value || bowldry.value) {
      calcBowldry(item, num, bowldry);
      calcSdry(item, num, ebow, sdry);
      calcHumidity(item, num, hum);
      calcAvargr(item);
      calcFinal("max-density", "water-percent", listTrial);
    }
    if (bowlwet.value) {
      calcWWater(item, num, bowlwet, wwater);
      calcFinal("max-density", "water-percent", listTrial);
    }
  });
  // نسبة الرطوبة
  const hum = document.getElementById(`hum${item.no}_${num}`);
}

function calcFinal(idMax, idWater, list) {
  const maxDensity = document.getElementById(idMax);
  const waterPercent = document.getElementById(idWater);
  moistureContent_w = [];
  dryDensity_yd = [];
  moistureContent_w = list.map((item) => item.avrghumitidy);
  dryDensity_yd = list.map((item) => item.drydenisity);
  let final = calculator(moistureContent_w, dryDensity_yd);
  if (final.error) {
    maxDensity.value = final.error;
    waterPercent.value = final.error;
  } else {
    maxDensity.value = final.MDD;
    waterPercent.value = final.OMC;
    //===========
    MDD = maxDensity.value;
    OMC = waterPercent.value;
  }
}

function calcAvargr(item) {
  // متوسط نسبة الرطوبة
  const avrhum = document.getElementById(`avrhum${item.no}`);
  // الكثافة الجافة
  const ddensity = document.getElementById(`ddensity${item.no}`);

  if (item.humitidy[0] && item.humitidy[1]) {
    item.avrghumitidy =
      (Number(item.humitidy[0] || 0) + Number(item.humitidy[1] || 0)) / 2;
    avrhum.value = item.avrghumitidy.toFixed(2);
  } else {
    item.avrghumitidy =
      Number(item.humitidy[0] || 0) + Number(item.humitidy[1] || 0);
    avrhum.value = item.avrghumitidy.toFixed(2);
  }

  avrhum.addEventListener("input", () => {
    item.avrghumitidy = avrhum.value;
  });

  ddensity.addEventListener("input", () => {
    item.drydenisity = ddensity.value;
  });

  if (item.wetDenisty) {
    item.drydenisity =
      Number(item.wetDenisty) / (1 + Number(item.avrghumitidy || 0) / 100);
    ddensity.value = item.drydenisity.toFixed(2);
  }
}

function calcDensity(item, mold, wet, density) {
  if (!density.value) {
    return;
  }
  item.wetDenisty = density.value;

  if (volumMold.value) {
    item.wetSample = Number(density.value) * Number(volumMold.value);
    wet.value = item.wetSample.toFixed(2);
  }

  if (weightMold.value && wet.value) {
    item.totalWeight = Number(item.wetSample) + Number(weightMold.value);
    mold.value = item.totalWeight.toFixed(2);
  }

  if (mold.value) {
    weightMold.value = (
      Number(item.totalWeight) - Number(item.wetSample)
    ).toFixed(2);
  }

  if (wet.value) {
    volumMold.value = (Number(wet.value) / Number(density.value)).toFixed(2);
  }
}

function calcWet(item, mold, wet, density) {
  if (!wet.value) {
    return;
  }
  item.wetSample = wet.value;
  if (weightMold.value) {
    mold.value = "";
    item.totalWeight = "";
    const oldWeight = weightMold.value;
    weightMold.value = "";
    const wMold = Number(oldWeight) + Number(item.wetSample);
    mold.value = wMold;
    item.totalWeight = wMold;
  }

  if (mold.value) {
    const wMold = Number(mold.value) - Number(item.wetSample);
    weightMold.value = wMold;
  }

  if (volumMold.value) {
    item.density = Number(wet.value) / Number(volumMold.value);
    density.value = item.density.toFixed(2);
  }

  if (density.value) {
    volumMold.value = (Number(wet.value) / Number(density.value)).toFixed(2);
  }
}

function calcMold(item, mold, wet, density) {
  if (mold.value == "") {
    wet.value = "";
    density.value = "";
    return;
  }
  item.totalWeight = mold.value;
  const wMold = Number(weightMold.value);
  if (!wMold || !item.totalWeight) return "";
  item.wetSample = (Number(item.totalWeight) - wMold).toFixed(3);
  wet.value = item.wetSample || "";
  const v = Number(volumMold.value);
  if (!v || !wet.value) return "";
  item.wetDenisty = (Number(wet.value) / v).toFixed(3);
  density.value = item.wetDenisty || "";
}

createTable();

function oneCol(newItem, index) {
  td.forEach((element) => {
    element.setAttribute("colspan", listTrial.length);
  });

  addTooltip(
    document.getElementById("max-density"),
    highDensityDry,
    listTrial.map((i) => `ddensity${i.no}`)
  );

  headTr.appendChild(createTh(newItem.no));
  weightMoldSample.appendChild(createtd(`mold${newItem.no}`));
  weightWetSample.appendChild(
    createtd(`wet${newItem.no}`, false, wetSampleText, [
      `mold${newItem.no}`,
      `weightMold`,
    ])
  );
  wetDenisty.appendChild(
    createtd(`density${newItem.no}`, false, densityText, [
      "volumMold",
      `wet${newItem.no}`,
    ])
  );
  //====================================================
  emptybowlWeight.appendChild(
    create2td(`ebow${newItem.no}_1`, `ebow${newItem.no}_2`)
  );

  bowlwetsample.appendChild(
    create2td(`bowlwet${newItem.no}_1`, `bowlwet${newItem.no}_2`)
  );

  bowldrysample.appendChild(
    create2td(`bowldry${newItem.no}_1`, `bowldry${newItem.no}_2`)
  );

  weightwater.appendChild(
    create2td(
      `wwater${newItem.no}_1`,
      `wwater${newItem.no}_2`,
      false,
      weightwaterText,
      [`bowlwet${newItem.no}_1`, `bowldry${newItem.no}_1`],
      [`bowlwet${newItem.no}_2`, `bowldry${newItem.no}_2`]
    )
  );

  sampledry.appendChild(
    create2td(
      `sdry${newItem.no}_1`,
      `sdry${newItem.no}_2`,
      false,
      sampledryText,
      [`bowldry${newItem.no}_1`, `ebow${newItem.no}_1`],
      [`bowldry${newItem.no}_2`, `ebow${newItem.no}_2`]
    )
  );

  humitidy.appendChild(
    create2td(
      `hum${newItem.no}_1`,
      `hum${newItem.no}_2`,
      true,
      humitidyText,
      [`sdry${newItem.no}_1`, `wwater${newItem.no}_1`],
      [`sdry${newItem.no}_2`, `wwater${newItem.no}_2`]
    )
  );

  avrghumitidy.appendChild(
    createtd(`avrhum${newItem.no}`, false, avrghumitidyText, [
      `hum${newItem.no}_1`,
      `hum${newItem.no}_2`,
    ])
  );

  drydenisity.appendChild(
    createtd(`ddensity${newItem.no}`, false, drydenisityText, [
      `density${newItem.no}`,
      `avrhum${newItem.no}`,
    ])
  );

  //============================================================
  const mold = document.getElementById(`mold${newItem.no}`);
  const wet = document.getElementById(`wet${newItem.no}`);
  const density = document.getElementById(`density${newItem.no}`);
  mold.addEventListener("input", () => calcMold(newItem, mold, wet, density));
  wet.addEventListener("change", () => calcWet(newItem, mold, wet, density));
  density.addEventListener("change", () =>
    calcDensity(newItem, mold, wet, density)
  );

  let avrageWater = document.getElementById(`avrhum${newItem.no}`);
  avrageWater.addEventListener("input", () => {
    newItem.avrghumitidy = Number(avrageWater.value);
  });

  let maxDry = document.getElementById(`ddensity${newItem.no}`);
  maxDry.addEventListener("input", () => {
    newItem.drydenisity = Number(maxDry.value);
  });

  handelBowl(newItem, 1);
  handelBowl(newItem, 2);
}

function addCol() {
  if (listTrial.length >= 5) {
    return;
  }

  const newNo = listTrial.length + 1;
  const newItem = JSON.parse(JSON.stringify(templet));
  newItem.no = newNo;

  listTrial.push(newItem);

  oneCol(newItem);
  addColShorts();
  addColFake();
}

function calcWeight(type) {
  listTrial.forEach((item) => {
    const mold = document.getElementById(`mold${item.no}`);
    const wet = document.getElementById(`wet${item.no}`);
    const density = document.getElementById(`density${item.no}`);
    if (mold.value) {
      item.wetSample = Number(mold.value) - Number(weightMold.value);
      wet.value = item.wetSample.toFixed(2);
      if (volumMold.value) {
        item.wetDenisty = Number(item.wetSample) / Number(volumMold.value);
        density.value = item.wetDenisty.toFixed(2);
      }
    }

    if (type === "change") {
      if (wet.value) {
        item.totalWeight = Number(weightMold.value) + Number(item.wetSample);
        mold.value = item.totalWeight.toFixed(2);
      }

      if (density.value && wet.value) {
        volumMold.value = (Number(wet.value) / Number(density.value)).toFixed(
          2
        );
      }
    }
  });
}

function calcVolum(type) {
  listTrial.forEach((item) => {
    const mold = document.getElementById(`mold${item.no}`);
    const wet = document.getElementById(`wet${item.no}`);
    const density = document.getElementById(`density${item.no}`);

    if (wet.value) {
      item.wetDenisty = Number(item.wetSample) / Number(volumMold.value);
      density.value = item.wetDenisty.toFixed(2);
    }

    if (type === "change") {
      if (density.value) {
        item.wetSample = Number(item.wetDenisty) * Number(volumMold.value);
        wet.value = item.wetSample.toFixed(2);
      }
      if (weightMold.value && density.value) {
        item.totalWeight = Number(item.wetSample) + Number(weightMold.value);
        mold.value = item.totalWeight.toFixed(2);
      }
    }
  });
}
