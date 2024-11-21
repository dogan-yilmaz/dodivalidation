function DodiValidation(fName) {
  let vResult = false;
  ClearAlert(fName);
  keyupChangeFunc(fName);
  vResult = validRun(fName);
  return vResult;
}

// KEYUP & CHANGE
function keyupChangeFunc(getFname) {
  var DodiValidation = document.querySelectorAll(
    "#" + getFname + " .DodiValidation"
  );
  DodiValidation.forEach((keyupEl) => {
    keyupEl.onkeyup = function () {
      validRun(getFname);
    };
    keyupEl.onchange = function () {
      validRun(getFname);
    };
  });
}

function validRun(Fname) {
  let vResult = false;
  let vResultCount = 0;

  ClearAlert(Fname);
  keyupChangeFunc(Fname);
  var DodiValidation = document.querySelectorAll(
    "#" + Fname + " .DodiValidation"
  );

  DodiValidation.forEach((element) => {
    switch (TipBul(element)) {
      case "text":
        if (required(element) == false) {
          vResultCount++;
        }

        if (minlength(element) == false) {
          vResultCount++;
        }

        if (tckimlik(element) == false) {
          vResultCount++;
        }
        break;

      case "email":
        if (required(element) == false) {
          vResultCount++;
        }

        if (email(element) == false) {
          vResultCount++;
        }
        break;

      case "password":
        if (required(element) == false) {
          vResultCount++;
        }

        if (minlength(element) == false) {
          vResultCount++;
        }

        if (password(element) == false) {
          vResultCount++;
        }
        break;

      case "date":
        if (required(element) == false) {
          vResultCount++;
        }
        break;

      case "file":
        if (required(element) == false) {
          vResultCount++;
        }

        if (filesize(element) == false) {
          vResultCount++;
        }

        if (filetype(element) == false) {
          vResultCount++;
        }
        break;

      case "SELECT":
        if (requiredSelect(element) == false) {
          vResultCount++;
        }
        break;
      case "checkbox":
        if (requiredCheckbox(element) == false) {
          vResultCount++;
        }

        if (requiredCheckboxList(element) == false) {
          vResultCount++;
        }
        break;

      case "radio":
        if (requiredRadio(element) == false) {
          vResultCount++;
        }
        break;

      case "TEXTAREA":
        if (required(element) == false) {
          vResultCount++;
        }
    }
  });

  if (vResultCount > 0) {
    vResult = false;
  } else {
    vResult = true;
  }
  return vResult;
}

function TipBul(obj) {
  if (obj.tagName == "INPUT") {
    return obj.attributes.type.nodeValue;
  } else {
    return obj.tagName;
  }
}

// TEXTBOX REQUIRED
function required(element) {
  if (element.getAttribute("dodi-required-text") != null) {
    if (element.value == "") {
      const dodiVtext = element.getAttribute("dodi-required-text");
      const markuptext = `<div class="DodiError" dodierrorrequired="1">${dodiVtext}</div>`;
      element.insertAdjacentHTML("afterend", markuptext);
      element.classList.add("DodiAlert");
      return false;
    } else {
      element.classList.remove("DodiAlert");
      return true;
    }
  }
}

//FILE SIZE
function filesize(element) {
  if (element.getAttribute("max-file-size") != null) {
    var getElmaxSize = parseInt(element.getAttribute("max-file-size"));
    console.log(typeof element.files[0]);
    if (typeof element.files[0] != "undefined") {
      var size = parseFloat(element.files[0].size / (1024 * 1024)).toFixed(2);

      if (size > getElmaxSize) {
        const dodiVfilemaxsize = element.getAttribute("max-file-size-text");
        const markupfilemaxsize = `<div class="DodiError" dodierrorrequired="1">${dodiVfilemaxsize}</div>`;
        element.insertAdjacentHTML("afterend", markupfilemaxsize);
        element.classList.add("DodiAlert");
        return false;
      } else {
        return true;
      }
    }
  }
}

