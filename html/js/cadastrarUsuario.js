function cadastrar(){

    let name = document.getElementById("registeruser_name_field").value;
    let login = document.getElementById("registeruser_login_field").value;
    let pass = document.getElementById("registeruser_password_field").value;

    let database = firebase.database();


    if((name.length >= 3) && (login.length === 4) && (pass.length === 4)){
        let confirm_datas = confirm(name+"\n"+login+"\n"+pass+"\n"+"dados corretos?");
        if(confirm_datas) {
            let dbRef = database.ref("usuarios/" + login);
            let hasLogin = false;
            dbRef.once("value").then(function (snapshot) {
                hasLogin = snapshot.hasChildren();
                if (hasLogin === false) {
                    dbRef.set({
                        login: login,
                        nome: name,
                        senha: pass
                    }).then(function () {
                        alert("usuario cadastrado");
                        document.getElementById("registeruser_name_field").value = "";
                        document.getElementById("registeruser_login_field").value = "";
                        document.getElementById("registeruser_password_field").value = "";
                        document.getElementById("registeruser_name_field").focus();
                    }, function (error) {
                        alert("error:" + error.message);
                    });
                } else {
                    alert("login já existe");
                    document.getElementById("registeruser_login_field").focus();
                }
            });
        }


    } else { alert("Preencha o formulário corretamente"); }
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