
let database = firebase.database();
let dbRef = database.ref("usuarios");

dbRef.on('value', function(snapshot){
    snapshot.forEach(function(_child){
        let users = _child.val();
        var userLogin = users.login;
        $("#usersTable").append(
            "<tr class='row100 body'>"+
                "<td class='cell100 column1'>"+users.nome+"</td>"+
                "<td class='cell100 column2'>"+users.login+"</td>"+
                "<td class='cell100 column3'>"+users.senha+"</td>"+
                "<td class='cell100 column4'><button id=" +userLogin+ " onClick='apagar(this.id)'>remover</button></td>" +
                "<td class='cell100 column4'><button  onclick='changeToAlterar("+userLogin+")'>alterar</button></td>"+
            "</tr>"
        );
    });
});


//
// "<tr class='row100 body'>"+
// "<td class='cell100 column1'>"+users.nome+"</td>"+
// "<td class='cell100 column2'>"+users.login+"</td>"+
// "<td class='cell100 column3'>"+users.senha+"</td>"+
// "<td><button id=" +userLogin+ " onClick='reply_click(this.id)'>remover</button></td>" +
// "</tr>"

function changeToAlterar(rec_login) {
    sessionStorage.setItem('id_alterar', rec_login);
    location.href = "alterarDados.html";
}


function apagar(clicked_id)
{
    dbRef.child(clicked_id).remove();
    alert("Usuario: " +clicked_id+ " removido com sucesso");
}

dbRef.on('child_changed', function() {
    location.reload();
});


dbRef.on('child_removed', function() {
    location.reload();
});

// dbRef.once('child_added', function () {
//     location.reload();
// });

(function ($) {
    "use strict";
    $('.column100').on('mouseover',function(){
        var table1 = $(this).parent().parent().parent();
        var table2 = $(this).parent().parent();
        var verTable = $(table1).data('vertable')+"";
        var column = $(this).data('column') + "";

        $(table2).find("."+column).addClass('hov-column-'+ verTable);
        $(table1).find(".row100.head ."+column).addClass('hov-column-head-'+ verTable);
    });

    $('.column100').on('mouseout',function(){
        var table1 = $(this).parent().parent().parent();
        var table2 = $(this).parent().parent();
        var verTable = $(table1).data('vertable')+"";
        var column = $(this).data('column') + "";

        $(table2).find("."+column).removeClass('hov-column-'+ verTable);
        $(table1).find(".row100.head ."+column).removeClass('hov-column-head-'+ verTable);
    });
})(jQuery);