// Accessing tables root elements
let tableOneRoot = document.querySelector(".table-1-root");
let tableTwoRoot = document.querySelector(".table-2-root");
let tableThreeRoot = document.querySelector(".table-3-root");
let tableFourRoot = document.querySelector(".table-4-root");
let finalTableRoot = document.querySelector(".final-table-root");

// Initialize requred similar tables array
let tablesRootArray = [
  tableOneRoot,
  tableTwoRoot,
  tableThreeRoot,
  tableFourRoot,
];

let tablesNameArray = [
  "Resistance 1",
  "Support 1",
  "Resistance 2",
  "Support 2",
];

// Main Variables
let counter = 0;

// Accessing digital clock element
let digitalClockRoot = document.querySelector(".clock-time");

// Acccessing pdf download button
let pdfDownloadBtn = document.querySelector(".pdf-download");

// Accessing clear localStorage data button
let clearLSBtn = document.querySelector(".clear-data");

// Accessing overlay element
let overlayOne = document.querySelector(".overlay-one");
let overlayTwo = document.querySelector(".overlay-two");

// Accessing overlay forms
let singleInputForm = document.querySelector(".single-input-form");
let multiInputForm = document.querySelector(".multi-input-form");

// Accessing overlayOne form message box
let messageBox = document.querySelector(".message");

// Accessing overlayOne form1 input fields
let fromInput = document.querySelector(".from-input");
let toInput = document.querySelector(".to-input");
let percentageInput = document.querySelector(".percentage-input");

// Accessing overlayTwo form2 input fields

// table1 inputs fields
let fromInput1 = document.querySelector(".from-input-1");
let toInput1 = document.querySelector(".to-input-1");
let percentageInput1 = document.querySelector(".percentage-input-1");

// table2 inputs fields
let fromInput2 = document.querySelector(".from-input-2");
let toInput2 = document.querySelector(".to-input-2");
let percentageInput2 = document.querySelector(".percentage-input-2");

// table2 inputs fields
let fromInput3 = document.querySelector(".from-input-3");
let toInput3 = document.querySelector(".to-input-3");
let percentageInput3 = document.querySelector(".percentage-input-3");

// table2 inputs fields
let fromInput4 = document.querySelector(".from-input-4");
let toInput4 = document.querySelector(".to-input-4");
let percentageInput4 = document.querySelector(".percentage-input-4");

// Array of all inputs in overlayTwo form2
let form2AllInputsArray = [
  fromInput1,
  toInput1,
  percentageInput1,
  fromInput2,
  toInput2,
  percentageInput2,
  fromInput3,
  toInput3,
  percentageInput3,
  fromInput4,
  toInput4,
  percentageInput4,
];

// Accesing overlay form cancel button
let cancelBtnOne = document.querySelector(".cancel-btn-one");
let cancelBtnTwo = document.querySelector(".cancel-btn-two");

// Accessing changing values button to change the values
let changeT1ValuesBtn = document.querySelector(".change-t1-values");
let changeT2ValuesBtn = document.querySelector(".change-t2-values");
let changeT3ValuesBtn = document.querySelector(".change-t3-values");
let changeT4ValuesBtn = document.querySelector(".change-t4-values");

let changeAllValuesBtn = document.querySelector(".change-all-values");

// Initialize time variables
let oneSecond = 1000;
let oneMinute = 60 * oneSecond;

// Create an object that store table values (eg - from, to, percentage)
// let tableValues = {};

// Class to create a table with methods
class Table {
  constructor(tableName) {
    this.counter = 0;
    this.fromValues = [];
    this.toValues = [];
    this.percentageValues = [];
    this.percentageChangeValues = [];
    this.trendValues = [];
    this.timeValues = [];
    this.tableName = tableName;
  }

  createTimeCell() {
    let td = document.createElement("td");

    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let period = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be treated as 12

    // Add leading zeros to minutes if necessary
    minutes = minutes < 10 ? "0" + minutes : minutes;

    let time = `${hours}:${minutes} ${period}`;
    this.timeValues.push(time);
    td.textContent = time;
    return td;
  }

