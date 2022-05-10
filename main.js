const section = document.querySelector("section");
const monthYearTitle = document.getElementById("month-year-title");
const leftMonth = document.getElementById("left-month");
const rightMonth = document.getElementById("right-month");
const monthInput = document.getElementById("month-input");
const yearInput = document.getElementById("year-input");
const memberList = document.getElementById("scroll");
const openTab = document.getElementById("open-tab");
const main = document.querySelector("main");
const addNewInput = document.getElementById("add-new-input");
const close_flot_tab = document.getElementById("close");
const colorPickeer = document.getElementById("color-pickeer");
const openNewMT = document.getElementById("open-new-m-t");
const addMemberFlotingWindow = document.getElementById(
  "add-member-floting-window"
);
const inputMemberName = document.getElementById("input-member-name");
const colorsSelect = document.querySelectorAll("#color-pickeer span");
const addMB_span = document.querySelector("#add-member-button span");
const aboutInput = document.getElementById("about-input");

const dayInformation = document.getElementById("day-information"); 
const showDate = document.getElementById("show-date");   
const openNewMoment = document.getElementById("open-new-moment");   
const scrollBox = document.getElementById("scroll-box"); 
const title_p = document.querySelector("#title p");

let Delete;

addNewInput.defaultValue = "2001-07-07";
let date = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();
let currentDate = date.getDate() - 1;
let selectedColorI = 0;
let tabOpenIs = false;
let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let userData = [
  {
    moment: "Sourav Barui",
    day: "07",
    month: "07",
    year: "2001",
    about: "",
    colorI: 3,
  },
];

let tudayDate = {
  year: currentYear,
  month: currentMonth,
  day: currentDate,
};
let monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let daysName = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let sortDayName = ["SUN", "MON", "TUE", "WED", "THD", "FRI", "SAT"];

// -----------------------------------------------------
// ------ first time initilizion -----
userData = JSON.parse(localStorage.getItem("sb-calendar"))
setBord(getDays(currentMonth, currentYear), currentMonth, currentYear);
monthInput.value = monthName[currentMonth];
yearInput.value = currentYear;

// ------- left right month event hendaler -------
leftMonth.addEventListener("click", () => {
  if (currentMonth == 0) {
    currentMonth = 11;
    if (currentYear > 0) {
      currentYear--;
      setYearInInput(currentYear);
    }
  } else if (currentYear > 0) {
    currentMonth--;
    monthInput.value = monthName[currentMonth];
  }
  setBord(getDays(currentMonth, currentYear), currentMonth, currentYear);
});
rightMonth.addEventListener("click", () => {
  if (currentMonth == 11) {
    currentMonth = 0;
    if (currentYear < 9001) {
      currentYear++;
      setYearInInput(currentYear);
    }
  } else {
    currentMonth++;
    monthInput.value = monthName[currentMonth];
  }
  setBord(getDays(currentMonth, currentYear), currentMonth, currentYear);
});

// -------- input event hendale -----------
monthInput.addEventListener("focusout", (e) => {
  monthInput.setAttribute("type", "text");
  e.target.value = monthName[currentMonth];
});
monthInput.addEventListener("click", (e) => {
  monthInput.setAttribute("type", "number");
  e.target.value =
    currentMonth + 1 < 10 ? `0${currentMonth + 1}` : currentMonth + 1;
  monthInput.select();
});
monthInput.addEventListener("input", (e) => {
  monthInput.setAttribute("type", "number");
  let val = Number(e.target.value);
  if (val > 0 && val < 13) currentMonth = val - 1;
  e.target.value = val;
  setBord(getDays(currentMonth, currentYear), currentMonth, currentYear);
});

//------------------------------------

yearInput.addEventListener("focusout", (e) => {
  setYearInInput(currentYear);
});
yearInput.addEventListener("click", (e) => {
  yearInput.select();
});
yearInput.addEventListener("input", (e) => {
  yearInput.setAttribute("type", "number");
  if (e.target.value > 0 && e.target.value < 9001)
    currentYear = parseInt(e.target.value);
  setBord(getDays(currentMonth, currentYear), currentMonth, currentYear);
});

colorsSelect.forEach((e, i) => {
  e.addEventListener("click", () => {
    colorsSelect.forEach((E) => {
      if (E.classList.contains("select")) {
        E.classList.remove("select");
      }
    });
    selectedColorI = i;
    e.classList.add("select");
  });
});

