function DodiValidation(fName) {
    let vResult = false;
    ClearAlert(fName);
    keyupChangeFunc(fName);
    vResult = validRun(fName);
    return vResult;
}

// KEYUP & CHANGE
function keyupChangeFunc(getFname) {
    var DodiValidation = document.querySelectorAll("#" + getFname + " .DodiValidation");
    DodiValidation.forEach(keyupEl => {
        keyupEl.onkeyup = function() { validRun(getFname) };
        keyupEl.onchange = function() { validRun(getFname) };
    });
}

function validRun(Fname) {
    let vResult = false;
    let vResultCount = 0;

    ClearAlert(Fname);
    keyupChangeFunc(Fname);
    var DodiValidation = document.querySelectorAll("#" + Fname + " .DodiValidation");

    // console.log(DodiValidation);

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
        if (typeof(element.files[0]) != "undefined") {
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
        if (typeof(element.files[0]) != "undefined") {
            var filetype = element.getAttribute("file-type");
            var fileInput = element
            var filePath = fileInput.value;
            addfiletype = new RegExp(filetype, 'g');
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
    // Get the name attribute
    const nameRadio = element.getAttribute("name");
    if (!nameRadio) return true; // Skip validation if no name attribute

    // Get the alert container id
    const alertname = element.getAttribute("dodi-alert");
    if (!alertname) return true; // Skip validation if no alert container specified

    // Get the alert container element
    const alertContainer = document.getElementById(alertname);
    if (!alertContainer) return true; // Skip validation if container doesn't exist

    // Check if any radio button is selected
    const selected = document.querySelectorAll(`input[name="${nameRadio}"]:checked`);
    
    // Get existing error message if any
    const existingError = alertContainer.querySelector('.DodiError');

    if (selected.length === 0) {
        // Only add error message if it doesn't already exist
        if (!existingError) {
            const dodiVradio = alertContainer.getAttribute("dodi-required-text");
            const markupradio = `<div class="DodiError">${dodiVradio}</div>`;
            alertContainer.insertAdjacentHTML("beforeend", markupradio);
        }
        return false;
    } else {
        // Remove error message if it exists and a radio is selected
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
        let multiselected = document.querySelectorAll("input[MultiCheckCatch=" + multichecklist + "]:checked");
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
                document.getElementById(CheckCatch).parentNode.insertAdjacentHTML("beforeend", markupcheck);
                return false;
            }
        } else {
            return true;
        }
    }
}

// SELECT REQUIRED
function requiredSelect(element) {
    if (element.getAttribute('dodi-required-text') != null) {
        var selectfirstelement = element.value;
        var selectcatchelement = element.getAttribute('dodi-select-validate');

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

// TC KİMLİK
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
                    hatali = [11111111110, 22222222220, 33333333330, 44444444440, 55555555550, 66666666660, 7777777770, 88888888880, 99999999990];;

                if (TCNO.length != 11) return false;
                if (isNaN(TCNO)) return false;
                if (TCNO[0] == 0) return false;

                tek = parseInt(TCNO[0]) + parseInt(TCNO[2]) + parseInt(TCNO[4]) + parseInt(TCNO[6]) + parseInt(TCNO[8]);
                cift = parseInt(TCNO[1]) + parseInt(TCNO[3]) + parseInt(TCNO[5]) + parseInt(TCNO[7]);

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
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
        textbox.addEventListener(event, function() {
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

OnlyNumb.forEach(element => {
    setInputFilter(element, function(value) {
        return /^\d*$/.test(value);
    });
});

//PHONE FORMAT
var PhoneFormat = document.querySelectorAll('[PhoneFormat="1"]');
PhoneFormat.forEach(element => {
    element.addEventListener('input', function(y) {
        var a = y.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
        y.target.value = !a[2] ? a[1] : '(' + a[1] + ') ' + a[2] + (a[3] ? ' ' + a[3] : '') + (a[4] ? ' ' + a[4] : '');

    });
});

// CLEAR ERROR
function ClearAlert(aaa) {
    var DodiError = document.querySelectorAll("#" + aaa + "  .DodiError");
    DodiError.forEach(Errorelement => {
        Errorelement.remove();
    });
}