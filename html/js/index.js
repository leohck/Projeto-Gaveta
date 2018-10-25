firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
	document.getElementById("user_div").style.display = "block";
	document.getElementById("login_div").style.display = "none";
	let user = firebase.auth().currentUser;
	if(user != null){
		let email_id = user.email;
		document.getElementById("user_para").innerHTML = "Admin: "+email_id;
	}
  } else {
    // No user is signed in.
	document.getElementById("user_div").style.display = "none";
	document.getElementById("login_div").style.display = "block";
  }
});

function login(){

  let userEmail = document.getElementById("email_field").value;
  let userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function(user) {
  let userlogged = firebase.auth().currentUser;
      if(userlogged != null){
          if(userlogged.uid != "lfTcnN2s7EVh7s97tlammNWDZVo1") {
              alert("Este email não é de administrador"+ "\n" +userlogged.email);
              logout();
          }
      }
  }, function (error) {
      // Handle Errors here.
      let errorCode = error.code;

      switch (errorCode) {
          case "auth/invalid-email":
              window.alert("Erro: Email inválido");
              break;

          case "auth/user-not-found":
              window.alert("Erro: Usuário não cadastrado");
              break;

          case "auth/wrong-password":
              window.alert("Erro: Senha incorreta");
              break;
      }
  });
}

function logout(){
  firebase.auth().signOut();
}



