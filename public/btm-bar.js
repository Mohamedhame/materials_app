const fakeBtn = document.getElementById("fake-btn");
// const saveBtn = document.getElementById("save-btn");
const chooseDialog = document.getElementById("choose-dialog");
// const fileUpload = document.getElementById("fileUpload");
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const homeBtn = document.getElementById("home-btn");

// fileUpload.addEventListener("change", (e) => {
//   const file = e.target.files[0];
//   const data = readExcelFile(file);
//   console.log(data);
// });

function closePage1() {
  page1.style.display = "none";
  page2.style.display = "block";
  chooseDialog.style.display = "none";
  fakeBtn.parentElement.style.display = "none";
  homeBtn.parentElement.style.display = "block";
}

function displayPage1() {
  page1.style.display = "";
  page2.style.display = "none";
  fakeBtn.parentElement.style.display = "block";
  homeBtn.parentElement.style.display = "none";
  fakeBtn.classList.remove("active");
}

// fakeBtn.addEventListener("click", () => {
//   toggle(fakeBtn, saveBtn);
//   // chooseDialog.style.display = "flex";
// });

// saveBtn.addEventListener("click", () => {
//   toggle(saveBtn, fakeBtn);
// });

// document.addEventListener("click", (e) => {
//   if (
//     chooseDialog.style.display === "flex" &&
//     !chooseDialog.contains(e.target) &&
//     e.target !== fakeBtn
//   ) {
//     chooseDialog.style.display = "none";
//     fakeBtn.classList.remove("active");
//   }
// });

// function toggle(btn1, btn2) {
//   btn1.classList.add("active");
//   btn2.classList.remove("active");
// }

// function readExcelFile(file) {
//   const reader = new FileReader();

//   reader.onload = function (e) {
//     const data = new Uint8Array(e.target.result);
//     const workbook = XLSX.read(data, { type: "array" });
//     const sheetName = workbook.SheetNames[0];
//     const sheet = workbook.Sheets[sheetName];
//     const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
//     console.log(rows); // ← هنا بيظهر المحتوى كمصفوفة
//   };

//   reader.readAsArrayBuffer(file);
// }