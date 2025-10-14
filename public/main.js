const angleDown = document.getElementById("icon");
const divider = document.getElementById("divider");
const gradientTable = document.getElementById("gradient-table");
const weightSample = document.getElementById("weightSample");
const date = document.getElementById("date");
const table = document.getElementById("table");
const lL = document.getElementById("l-l");
const pI = document.getElementById("p-i");
const deleteArea = document.getElementById("delete-area");
const area = document.getElementById("area");

date.value = getDate();

area.value = soilClassification;

let list = [
  {
    idPass: "pass100",
    idResrvid: "resevid100",
    no: '4"',
    mm: "100",
    reserved: "",
    passing: "",
  },
  {
    idPass: "pass75",
    idResrvid: "resevid75",
    no: '3"',
    mm: "75",
    reserved: "",
    passing: "",
  },
  {
    idPass: "pass63",
    idResrvid: "resevid63",
    no: '2.5"',
    mm: "63",
    reserved: "",
    passing: "",
  },
  {
    idPass: "pass50",
    idResrvid: "resevid50",
    no: '2"',
    mm: "50",
    reserved: "",
    passing: "",
  },
  {
    idPass: "pass38",
    idResrvid: "resevid38",
    no: '1.5"',
    mm: "38",
    reserved: "",
    passing: "",
  },
  {
    idPass: "pass25",
    idResrvid: "resevid25",
    no: '1"',
    mm: "25",
    reserved: "",
    passing: "",
  },
  {
    idPass: "pass19",
    idResrvid: "resevid19",
    no: '3/4"',
    mm: "19",
    reserved: "",
    passing: "",
  },
  {
    idPass: "pass9",
    idResrvid: "resevid9",
    no: '3/8"',
    mm: "9",
    reserved: "",
    passing: "",
  },
  {
    idPass: "pass4",
    idResrvid: "resevid4",
    no: "4",
    mm: "4.75",
    reserved: "",
    passing: "",
  },
];

let listFine = [
  {
    idPass: "pass2",
    idResrvid: "resevid2",
    no: "10",
    mm: "2",
    reserved: "",
    passing: "",
  },
  {
    idPass: "pass425",
    idResrvid: "resevid425",
    no: "40",
    mm: "0.425",
    reserved: "",
    passing: "",
  },
  {
    idPass: "pass075",
    idResrvid: "resevid075",
    no: "200",
    mm: "0.075",
    reserved: "",
    passing: "",
  },
];

weightSample.addEventListener("change", () => {
  list.forEach((item) => {
    let reserved = document.getElementById(item.idResrvid);
    let passing = document.getElementById(item.idPass);

    if (!reserved.value && !passing.value) {
      return;
    }

    if (reserved?.value && !passing?.value) {
      reserved.dispatchEvent(new Event("input"));
    }

    if (passing?.value && !reserved?.value) {
      passing.dispatchEvent(new Event("input"));
    }
  });
});

angleDown.addEventListener("click", () => {
  if (angleDown.classList.contains("fa-angle-down")) {
    angleDown.classList.remove("fa-angle-down");
    angleDown.classList.add("fa-angle-up");
    gradientTable.style.display = "";
  } else {
    angleDown.classList.remove("fa-angle-up");
    angleDown.classList.add("fa-angle-down");
    gradientTable.style.display = "none";
  }
});

deleteArea.addEventListener("click", () => {
  area.value = "";
});

function createTable() {
  list.forEach((item) => createRow(item));
  createFine();
  listFine.forEach((item) => createRow(item, true));
}

function createRow(item, isFine = false) {
  const weightFine = document.getElementById("weightFine");
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

  // ======= td 2 (reserved)========
  const tdReservid = document.createElement("td");
  const reservidInput = document.createElement("input");
  reservidInput.type = "number";
  reservidInput.value = item.reserved;
  reservidInput.id = item.idResrvid;
  reservidInput.addEventListener("input", () =>
    calcResrved(isFine, reservidInput, item, passingInput, weightFine)
  );
  tdReservid.appendChild(reservidInput);
  // ======= End td 2 (reserved)========

  // ======= td 3 (Passing)========
  const tdPassing = document.createElement("td");
  const passingInput = document.createElement("input");
  passingInput.type = "number";
  passingInput.value = item.passing;
  passingInput.id = item.idPass;
  passingInput.addEventListener("input", () =>
    calcPassing(isFine, reservidInput, item, passingInput, weightFine)
  );
  tdPassing.appendChild(passingInput);
  // ======= End td 3 (Passing)========

  tr.appendChild(tdSievs);
  tr.appendChild(tdReservid);
  tr.appendChild(tdPassing);

  table.appendChild(tr);
}

function createFine() {
  const tr = document.createElement("tr");
  const tdFine = document.createElement("td");
  tdFine.colSpan = "3";
  const inputLabel = document.createElement("div");
  inputLabel.className = "input-label";
  inputLabel.style.width = "100%";
  const inputFine = document.createElement("input");
  inputFine.type = "number";
  inputFine.placeholder = "";
  inputFine.id = "weightFine";

  inputFine.addEventListener("change", () => {
    listFine.forEach((item) => {
      let reserved = document.getElementById(item.idResrvid);
      let passing = document.getElementById(item.idPass);

      if (!reserved.value && !passing.value) {
        return;
      }

      if (reserved?.value && !passing?.value) {
        reserved.dispatchEvent(new Event("input"));
      }

      if (passing?.value && !reserved?.value) {
        passing.dispatchEvent(new Event("input"));
      }
    });
  });

  const labelFine = document.createElement("label");
  labelFine.htmlFor = "weightFine";
  labelFine.innerHTML = "وزن الناعم";

  inputLabel.appendChild(inputFine);
  inputLabel.appendChild(labelFine);
  tdFine.appendChild(inputLabel);
  tr.appendChild(tdFine);
  table.appendChild(tr);
}

function calcResrved(isFine, reservidInput, item, passingInput, weightFine) {
  item.reserved = reservidInput.value;
  if (weightSample.value) {
    if (isFine) {
      const result = list.filter((item) => item.mm == "4.75");

      if (!result[0].passing || !weightFine.value) {
        return;
      } else {
        let reservedFine =
          100 - (Number(reservidInput.value) / Number(weightFine.value)) * 100;

        item.passing = (
          (Number(result[0].passing) * reservedFine) /
          100
        ).toFixed(2);
      }
    } else {
      let reservedPercentage =
        (Number(reservidInput.value) / Number(weightSample.value)) * 100;
      item.passing = (100 - reservedPercentage).toFixed(2);
    }

    passingInput.value = item.passing;
  }
  if (!reservidInput.value) {
    passingInput.value = "";
  }
}

function calcPassing(isFine, reservidInput, item, passingInput, weightFine) {
  item.passing = passingInput.value;

  if (weightSample.value) {
    if (isFine) {
      const result = list.filter((item) => item.mm == "4.75");
      if (!result[0].passing || !weightFine.value) {
        return;
      } else {
        let passFine = Number(passingInput.value) / Number(result[0].passing);

        let reservedFine =
          Number(weightFine.value) - passFine * Number(weightFine.value);
        // item.reserved = reservedFine.toFixed(2);
        item.reserved = Number(reservedFine.toFixed(2));

      }
    } else {
      let weightOfPass =
        (Number(passingInput.value) * Number(weightSample.value)) / 100;
      item.reserved = Number(weightSample.value) - weightOfPass;
    }

    reservidInput.value = item.reserved.toFixed(2);
  }

  if (!passingInput.value) {
    reservidInput.value = "";
  }
}

function getDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

createTable();