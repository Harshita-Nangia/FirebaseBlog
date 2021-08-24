function signUp(){

    var name= document.getElementById("name");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    console.log(name.value);
    firebase
  .auth()
  .createUserWithEmailAndPassword(email.value, password.value)
  .then((res) => {
    const user = firebase.auth().currentUser;

    
    if (user != null) {
        user.updateProfile({
            displayName: name.value
        }).then(() => {
          
            window.location = 'index.html';
        }).catch((error) => {
          console.log(error);
        });
    } else {
      alert("Some error has occured");
    }

  }
  ).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    // ...
  });
    
}

function signIn(){

var email = document.getElementById("email");
var password = document.getElementById("password");

firebase
  .auth()
  .signInWithEmailAndPassword(email.value, password.value)
  .then((res) => {
   
    window.location = 'blogs.html';
   
  }
  ).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    
  });
}

function googleSignIn(){
base_provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithPopup(base_provider).then(function(result){
  console.log(result);
  alert("Success..Signed in with google");
  window.location = 'blogs.html';
}).catch(function(err){
  console.log(err);
  alert("Failed");

});
}