  createFromCell(fromValue) {
    let td = document.createElement("td");
    this.fromValues.push(fromValue);
    td.textContent = this.fromValues[this.counter];
    return td;
  }

  createToCell(toValue) {
    let td = document.createElement("td");
    this.toValues.push(toValue);
    td.textContent = this.toValues[this.counter];
    return td;
  }

  createPercentageCell(percentageValue) {
    let td = document.createElement("td");
    this.percentageValues.push(percentageValue);
    td.textContent = this.percentageValues[this.counter];
    return td;
  }

  createPercentageChangeCell() {
    let td = document.createElement("td");
    if (this.percentageValues.length === 1) {
      this.percentageChangeValues.push(this.percentageValues[0]);
      td.textContent = this.percentageChangeValues[0];
    } else {
      if (this.fromValues[this.counter] === this.toValues[this.counter - 1] && this.toValues[this.counter] === this.fromValues[this.counter - 1]) {
        let oldPercentageRate = 100 - this.percentageValues[this.counter - 1];
        let newPercentageRate = 100 - this.percentageValues[this.counter];
        let percentageChange = oldPercentageRate + newPercentageRate;
        this.percentageChangeValues.push(percentageChange);
        td.textContent = this.percentageChangeValues[this.counter];
      } else {
        let percentageChange =
          this.percentageValues[this.counter] -
          this.percentageValues[this.counter - 1];
        this.percentageChangeValues.push(percentageChange);
        td.textContent = this.percentageChangeValues[this.counter];
      }
    }
    return td;
  }

  createTrendCell() {
    let td = document.createElement("td");
    let trend;

    if (this.fromValues[this.counter] < this.toValues[this.counter]) {
      if (
        this.percentageValues[this.counter] >
        this.percentageValues[this.counter - 1]
      ) {
        trend = "green";
      } else if (
        this.percentageValues[this.counter] <
        this.percentageValues[this.counter - 1]
      ) {
        trend = "red";
      } else {
        trend = "lightgray";
      }
    } else if (this.fromValues[this.counter] > this.toValues[this.counter]) {
      if (
        this.percentageValues[this.counter] >
        this.percentageValues[this.counter - 1]
      ) {
        trend = "red";
      } else if (
        this.percentageValues[this.counter] <
        this.percentageValues[this.counter - 1]
      ) {
        trend = "green";
      } else {
        trend = "lightgray";
      }
    } else {
      trend = "lightgray";
    }
    this.trendValues.push(trend);
    td.style.backgroundColor = trend;
    return td;
  }

  createTableRow(fromValue, toValue, percentageValue, root) {
    let tableRow = document.createElement("tr");

    let timeCell = this.createTimeCell();

    let fromCell = this.createFromCell(fromValue);

    let toCell = this.createToCell(toValue);

    let percentageCell = this.createPercentageCell(percentageValue);

    let percentageChangeCell = this.createPercentageChangeCell();

    let trendCell = this.createTrendCell();

    tableRow.append(
      timeCell,
      fromCell,
      toCell,
      percentageCell,
      percentageChangeCell,
      trendCell
    );

    root.append(tableRow);

    this.counter++;
  }
}

// function to create final table row
function displayFinalTableRow(trendValuesArray, root = finalTableRoot) {
  trendValuesArray.forEach((trendArray) => {
    let resultTableRow = document.createElement("tr");

    let bullishCell = document.createElement("td");
    let bearishCell = document.createElement("td");
    let netCell = document.createElement("td");

    let netCount = trendArray[0] - trendArray[1];

    if (netCount < 0) {
      netCell.style.color = "white";
      netCell.style.backgroundColor = "red";
    } else if (netCount > 0) {
      netCell.style.color = "white";
      netCell.style.backgroundColor = "green";
    } else {
      netCell.style.backgroundColor = "lightgray";
    }

    bullishCell.textContent = trendArray[0];
    bearishCell.textContent = trendArray[1];
    netCell.textContent = netCount;

    resultTableRow.append(bullishCell, bearishCell, netCell);
    root.append(resultTableRow);
  });
}