// FILE TYPE
function filetype(element) {
  if (element.getAttribute("file-type") != null) {
    if (typeof element.files[0] != "undefined") {
      var filetype = element.getAttribute("file-type");
      var fileInput = element;
      var filePath = fileInput.value;
      addfiletype = new RegExp(filetype, "g");
      var allowedExtensions = addfiletype;
      if (!allowedExtensions.test(filePath)) {
        const dodiVfiletype = element.getAttribute("file-type-text");
        const markupfiletype = `<div class="DodiError" dodierrorrequired="1">${dodiVfiletype}</div>`;
        element.insertAdjacentHTML("afterend", markupfiletype);
        element.classList.add("DodiAlert");
        return false;
      } else {
        return true;
      }
    }
  }
}

//RADIO REQUIRED
function requiredRadio(element) {
  const nameRadio = element.getAttribute("name");
  if (!nameRadio) return true;

  const alertname = element.getAttribute("dodi-alert");
  if (!alertname) return true;

  const alertContainer = document.getElementById(alertname);
  if (!alertContainer) return true;

  const selected = document.querySelectorAll(
    `input[name="${nameRadio}"]:checked`
  );

  const existingError = alertContainer.querySelector(".DodiError");

  if (selected.length === 0) {
    if (!existingError) {
      const dodiVradio = alertContainer.getAttribute("dodi-required-text");
      const markupradio = `<div class="DodiError">${dodiVradio}</div>`;
      alertContainer.insertAdjacentHTML("beforeend", markupradio);
    }
    return false;
  } else {
    if (existingError) {
      existingError.remove();
    }
    return true;
  }
}

//CHECKLIST REQUIRED
function requiredCheckboxList(element) {
  let multichecklist = element.getAttribute("MultiCheckCatch");
  if (multichecklist != null) {
    let multiselected = document.querySelectorAll(
      "input[MultiCheckCatch=" + multichecklist + "]:checked"
    );
    let container = document.getElementById(multichecklist);

    if (multiselected.length == 0) {
      const dodiVmulticheck = container.getAttribute("dodi-required-text");
      const markupmulticheck = `<div class="DodiError">${dodiVmulticheck}</div>`;

      if (!container.querySelector(".DodiError")) {
        container.insertAdjacentHTML("beforeend", markupmulticheck);
      }
      return false;
    } else {
      let existingError = container.querySelector(".DodiError");
      if (existingError) {
        existingError.remove();
      }
      return true;
    }
  }
}

// CHECKBOX REQUIRED
function requiredCheckbox(element) {
  if (element.getAttribute("CheckCatch") != null) {
    if (element.checked == false) {
      var CheckCatch = element.getAttribute("CheckCatch");
      if (CheckCatch != null) {
        const dodiVcheck = element.getAttribute("dodi-required-text");
        const markupcheck = `<div class="DodiError">${dodiVcheck}</div>`;
        document
          .getElementById(CheckCatch)
          .parentNode.insertAdjacentHTML("beforeend", markupcheck);
        return false;
      }
    } else {
      return true;
    }
  }
}

// SELECT REQUIRED
function requiredSelect(element) {
  if (element.getAttribute("dodi-required-text") != null) {
    var selectfirstelement = element.value;
    var selectcatchelement = element.getAttribute("dodi-select-validate");

    if (selectfirstelement == selectcatchelement || element.value == "") {
      const dodiVselect = element.getAttribute("dodi-required-text");
      const markupselect = `<div class="DodiError">${dodiVselect}</div>`;
      element.insertAdjacentHTML("afterend", markupselect);
      element.classList.add("DodiAlert");
      return false;
    } else {
      element.classList.remove("DodiAlert");
      return true;
    }
  }
}

// TEXTBOX MIN-LENGTH
function minlength(element) {
  if (element.getAttribute("minlength") != null) {
    const minLength = element.getAttribute("minlength");
    if (element.value.length < minLength) {
      const dodiVLengthtext = element.getAttribute("dodi-length-text");
      const markupTextLength = `<div class="DodiError" DodiErrorMinLength="1">${dodiVLengthtext}</div>`;
      element.insertAdjacentHTML("afterend", markupTextLength);
      element.classList.add("DodiAlert");
      return false;
    } else {
      element.classList.remove("DodiAlert");
      return true;
    }
  }
}

