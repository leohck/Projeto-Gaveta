let id_gaveta = "";
window.onload = function () {
    id_gaveta = sessionStorage.getItem('id_gaveta');
    sessionStorage.clear();
    document.getElementById("gaveta_num").innerHTML = "Gaveta " + id_gaveta;
    popTable();
};

let database = firebase.database();
let dbRef = database.ref('gavetas');

function permitir_usuario() {
    let newlogin = document.getElementById("perm_new_user_input").value;
    if ((newlogin.length === 4)) {
        let confirm_datas = confirm(newlogin + "\n" + "login está correto?");
        if (confirm_datas) {
            dbRef = database.ref("usuarios/" + newlogin);
            let hasLogin = false;
            dbRef.once("value").then(function (snapshot) {
                hasLogin = snapshot.hasChildren();
                if (hasLogin) {
                    let new_login_data = snapshot.val();
                    let new_login_login = new_login_data.login;
                    let new_login_name = new_login_data.nome;
                    dbRef = database.ref('gavetas/' + id_gaveta + '/usuarios/' + newlogin);
                    let loginPermited = false;
                    dbRef.once("value").then(function (snapshot) {
                        loginPermited = snapshot.hasChildren();
                        if (!loginPermited) {
                            dbRef.set({
                                login: new_login_login,
                                nome: new_login_name
                            });
                            alert("acesso ao usuario " + newlogin + " concedido");
                            document.getElementById("perm_new_user_input").value = "";
                            document.getElementById("perm_new_user_input").focus();
                        } else {
                            alert("login ja permitido");
                        }
                    });
                } else {
                    alert("Login não cadastrado no sistema");
                    document.getElementById("perm_new_user_input").value = "";
                    document.getElementById("perm_new_user_input").focus();
                }
            });
        } else {
            alert("Preencha o formulário corretamente");
        }
    }

}

function popTable() {
    dbRef = database.ref('gavetas/' + id_gaveta + '/usuarios');
    dbRef.on('value', function (snapshot) {
        snapshot.forEach(function (_child) {
            let users = _child.val();
            let userLogin = users.login;
            $("#perm_users_table").append(
                "<tr>" +
                "<td>" + users.nome + "</td>" +
                "<td>" + users.login + "</td>" +
                "<td><button id=" + userLogin + " onClick='remover_permissao(this.id)' class='rem_bt'>remover</button></td>" +
                "</tr>"
            );
        });
    });
}


function remover_permissao(clicked_id) {
    if(confirm("Deletar "+clicked_id+"?")) {
        dbRef = database.ref('gavetas/' + id_gaveta + '/usuarios');
        dbRef.child(clicked_id).remove();
        alert("Usuario: " + clicked_id + " removido com sucesso");
    }else{
        alert("operação cancelada, usuario não removido")
    }
}

dbRef.on('child_changed', function () {
    sessionStorage.setItem('id_gaveta', id_gaveta);
    location.reload();
});


dbRef.on('child_removed', function () {
    sessionStorage.setItem('id_gaveta', id_gaveta);
    location.reload();
});

function validate(evt) {
    let theEvent = evt || window.event;
    let key = '';
    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        // Handle key press
        key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    let regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}