// function to create final table data
function createFinalTableData(check, root = finalTableRoot) {
  let trendValuesArray = [];

  let maxValuesTableCounter = greaterOfFourNumbers(
    table1.counter,
    table2.counter,
    table3.counter,
    table4.counter
  );

  if (check === true) {
    let bullishCount = 0;
    let bearishCount = 0;
    let bullBearValues = [];

    if (table1.trendValues[table1.counter - 1] === "red") {
      bearishCount += table1.percentageChangeValues[table1.counter - 1];
    } else if (table1.trendValues[table1.counter - 1] === "green") {
      bullishCount += table1.percentageChangeValues[table1.counter - 1];
    }

    if (table2.trendValues[table2.counter - 1] === "red") {
      bearishCount += table2.percentageChangeValues[table2.counter - 1];
    } else if (table2.trendValues[table2.counter - 1] === "green") {
      bullishCount += table2.percentageChangeValues[table2.counter - 1];
    }

    if (table3.trendValues[table3.counter - 1] === "red") {
      bearishCount += table3.percentageChangeValues[table3.counter - 1];
    } else if (table3.trendValues[table3.counter - 1] === "green") {
      bullishCount += table3.percentageChangeValues[table3.counter - 1];
    }

    if (table4.trendValues[table4.counter - 1] === "red") {
      bearishCount += table4.percentageChangeValues[table4.counter - 1];
    } else if (table4.trendValues[table4.counter - 1] === "green") {
      bullishCount += table4.percentageChangeValues[table4.counter - 1];
    }

    if (String(bullishCount).startsWith("-")) {
      bullishCount = -bullishCount;
    }

    if (String(bearishCount).startsWith("-")) {
      bearishCount = -bearishCount;
    }

    bullBearValues.push(bullishCount, bearishCount);
    trendValuesArray.push(bullBearValues);

    displayFinalTableRow(trendValuesArray);
  } else if (check === false) {
    let i = 0;
    while (i < maxValuesTableCounter) {
      let bullishCount = 0;
      let bearishCount = 0;
      let bullBearValues = [];

      if (i < table1.counter) {
        if (table1.trendValues[i] === "red") {
          bearishCount += table1.percentageChangeValues[i];
        } else if (table1.trendValues[i] === "green") {
          bullishCount += table1.percentageChangeValues[i];
        }
      }

      if (i < table2.counter) {
        if (table2.trendValues[i] === "red") {
          bearishCount += table2.percentageChangeValues[i];
        } else if (table2.trendValues[i] === "green") {
          bullishCount += table2.percentageChangeValues[i];
        }
      }

      if (i < table3.counter) {
        if (table3.trendValues[i] === "red") {
          bearishCount += table3.percentageChangeValues[i];
        } else if (table3.trendValues[i] === "green") {
          bullishCount += table3.percentageChangeValues[i];
        }
      }

      if (i < table4.counter) {
        if (table4.trendValues[i] === "red") {
          bearishCount += table4.percentageChangeValues[i];
        } else if (table4.trendValues[i] === "green") {
          bullishCount += table4.percentageChangeValues[i];
        }
      }

      if (String(bullishCount).startsWith("-")) {
        bullishCount = -bullishCount;
      }

      if (String(bearishCount).startsWith("-")) {
        bearishCount = -bearishCount;
      }

      bullBearValues.push(bullishCount, bearishCount);
      trendValuesArray.push(bullBearValues);
      i++;
    }
    displayFinalTableRow(trendValuesArray);
  } else {
    let finalTableRootTrs = root.querySelectorAll("tr");

    let maxValuesTableCounter = greaterOfFourNumbers(
      table1.counter,
      table2.counter,
      table3.counter,
      table4.counter
    );

    let bullishCount = 0;
    let bearishCount = 0;

    if (table1.trendValues[table1.counter - 1] === "red") {
      bearishCount += table1.percentageChangeValues[table1.counter - 1];
    } else if (table1.trendValues[table1.counter - 1] === "green") {
      bullishCount += table1.percentageChangeValues[table1.counter - 1];
    }

    if (table2.trendValues[table2.counter - 1] === "red") {
      bearishCount += table2.percentageChangeValues[table2.counter - 1];
    } else if (table2.trendValues[table2.counter - 1] === "green") {
      bullishCount += table2.percentageChangeValues[table2.counter - 1];
    }

    if (table3.trendValues[table3.counter - 1] === "red") {
      bearishCount += table3.percentageChangeValues[table3.counter - 1];
    } else if (table3.trendValues[table3.counter - 1] === "green") {
      bullishCount += table3.percentageChangeValues[table3.counter - 1];
    }

    if (table4.trendValues[table4.counter - 1] === "red") {
      bearishCount += table4.percentageChangeValues[table4.counter - 1];
    } else if (table4.trendValues[table4.counter - 1] === "green") {
      bullishCount += table4.percentageChangeValues[table4.counter - 1];
    }

    if (String(bullishCount).startsWith("-")) {
      bullishCount = -bullishCount;
    }

    if (String(bearishCount).startsWith("-")) {
      bearishCount = -bearishCount;
    }

    if (finalTableRootTrs.length === maxValuesTableCounter) {
      let finalTableRootLastElement = root.lastElementChild;
      let lastElementAllTd = finalTableRootLastElement.querySelectorAll("td");
      lastElementAllTd[0].textContent = bullishCount;
      lastElementAllTd[1].textContent = bearishCount;
      lastElementAllTd[2].textContent = bullishCount - bearishCount;
    } else {
      let bullBearValues = [];
      bullBearValues.push(bullishCount, bearishCount);
      trendValuesArray.push(bullBearValues);
      displayFinalTableRow(trendValuesArray);
    }
  }
}