// PASSWORD
function password(element) {
  if (element.getAttribute("dodi-repasword") == "2") {
    var password_1 = document.querySelectorAll('[dodi-repasword="1"]')[0].value;
    var password_2 = element.value;

    if (password_1 != password_2) {
      const dodiVrepassword = element.getAttribute("dodi-repassword-text");
      const markupPassword = `<div class="DodiError">${dodiVrepassword}</div>`;
      element.insertAdjacentHTML("afterend", markupPassword);
      element.classList.add("DodiAlert");
      return false;
    } else {
      if (password_2 != "") {
        element.classList.remove("DodiAlert");
      }
      return true;
    }
  }
}

// EMAIL
function email(element) {
  if (element.value.length > 0) {
    var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (element.value.match(validRegex)) {
      element.classList.remove("DodiAlert");
      return true;
    } else {
      const dodiVemail = element.getAttribute("dodi-email-text");
      const markupemail = `<div class="DodiError">${dodiVemail}</div>`;
      element.insertAdjacentHTML("afterend", markupemail);
      element.classList.add("DodiAlert");

      return false;
    }
  }
}

// TC KIMLIK
function tckimlik(element) {
  if (element.getAttribute("dodi-tc-text") != null) {
    if (element.value.length == 11) {
      TCNO = element.value;

      function TCNOKontrol(TCNO) {
        var tek = 0,
          cift = 0,
          vResult = 0,
          TCToplam = 0,
          i = 0,
          hatali = [
            11111111110, 22222222220, 33333333330, 44444444440, 55555555550,
            66666666660, 7777777770, 88888888880, 99999999990,
          ];

        if (TCNO.length != 11) return false;
        if (isNaN(TCNO)) return false;
        if (TCNO[0] == 0) return false;

        tek =
          parseInt(TCNO[0]) +
          parseInt(TCNO[2]) +
          parseInt(TCNO[4]) +
          parseInt(TCNO[6]) +
          parseInt(TCNO[8]);
        cift =
          parseInt(TCNO[1]) +
          parseInt(TCNO[3]) +
          parseInt(TCNO[5]) +
          parseInt(TCNO[7]);

        tek = tek * 7;
        vResult = Math.abs(tek - cift);
        if (vResult % 10 != TCNO[9]) return false;

        for (var i = 0; i < 10; i++) {
          TCToplam += parseInt(TCNO[i]);
        }

        if (TCToplam % 10 != TCNO[10]) return false;

        if (hatali.toString().indexOf(TCNO) != -1) return false;

        return true;
      }

      if (TCNOKontrol(TCNO)) {
        element.classList.remove("DodiAlert");
        return true;
      } else {
        const dodiVtc = element.getAttribute("dodi-tc-text");
        const markup7 = `<div class="DodiError">${dodiVtc}</div>`;
        element.insertAdjacentHTML("afterend", markup7);
        element.classList.add("DodiAlert");
        return false;
      }
    }
  }
}

