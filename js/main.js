let dataUser = {
    "name": "Jhon",
    "idade": "22",
    "gene": "m",
    "consultas": [
        "23",
        "24"
    ],
    "dataCst": {
        "23": {
            "name": "CoronaVac",
            "data": "12/5/2023",
            "desc": "ir as 9 da manhã",
            "id": "23",
            "dtNum": "123",
            "apply": false
        },
        "24": {
            "name": "Febre Amarela",
            "data": "17/1/2024",
            "desc": "No postinho da esquina",
            "id": "24",
            "dtNum": "1230085469386587",
            "apply": false
        }
    }
}

if (localStorage.getItem("VPNaccount") != "") {
    dataUser = JSON.parse(localStorage.getItem("VPNaccount"));
}

let selectVac = false;

let date = () => { var d = new Date(); return d };
let setIcon = (type) => {
    if (type == "tvApliced") {
        return "event_available";
    } else if (type == "tvPass") {
        return "event_busy";
    } else if (type == "tvProximo") {
        return "date_range";
    } else if (type == "tvWaiting") {
        return "event";
    }
};

let _onAddingVacina = false;
let _btnActAddVac = document.querySelector("#actAddVac");

function tickTable() {
    localStorage.setItem("VPNaccount", JSON.stringify(dataUser));
    let agTb = document.querySelector(".AVagendadas > td > ul");
    agTb.innerHTML = "";
    for (let index = (dataUser.consultas.length - 1); index > -1; index--) {
        agTb.innerHTML += "<a class='select' onclick='startSelect(\"" + dataUser.dataCst[dataUser.consultas[index]].id + "\")'><li codeId='" + dataUser.dataCst[dataUser.consultas[index]].id + "' id='vacItem' class='" + checkTimeVacina(dataUser.dataCst[dataUser.consultas[index]].dtNum) + "'><div class='iconVac'><span class='material-icons' style='font-size: 3em;'>" + setIcon(checkTimeVacina(dataUser.dataCst[dataUser.consultas[index]].dtNum)) + "</span></div><div><h3>" + dataUser.dataCst[dataUser.consultas[index]].name + "</h3><p><i>" + dataUser.dataCst[dataUser.consultas[index]].data + "</i></p><br><span>" + dataUser.dataCst[dataUser.consultas[index]].desc + "</span></div></li>";
    }
}

// text 1 //

function checkTimeVacina(time, apply) {
    if (date() > time) {
        if (apply == true) {
            return "tvApliced";
        } else {
            return "tvPass";
        }
    } else {
        if (date().setDate(date().getDate() + 6) > time) {
            return "tvProximo";
        } else {
            return "tvWaiting";
        }
    }
}

function addConsuta(name, data, desc, dataNum) {
    var preid = generateId();
    dataUser.consultas.push(preid);

    //Json
    v = {
        "name": name,
        "data": data,
        "desc": checkDesc(desc),
        "id": preid,
        "dtNum": dataNum
    }
    dataUser.dataCst[preid] = v;
}

function generateId() {
    let id = Math.random().toString(36).slice(2);
    while (String(JSON.stringify(dataUser.consultas)).replaceAll("\"", "'").search("'id':'" + String(id) + "'") != "-1") {
        id = Math.random().toString(36).slice(2);
    }
    return String(id);
}

function checkDesc(d) {
    if (d == "") {
        return "<i>Sem Descrição</i>";
    } else {
        return d;
    }
}

document.querySelector("#btnConfirmAddConsulte").addEventListener("click", function() {
    // Adicionando Vacina
    const d = document;
    addConsuta(d.getElementById("nameVacAdd").value, d.getElementById("dataVacAdd").value, d.getElementById("descVacAdd").value, d.getElementById("dataVacAdd").valueAsNumber);

    // Clean
    d.getElementById("nameVacAdd").value = "";
    d.getElementById("dataVacAdd").value = "";
    d.getElementById("descVacAdd").value = "";
    _onAddingVacina = false;
    _btnActAddVac.setAttribute("class", "bav_false");
    d.querySelector("#dateErro").setAttribute("class", "dateErrorfalse")

    tickTable();
});

//    //

_btnActAddVac.addEventListener("click", function() {
    _onAddingVacina = !_onAddingVacina;
    _btnActAddVac.setAttribute("class", "bav_" + String(_onAddingVacina));
    var d = document;
    d.getElementById("nameVacAdd").value = "";
    d.getElementById("dataVacAdd").value = "";
    d.getElementById("descVacAdd").value = "";
    d.querySelector("#dateErro").setAttribute("class", "dateErrorfalse")
});

document.querySelector("#dataVacAdd").addEventListener("change", (data) => {
    let dt = date().setDate(date().getDate() - 1) > data.srcElement.valueAsNumber;
    document.querySelector("#dateErro").setAttribute("class", "dateError" + dt)
    dt = "";
})

// --- TICK FRAMES ---

function tickSlotVac() {
    tickTable();
    setTimeout(() => {
        tickSlotVac();
        stop
    }, 10000)
}

tickSlotVac();

// Select Item //

let selectData = {
    "name": document.querySelector("#SVTXTname"),
    "icon": document.querySelector("#SVTXTicon"),
    "desc": document.querySelector("#SVTXTdesc"),
    "data": document.querySelector("#SVTXTdata")
};

let selectIsActive = false;
let selectId = null;

function startSelect(id) {
    selectIsActive = !selectIsActive;
    if (selectIsActive) {
        selectId = id;
        document.querySelector("#SVTXTname").innerText = dataUser.dataCst[id].name;
        document.querySelector("#SVTXTdesc").innerHTML = dataUser.dataCst[id].desc;
        document.querySelector("#SVTXTdata").innerText = dataUser.dataCst[id].data;
        document.querySelector("#SVTXTicon").innerText = setIcon(checkTimeVacina(dataUser.dataCst[id].dtNum));
        document.querySelector(".selectVacina").classList.replace("no-select", "select");
    } else {
        document.querySelector(".selectVacina").classList.replace("select", "no-select");
    }

}

function delVacina() {
    if (selectIsActive) {
        dataUser.consultas.pop(selectId);
        delete dataUser.dataCst[selectId];
        startSelect(null);
        tickTable();
    }
}