// Creating instances of Table class and adding intances in local storage and accerssing them if they are already exist in loacalstorage

let table1;
let table2;
let table3;
let table4;
let table = new Table("table");

if (window.localStorage.getItem("table1")) {
  table1 = JSON.parse(window.localStorage.getItem("table1"));
  Object.setPrototypeOf(table1, table.__proto__);
} else {
  table1 = new Table("Resistance 1");
}

if (window.localStorage.getItem("table2")) {
  table2 = JSON.parse(window.localStorage.getItem("table2"));
  Object.setPrototypeOf(table2, table.__proto__);
} else {
  table2 = new Table("Support 1");
}

if (window.localStorage.getItem("table3")) {
  table3 = JSON.parse(window.localStorage.getItem("table3"));
  Object.setPrototypeOf(table3, table.__proto__);
} else {
  table3 = new Table("Resistance 2");
}

if (window.localStorage.getItem("table4")) {
  table4 = JSON.parse(window.localStorage.getItem("table4"));
  Object.setPrototypeOf(table4, table.__proto__);
} else {
  table4 = new Table("Support 2");
}

// Hiding overlayTwo if Table class instances is already stored in localSotarge
if (window.localStorage.getItem(getLargeDataTable())) {
  showHideElement(overlayTwo, "none");
}

// function to run digital clock
function digitalClock() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  let period = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be treated as 12

  // Add leading zeros to minutes if necessary
  minutes = minutes < 10 ? "0" + minutes : minutes;

  digitalClockRoot.textContent = `${hours}:${minutes}:${seconds} ${period}`;
}

digitalClock();

// Set interval to call digital clock dunction after one second
setInterval(digitalClock, oneSecond);

// function to set tables values through form1
function setTable(fromValue, toValue, percentageValue, tableName, root) {
  if (tableName === table1.tableName) {
    table1.createTableRow(fromValue, toValue, percentageValue, root);
    window.localStorage.setItem("table1", JSON.stringify(table1));
  } else if (tableName === table2.tableName) {
    table2.createTableRow(fromValue, toValue, percentageValue, root);
    window.localStorage.setItem("table2", JSON.stringify(table2));
  } else if (tableName === table3.tableName) {
    table3.createTableRow(fromValue, toValue, percentageValue, root);
    window.localStorage.setItem("table3", JSON.stringify(table3));
  } else {
    table4.createTableRow(fromValue, toValue, percentageValue, root);
    window.localStorage.setItem("table4", JSON.stringify(table4));
  }
}

// function to check input values in individual input field
function checkFieldValue(value, field, fieldErrorBox) {
  if (value.trim() === "") {
    field.classList.add("error");
    fieldErrorBox.textContent = "Field can't be empty";
    return false;
  } else if (isNaN(value)) {
    field.classList.add("error");
    fieldErrorBox.textContent = "Only number values allowed";
    return false;
  } else {
    field.classList.remove("error");
    fieldErrorBox.textContent = "";
    return true;
  }
}