// ONLY NUMBER
function setInputFilter(textbox, inputFilter) {
  [
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mouseup",
    "select",
    "contextmenu",
    "drop",
  ].forEach(function (event) {
    textbox.addEventListener(event, function () {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}

var OnlyNumb = document.querySelectorAll('[OnlyNumb="1"]');

OnlyNumb.forEach((element) => {
  setInputFilter(element, function (value) {
    return /^[\d.,]*$/.test(value);
  });
});

//ONLY TEXT
function setInputFilter(textbox, inputFilter) {
  [
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mouseup",
    "select",
    "contextmenu",
    "drop",
  ].forEach(function (event) {
    textbox.addEventListener(event, function () {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}

var OnlyText = document.querySelectorAll('[OnlyText="1"]');

OnlyText.forEach((element) => {
  setInputFilter(element, function (value) {
    return /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]*$/.test(value);
  });
});

//PHONE FORMAT
var PhoneFormat = document.querySelectorAll('[PhoneFormat="1"]');
PhoneFormat.forEach((element) => {
  element.addEventListener("input", function (y) {
    var a = y.target.value
      .replace(/\D/g, "")
      .match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    y.target.value = !a[2]
      ? a[1]
      : "(" +
        a[1] +
        ") " +
        a[2] +
        (a[3] ? " " + a[3] : "") +
        (a[4] ? " " + a[4] : "");
  });
});

// CLEAR ERROR
function ClearAlert(aaa) {
  var DodiError = document.querySelectorAll("#" + aaa + "  .DodiError");
  DodiError.forEach((Errorelement) => {
    Errorelement.remove();
  });
}

//CREDIT CARD
function formatCreditCard() {
  let creditCardInput = document.querySelector(".creditCard");

  function formatNumber(value) {
    let numbers = value.replace(/\D/g, "");

    numbers = numbers.substring(0, 16);

    let formatted = numbers.replace(/(\d{4})(?=\d)/g, "$1 ");

    return formatted;
  }

  creditCardInput.addEventListener("input", function (e) {
    let cursorPosition = this.selectionStart;
    let originalLength = this.value.length;
    let formatted = formatNumber(this.value);

    this.value = formatted;

    if (cursorPosition === originalLength) {
      cursorPosition = this.value.length;
    }
    this.setSelectionRange(cursorPosition, cursorPosition);
  });

  creditCardInput.addEventListener("keypress", function (e) {
    if (!/^\d$/.test(e.key) && e.key !== " ") {
      e.preventDefault();
    }
  });

  creditCardInput.addEventListener("paste", function (e) {
    e.preventDefault();
    let pastedText = (e.clipboardData || window.clipboardData).getData("text");
    this.value = formatNumber(pastedText);
  });
}

formatCreditCard();

// KREDIKARTI SKT
function formatExpiryDate() {
  const expiryInput = document.querySelector(".expiryDate");

  function formatDate(value) {
    let numbers = value.replace(/\D/g, "");

    let month = numbers.substring(0, 2);
    if (month.length === 2) {
      if (parseInt(month) > 12) {
        month = "12";
      } else if (parseInt(month) === 0) {
        month = "01";
      } else if (parseInt(month) < 10 && month[0] !== "0") {
        month = "0" + parseInt(month);
      }
    }

    let year = numbers.substring(2, 4);
    if (year.length === 2) {
      const currentYear = new Date().getFullYear() % 100;
      if (parseInt(year) < currentYear) {
        year = currentYear.toString().padStart(2, "0");
      }
    }

    if (month) {
      if (year) {
        return `${month}/${year}`;
      }
      return month;
    }
    return "";
  }

  function validateDate(month, year) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (year < currentYear) return false;

    if (year == currentYear && month < currentMonth) return false;

    return true;
  }

  expiryInput.addEventListener("input", function (e) {
    let cursorPosition = this.selectionStart;
    let originalLength = this.value.length;
    let formatted = formatDate(this.value);

    this.value = formatted;

    if (formatted.length === 2 && originalLength === 1) {
      cursorPosition++;
    }
    if (cursorPosition === originalLength) {
      cursorPosition = this.value.length;
    }
    this.setSelectionRange(cursorPosition, cursorPosition);

    if (formatted.length === 5) {
      let [month, year] = formatted.split("/");
      if (!validateDate(parseInt(month), parseInt(year))) {
        this.classList.add("invalid");
        console.log("Geçersiz tarih!");
      } else {
        this.classList.remove("invalid");
      }
    }
  });

  expiryInput.addEventListener("keypress", function (e) {
    if (!/^\d$/.test(e.key) && e.key !== "/") {
      e.preventDefault();
    }
  });

  expiryInput.addEventListener("paste", function (e) {
    e.preventDefault();
    let pastedText = (e.clipboardData || window.clipboardData).getData("text");
    this.value = formatDate(pastedText);
  });
}

formatExpiryDate();
