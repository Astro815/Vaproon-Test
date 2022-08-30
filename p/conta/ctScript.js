//const { saveAs } = require("../../js/FileSaver");

function tickUser() {
    qs("nomeUser").innerHTML = dataUser.name;
    qs("dtUser > i").innerHTML = dataUser.ncm;
    qs("generoUser").innerHTML = dataUser.gene;
}

qs("#impPfl").addEventListener('change', function() {
    var file = new FileReader();
    file.onload = () => {
        if (confirm("Você tem certeza que quer importar essa conta?\nA conta atual será substituida e você perderá seus dados.")) {
            dataUser = JSON.parse(file.result);
            updateLS();
        }
    }
    file.readAsText(this.files[0]);
    window.open('./contaPag.html', 'dpl')
});

function exportAccount() {
    let blob = new Blob([JSON.stringify(dataUser)], { type: "text/plain;charset=utf-8" });
    saveAs(blob, String(dataUser.name).replaceAll(" ", "") + ".vpnp");
}

tickUser();