// function to check form validation
function checkFrom1Validation(fromInput, toInput, percentageInput) {
  // Accesing from1 error boxes
  let fromErrorBox = document.querySelector(".from-error");
  let toErrorBox = document.querySelector(".to-error");
  let percentageErrorBox = document.querySelector(".percentage-error");

  let check1 = checkFieldValue(fromInput.value, fromInput, fromErrorBox);
  let check2 = checkFieldValue(toInput.value, toInput, toErrorBox);
  let check3 = checkFieldValue(
    percentageInput.value,
    percentageInput,
    percentageErrorBox
  );

  if (check1 && check2 && check3) {
    setTable(
      Number(fromInput.value),
      Number(toInput.value),
      Number(percentageInput.value),
      tablesNameArray[counter],
      tablesRootArray[counter]
    );

    createFinalTableData(null);

    showHideElement(overlayOne, "none");
  } else {
    return;
  }
}

// function to handle single input form
function handleForm1(e) {
  e.preventDefault();
  let fromInput = e.target.elements.fromValue;
  let toInput = e.target.elements.toValue;
  let percentageInput = e.target.elements.percentageValue;

  checkFrom1Validation(fromInput, toInput, percentageInput);
}

// adding submit event listener on single input form
singleInputForm.addEventListener("submit", handleForm1);

// function to show or hide an html element
function showHideElement(element, display) {
  if (display === "none") {
    element.style.display = display;
  } else if (display === "flex") {
    element.style.display = display;
  } else if (display === "block") {
    element.style.display = display;
  }
}

// adding click event listener on input from1 cancel button
cancelBtnOne.addEventListener("click", () => {
  let from1AllInputs = document.querySelectorAll(".input-box-1");
  let form1ALLErrorBoxes = document.querySelectorAll(".error-message-1");
  from1AllInputs.forEach((input, index) => {
    input.classList?.remove("error");
    form1ALLErrorBoxes[index].textContent = "";
  });
  showHideElement(overlayOne, "none");
});

cancelBtnTwo.addEventListener("click", () => {
  let form2AllInputs = document.querySelectorAll(".input-box-2");
  let form2ALLErrorBoxes = document.querySelectorAll(".error-message-2");
  form2AllInputs.forEach((input, index) => {
    input.classList?.remove("error");
    form2ALLErrorBoxes[index].textContent = "";
  });
  showHideElement(overlayTwo, "none");
});

// adding event listener on  all the table data change buttons
changeT1ValuesBtn.addEventListener("click", () => {
  if (table1.fromValues.length > 0) {
    fromInput.value = table1.fromValues[table1.counter - 1];
    toInput.value = table1.toValues[table1.counter - 1];
    percentageInput.value = table1.percentageValues[table1.counter - 1];
  } else {
    fromInput.value = "";
    toInput.value = "";
    percentageInput.value = "";
  }
  counter = 0;
  messageBox.textContent = table1.tableName;
  showHideElement(overlayOne, "flex");
});

changeT2ValuesBtn.addEventListener("click", () => {
  if (table2.fromValues.length > 0) {
    fromInput.value = table2.fromValues[table2.counter - 1];
    toInput.value = table2.toValues[table2.counter - 1];
    percentageInput.value = table2.percentageValues[table2.counter - 1];
  } else {
    fromInput.value = "";
    toInput.value = "";
    percentageInput.value = "";
  }
  counter = 1;
  messageBox.textContent = table2.tableName;
  showHideElement(overlayOne, "flex");
});

changeT3ValuesBtn.addEventListener("click", () => {
  if (table3.fromValues.length > 0) {
    fromInput.value = table3.fromValues[table3.counter - 1];
    toInput.value = table3.toValues[table3.counter - 1];
    percentageInput.value = table3.percentageValues[table3.counter - 1];
  } else {
    fromInput.value = "";
    toInput.value = "";
    percentageInput.value = "";
  }
  counter = 2;
  messageBox.textContent = table3.tableName;
  showHideElement(overlayOne, "flex");
});

