var config = {
     apiKey: "AIzaSyBtn3Eu1MmO1pY27Z9H5EiImSyT4vELbbY",
     authDomain: "e-waste-management-6448e.firebaseapp.com",
     databaseURL: "https://e-waste-management-6448e-default-rtdb.firebaseio.com",
     projectId: "e-waste-management-6448e",
     storageBucket: "e-waste-management-6448e.appspot.com",
     messagingSenderId: "295588160955",
     appId: "1:295588160955:web:bc68fb68715a999abe109e"
   };
   // Initialize Firebase
   firebase.initializeApp(config);
   var i=0;
   var user= firebase.auth().currentUser;
   console.log(user);
   var hjcordiref= firebase.database().ref("orders/"+`${localStorage.getItem("uids")}`);
    hjcordiref.orderByChild('title').on("child_added", function(data){
         var newVoke = data.val();
        console.log(data.val());
        if(newVoke.title){
        var uri=`https://sauryaman777.github.io/e-waste-management/studass.html?uid=${localStorage.getItem("uids")}&title=${newVoke.title}`;
        var res=encodeURI(uri);
        var time=newVoke.time;
        if(!time)
        time= new Date();
        var html = "";
          if(newVoke.status=="active")
         {html +=`<div class="col-3 overlay" style="padding:15px;">
          <div class="row">
            <div class="col-6">
              <div class="info" style="display: flex; justify-content: center;align-items: center;flex-direction: column;padding: 9px;">
                <p class="ptitle">${newVoke.title}</p>
                <p class="ptime">${time}</p>
              </div>
            </div>
            <div class="col-6" style="display:flex;align-items: center; justify-content: center;">
            <img src="images/e-waste-management.jpg" class="img-fluid" style="postion:absolute;top:0%;right:0%;">
            </div>
          </div>
          <div class="row">
            <div class="col-12" style="display: flex;flex-wrap:wrap;align-items:center;justify-center: center;">
              <center><a href="vieworders.html"><button type="button" class="btn btn-success">View Details&nbsp;<i class="fa fa-angle-right"></i></button></a></center>
            </div>
          </div>
         
<br>
     </div>
`}
         document.getElementById("classe").innerHTML += html;
        }
    });

var us=document.getElementById("user");
// document.getElementById("create").addEventListener("click",cretef);
// function cretef(){
   
//     window.open('createorder.html','_self');

// }

document.getElementById("log").addEventListener("click",logo);
function logo(){
   
    firebase.auth().signOut();

}

firebase.auth().onAuthStateChanged(function(user) {

  if(!user){

      window.open('index1.html','_self');
  }     
});
