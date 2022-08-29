function tickUser() {
    qs("nomeUser").innerHTML = dataUser.name;
    qs("dtUser > i").innerHTML = dataUser.ncm;
    qs("generoUser").innerHTML = dataUser.gene;
}

tickUser();