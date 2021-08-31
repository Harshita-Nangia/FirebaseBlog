// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDNNCtxCzfqRICTO3bThUNoLPPQr3UgAjs",
    authDomain: "myblog-dec51.firebaseapp.com",
    databaseURL: "https://myblog-dec51-default-rtdb.firebaseio.com",
    projectId: "myblog-dec51",
    storageBucket: "myblog-dec51.appspot.com",
    messagingSenderId: "317136384334",
    appId: "1:317136384334:web:f6744db489d48938f96e1f",
    measurementId: "G-BNXT8BH29D"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let postCollection = document.querySelector("#posts-collection");

  const db = firebase.firestore();
  
  initApp = function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var currentUser = firebase.auth().currentUser;
        console.log(currentUser);
        console.log(currentUser.uid);

      } else {
    window.location = 'index.html';
    // alert("Login first");
      }
    }, function(error) {
      console.log(error);
    });
    
  };
  function createPost(title,creator, time, content) {
    let div = document.createElement("div");
    div.setAttribute("class", "col-md-3");
  
    let h2 = document.createElement("h2");
    let h5 = document.createElement("h5");
    let p = document.createElement("p");
    let small = document.createElement("small");
  
    h2.textContent = title;
    h5.textContent= creator;
    small.textContent = time;
    p.textContent = content;
  
    div.appendChild(h2);
    div.appendChild(h5);
    div.appendChild(small);
    div.appendChild(p);
  
    postCollection.appendChild(div);
  }
  
  // Get Posts
  function getPosts() {
    db.collection("posts")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(docs => {
          createPost(
            docs.data().postName,
            docs.data().author,
            docs.data().createdAt,
            docs.data().postContent
          );
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  getPosts();

  // logout
  function logout(){
    firebase.auth().signOut();
    window.location='index.html';
  }