addMB_span.addEventListener("click", () => {
  let DATE = addNewInput.value.split("-");
  let val = inputMemberName.value;
  let abt = aboutInput.value;
  userData.push({
    moment: val,
    day: DATE[2],
    month: DATE[1],
    year: DATE[0],
    about: abt,
    colorI: selectedColorI,
  });
  localStorage.setItem("sb-calendar", JSON.stringify(userData)); 
  setMemberData();
  setBord(getDays(currentMonth, currentYear), currentMonth, currentYear);
  inputMemberName.value = "";
  addNewInput.value = "2001-07-07";
  selectedColorI = 0;
  main.style.top = `calc(100vh - ${main.clientHeight}px)`;
  openTab.style.bottom = `${main.clientHeight}px`;
  addMemberFlotingWindow.classList.remove("active");
});

//------------------------------------------------
close_flot_tab.addEventListener("click", () => {
  addMemberFlotingWindow.classList.remove("active");
});
openNewMT.addEventListener("click", () => {
  addMemberFlotingWindow.classList.add("active");
});

function setYearInInput(year) {
  yearInput.value =
    year < 10
      ? `000${year}`
      : year < 100
      ? `00${year}`
      : year < 1000
      ? `0${year}`
      : year;
}

//---------------------------------------------------
function setBord(monthStartingDay, month, year) {
  section.innerHTML = "";

  // set days name
  sortDayName.forEach((e) => {
    const n = document.createElement("div");
    n.innerText = e;
    n.classList.add("day-name");
    section.appendChild(n);
  });

  for (let i = 0; i < monthStartingDay % 7; i++) {
    const n = document.createElement("div");
    n.innerText = "";
    n.classList.add("_gap");
    section.appendChild(n);
  }

  // set when lipyer and month is feb
  let newMonth = !(year % 4) && month === 1 ? 29 : months[month];
  for (let i = 1; i <= newMonth; i++) {
    const n = document.createElement("div");
    n.innerText = i;
    n.classList.add("days");
    if (i % 2) {
      n.classList.add("odd");
    }
    if (true) section.appendChild(n);
  }
  if (year === tudayDate.year && month === tudayDate.month) {
    const days = document.querySelectorAll(".days");
    if (days[tudayDate.day].classList.contains("odd")) {
      days[tudayDate.day].classList.remove("odd");
    }
    days[tudayDate.day].classList.add("tuday");
  }
  userData.forEach((e) => {
    if (month + 1 == parseInt(e.month)) {
      const days = document.querySelectorAll(".days")[parseInt(e.day) - 1];
      if (days.classList.contains("odd")) {
        days.classList.remove("odd");
      }
      days.classList.add(`bg${e.colorI}`);
    }
  });
}

//---------------return total days ---------------------
function getDays(month, year) {
  let lipCount = 0,
    allCount = 0;
  for (let i = year; i > 1; i--) {
    if (!(i % 4)) lipCount++;
    else allCount++;
  }

  // adding all years days 0000 to 20..
  let min = 365 * allCount + 366 * lipCount;

  // add extra few days in months
  for (let i = 0; i < month; i++) {
    let mnt = !(year % 4) && i === 1 ? 29 : months[i];
    min += mnt;
  }
  return min;
}

openTab.addEventListener("click", () => {
  if (tabOpenIs) {
    main.style.top = "100vh";
    openTab.style.bottom = 0;
    openTab.classList.remove("active");
  } else {
    main.style.top = `calc(100vh - ${main.clientHeight}px)`;
    openTab.style.bottom = `${main.clientHeight}px`;
    openTab.classList.add("active");
  }
  tabOpenIs = tabOpenIs ? false : true;
});

setMemberData();
function setMemberData() {
  memberList.innerHTML = "";
  userData.forEach((e) => {
    memberList.innerHTML += `
      <div class="members">
        <span>
          <p>${e.moment}</p>
          <small>${e.day}/${e.month}/${e.year}</small>
        </span>
        <div class="delete">Delete</div>
      </div>
    `;
  });
  Delete = document.querySelectorAll(".delete");
  // ----------- delete member ------------
  Delete.forEach((e, i) => {
    e.addEventListener("click", () => {
      userData.splice(i, 1);
      setMemberData();
      localStorage.setItem("sb-calendar", JSON.stringify(userData)); 
      setBord(getDays(currentMonth, currentYear), currentMonth, currentYear);
      main.style.top = `calc(100vh - ${main.clientHeight}px)`;
      openTab.style.bottom = `${main.clientHeight}px`;
    });
  });
}


// localStorage.setItem("sb-calendar", JSON.stringify(userData)); 
