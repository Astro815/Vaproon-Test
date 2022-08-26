let dataUser = {
    "name": "Jhon",
    "idade": "22",
    "gene": "m",
    "consultas": [{
            "name": "CoronaVac",
            "data": "12/5/2023",
            "desc": "ir as 9 da manhã",
            "id": "23",
            "dtNum": "123",
            "apply": false
        },
        {
            "name": "Febre Amarela",
            "data": "17/1/2024",
            "desc": "No postinho da esquina",
            "id": "24",
            "dtNum": "1230085469386587",
            "apply": false
        }
    ]
}

let _onAddingVacina = false;
let _btnActAddVac = document.querySelector("#actAddVac");

function tickTable() {
    let agTb = document.querySelector(".AVagendadas > td > ul");
    agTb.innerHTML = "";
    for (let index = (dataUser.consultas.length - 1); index > -1; index--) {
        agTb.innerHTML += "<li id='vac_" + dataUser.consultas[index].id + "' class='" + String(checkTimeVacina(dataUser.consultas[index].dtNum)) + "'><div class='iconVac'><span class='material-icons' style='font-size: 3em;'>event</span></div><div><h3>" + dataUser.consultas[index].name + "</h3><p><i>" + dataUser.consultas[index].data + "</i></p><br><span>" + dataUser.consultas[index].desc + "</span></div></li>";
    }
}

function checkTimeVacina(time, apply) {
    if ((Math.floor(Date.now() / 3600000) * 3600000) - 3600000 > time) {
        if (apply == true) {
            return "tvApliced";
        } else {
            return "tvPass";
        }
    } else {
        if (72000000 + (Math.floor(Date.now() / 3600000) * 3600000) - 3600000 > time) {
            return "tvProximo";
        } else {
            return "tvWaiting";
        }
    }
}

function addConsuta(name, data, desc, dataNum) {
    dataUser.consultas.push({ "name": name, "data": data, "desc": checkDesc(desc), "id": generateId() });
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
    let dt = (Math.floor(Date.now() / 3600000) * 3600000) - 3600000 > data.srcElement.valueAsNumber;
    console.log(!dt)
    document.querySelector("#dateErro").setAttribute("class", "dateError" + dt)
    dt = "";
})

tickSlotVac();

function tickSlotVac() {
    tickTable();
    setTimeout(() => {
        tickSlotVac();
        stop
    }, 1000)
}

navigator.virtualKeyboard.addEventListener('geometrychange', (event) => {
    const { x, y, width, height } = event.target.boundingRect;
    console.log('Virtual keyboard geometry changed:', x, y, width, height);
});