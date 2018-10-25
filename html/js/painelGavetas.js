window.onload = function () {
    getState(1);
    getState(2);
    getState(3);
    getState(4);
};

let database = firebase.database();
let dbRef = database.ref("gavetas");

function getState(id_gaveta) {
    dbRef = database.ref("gavetas/" + id_gaveta);
    dbRef.child('locked').once('value', function (snapshot) {
        document.getElementById("status" + id_gaveta).style.color = (snapshot.val() ? "#ff0006" : "#00be04");
        document.getElementById("status" + id_gaveta).innerHTML = (snapshot.val() ? "Trancada" : "Destrancada");
    })
}

function setState(id_gaveta, state) {
    dbRef = database.ref("gavetas/" + id_gaveta);
    dbRef.child('locked').set(state);
}

dbRef.on('child_changed', function () {
    let gavetas = [1, 2, 3, 4];
    gavetas.forEach(getState);
});


function changePage(id_gaveta) {
    sessionStorage.setItem('id_gaveta', id_gaveta);
    //sessionStorage.getItem('id_gaveta');
    window.location.href = "delegarPermissoes.html";
}