changeT4ValuesBtn.addEventListener("click", () => {
  if (table4.fromValues.length > 0) {
    fromInput.value = table4.fromValues[table4.counter - 1];
    toInput.value = table4.toValues[table4.counter - 1];
    percentageInput.value = table4.percentageValues[table4.counter - 1];
  } else {
    fromInput.value = "";
    toInput.value = "";
    percentageInput.value = "";
  }
  counter = 3;
  messageBox.textContent = table4.tableName;
  showHideElement(overlayOne, "flex");
});

changeAllValuesBtn.addEventListener("click", () => {
  // Changing form2 inputs values with updated tables data
  if (table1.fromValues.length > 0) {
    form2AllInputsArray[0].value = table1.fromValues[table1.counter - 1];
    form2AllInputsArray[1].value = table1.toValues[table1.counter - 1];
    form2AllInputsArray[2].value = table1.percentageValues[table1.counter - 1];

    form2AllInputsArray[3].value = table2.fromValues[table2.counter - 1];
    form2AllInputsArray[4].value = table2.toValues[table2.counter - 1];
    form2AllInputsArray[5].value = table2.percentageValues[table2.counter - 1];

    form2AllInputsArray[6].value = table3.fromValues[table3.counter - 1];
    form2AllInputsArray[7].value = table3.toValues[table3.counter - 1];
    form2AllInputsArray[8].value = table3.percentageValues[table3.counter - 1];

    form2AllInputsArray[9].value = table4.fromValues[table4.counter - 1];
    form2AllInputsArray[10].value = table4.toValues[table4.counter - 1];
    form2AllInputsArray[11].value = table4.percentageValues[table4.counter - 1];
  }
  cancelBtnTwo.removeAttribute("disabled");
  showHideElement(overlayTwo, "flex");
});

// function to check input values in individual input field
function checkFrom2Validation(
  fromInput1,
  toInput1,
  percentageInput1,
  fromInput2,
  toInput2,
  percentageInput2,
  fromInput3,
  toInput3,
  percentageInput3,
  fromInput4,
  toInput4,
  percentageInput4
) {
  // Accesing from2 all error boxes
  let fromError1 = document.querySelector(".from-error-1");
  let toError1 = document.querySelector(".to-error-1");
  let percentageError1 = document.querySelector(".percentage-error-1");

  let fromError2 = document.querySelector(".from-error-2");
  let toError2 = document.querySelector(".to-error-2");
  let percentageError2 = document.querySelector(".percentage-error-2");

  let fromError3 = document.querySelector(".from-error-3");
  let toError3 = document.querySelector(".to-error-3");
  let percentageError3 = document.querySelector(".percentage-error-3");

  let fromError4 = document.querySelector(".from-error-4");
  let toError4 = document.querySelector(".to-error-4");
  let percentageError4 = document.querySelector(".percentage-error-4");

  // Checking input values is valid or not

  let check1 = checkFieldValue(fromInput1.value, fromInput1, fromError1);
  let check2 = checkFieldValue(toInput1.value, toInput1, toError1);
  let check3 = checkFieldValue(
    percentageInput1.value,
    percentageInput1,
    percentageError1
  );

  let check4 = checkFieldValue(fromInput2.value, fromInput2, fromError2);
  let check5 = checkFieldValue(toInput2.value, toInput2, toError2);
  let check6 = checkFieldValue(
    percentageInput2.value,
    percentageInput2,
    percentageError2
  );

  let check7 = checkFieldValue(fromInput3.value, fromInput3, fromError3);
  let check8 = checkFieldValue(toInput3.value, toInput3, toError3);
  let check9 = checkFieldValue(
    percentageInput3.value,
    percentageInput3,
    percentageError3
  );

  let check10 = checkFieldValue(fromInput4.value, fromInput4, fromError4);
  let check11 = checkFieldValue(toInput4.value, toInput4, toError4);
  let check12 = checkFieldValue(
    percentageInput4.value,
    percentageInput4,
    percentageError4
  );

  if (
    check1 &&
    check2 &&
    check3 &&
    check4 &&
    check5 &&
    check6 &&
    check7 &&
    check8 &&
    check9 &&
    check10 &&
    check11 &&
    check12
  ) {
    setTable(
      Number(fromInput1.value),
      Number(toInput1.value),
      Number(percentageInput1.value),
      tablesNameArray[0],
      tablesRootArray[0]
    );
    setTable(
      Number(fromInput2.value),
      Number(toInput2.value),
      Number(percentageInput2.value),
      tablesNameArray[1],
      tablesRootArray[1]
    );
    setTable(
      Number(fromInput3.value),
      Number(toInput3.value),
      Number(percentageInput3.value),
      tablesNameArray[2],
      tablesRootArray[2]
    );
    setTable(
      Number(fromInput4.value),
      Number(toInput4.value),
      Number(percentageInput4.value),
      tablesNameArray[3],
      tablesRootArray[3]
    );

    createFinalTableData(true);

    showHideElement(overlayTwo, "none");
    cancelBtnTwo.removeAttribute("disabled");
  } else {
    return;
  }
}

