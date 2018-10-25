var id_alterar = "";
window.onload = function(){
    id_alterar = sessionStorage.getItem('id_alterar');
    sessionStorage.clear();
    if(id_alterar !== null){
        document.getElementById("search_login_field").value = id_alterar;
        pesquisar();
    }
};



let database = firebase.database();

function pesquisar(){
    let search_login = document.getElementById("search_login_field").value;
    if(search_login.length === 4) {

        let dbRef = database.ref("usuarios/" + search_login);
        let hasLogin = false;
        dbRef.once("value").then(function (snapshot) {
            hasLogin = snapshot.hasChildren();
            let dados = snapshot.val();
            if (hasLogin === true) {
                document.getElementById("search_login_field").disabled = true;
                document.getElementById("searcheduser_name_field").focus();
                document.getElementById("searcheduser_name_field").value = dados.nome;
                document.getElementById("searcheduser_login_field").value = dados.login;
                document.getElementById("searcheduser_password_field").value = dados.senha;
            } else {
                alert("Usuário não cadastrado");
                document.getElementById("search_login_field").value = "";
                document.getElementById("search_login_field").focus();
            }
        });
    } else {
        alert("Preencha o login corretamente");
    }

}


function salvar(){
    let name = document.getElementById("searcheduser_name_field").value;
    let login = document.getElementById("searcheduser_login_field").value;
    let pass = document.getElementById("searcheduser_password_field").value;
    let searched_login = document.getElementById("search_login_field").value;

    if((name.length >= 3) && (login.length === 4) && (pass.length === 4)){
        let confirm_datas = confirm(name+"\n"+login+"\n"+pass+"\n"+"dados corretos?");
        if(confirm_datas) {

            let dbRef = database.ref("usuarios/" + login);
            let dbRef1 = database.ref("usuarios");
            let hasLogin = false;

            dbRef.once("value").then(function (snapshot){
                hasLogin = snapshot.hasChildren();
                if(!hasLogin) {
                    dbRef1.child(searched_login).remove();
                    dbRef.set({
                        login: login,
                        nome: name,
                        senha: pass
                    }).then(function () {
                        alert("dados alterados");
                        limpar();
                    }, function (error) {
                        alert("error:" + error.message);
                    });
                } else if(searched_login===login){
                    dbRef.set({
                        login: login,
                        nome: name,
                        senha: pass
                    });
                    alert("dados alterados");
                    limpar();
                } else {alert("Este login já esta sendo usado")}
            });
        }
    } else { alert("Preencha o formulário corretamente"); }
}



function limpar(){
    document.getElementById("search_login_field").value = "";
    document.getElementById("searcheduser_name_field").value = "";
    document.getElementById("searcheduser_login_field").value = "";
    document.getElementById("searcheduser_password_field").value = "";
    document.getElementById("search_login_field").focus();
    document.getElementById("search_login_field").disabled = false;

}

function validate(evt) {
    let theEvent = evt || window.event;
    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    let regex = /[0-9]|\./;
    if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
}