// function to handle form2
function handleForm2(e) {
  e.preventDefault();

  checkFrom2Validation(
    fromInput1,
    toInput1,
    percentageInput1,
    fromInput2,
    toInput2,
    percentageInput2,
    fromInput3,
    toInput3,
    percentageInput3,
    fromInput4,
    toInput4,
    percentageInput4
  );
}

// adding submit event listener on multiple input form
multiInputForm.addEventListener("submit", handleForm2);

// when user click on clear data button it clear the data of localStorage
clearLSBtn.addEventListener("click", () => {
  window.localStorage.removeItem("table1");
  window.localStorage.removeItem("table2");
  window.localStorage.removeItem("table3");
  window.localStorage.removeItem("table4");
  window.location.reload();
});

// when user click on pdf download button it download pdf file
pdfDownloadBtn.addEventListener("click", () => {
  let worker = html2pdf();
  let element = document.querySelector(".tables-container");

  var opt = {
    margin: 0.3,
    filename: "tables.pdf",
    image: { type: "jpg", quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: [16, 8], orientation: "landscape" },
  };

  // New Promise-based usage:
  worker.set(opt).from(element).save();
});

// Initialize variables for tackle the result table data
let allTablesTrendArray = [];
let count = 0;

// function to display table data if it instance is already stored in localStorage
function displayTableData(table, root) {
  let trendArray = [];
  for (let i = 0; i < table.counter; i++) {
    let tableRow = document.createElement("tr");

    let timeCell = document.createElement("td");
    let fromCell = document.createElement("td");
    let toCell = document.createElement("td");
    let percentageCell = document.createElement("td");
    let percentageChangeCell = document.createElement("td");
    let trendCell = document.createElement("td");

    timeCell.textContent = table.timeValues[i];
    fromCell.textContent = table.fromValues[i];
    toCell.textContent = table.toValues[i];
    percentageCell.textContent = table.percentageValues[i];
    percentageChangeCell.textContent = table.percentageChangeValues[i];
    trendCell.style.backgroundColor = table.trendValues[i];

    tableRow.append(
      timeCell,
      fromCell,
      toCell,
      percentageCell,
      percentageChangeCell,
      trendCell
    );
    root.append(tableRow);

    trendArray.push(table.trendValues[i]);
  }
  allTablesTrendArray.push(trendArray);
}

if (window.localStorage.getItem(getLargeDataTable())) {
  displayTableData(table1, tableOneRoot);
  displayTableData(table2, tableTwoRoot);
  displayTableData(table3, tableThreeRoot);
  displayTableData(table4, tableFourRoot);
  createFinalTableData(false);
}

// function to find the table that's have more values
function getLargeDataTable() {
  let largeCounterTable = greaterOfFourNumbers(
    table1.counter,
    table2.counter,
    table3.counter,
    table4.counter
  );

  if (largeCounterTable === table1.counter) {
    return "table1";
  } else if (largeCounterTable === table2.counter) {
    return "table2";
  } else if (largeCounterTable === table3.counter) {
    return "table3";
  } else {
    return "table4";
  }
}

// function to find the greater of four numbers
function greaterOfFourNumbers(num1, num2, num3, num4) {
  return Math.max(num1, num2, num3, num4);
}
