var user = firebase.auth().currentUser;
var flag=0;
   console.log(user);
   var hjcordiref= firebase.database().ref("orders/"+`${localStorage.getItem("uids")}`);
   var userrole= firebase.database().ref("userdata/");
   userrole.orderByChild("email").equalTo(`${localStorage.getItem('emails')}`).on("child_added", function(data){
           
    var newVoke=data.val();
    if(newVoke.role=="admin")
    flag=1;
       
   });
   if(flag==1)
    {
      document.getElementsByClassName("home")[0].href="admin.html";
      document.getElementsByClassName("home")[1].href="admin.html";
      document.getElementsByClassName("home")[2].href="admin.html";
      document.getElementById("add-item").style.display="block";
    } 
    else
    {
      document.getElementsByClassName("home")[0].href="customer.html";
      document.getElementsByClassName("home")[1].href="customer.html";
      document.getElementsByClassName("home")[2].href="customer.html";
    }

    hjcordiref.orderByChild('title').on("child_added", function(data){
         var newVoke = data.val();
        console.log(data.val());
        if(newVoke.title){
        var time=newVoke.time;
        if(!time)
        time= new Date();
        if(newVoke.item_to_be_sold)
        {
        var html = "";
        html +=`
         <div class="col-lg-4  col-md-6 d-flex align-items-stretch" data-aos="fade-up">
         <article class="entry">

           <div class="entry-img">
             <img src="images/e-waste-management.jpg" alt="" class="img-fluid">
           </div>

           <h2 class="entry-title">
             ${newVoke.item_to_be_sold}
           </h2>

           <div class="entry-meta">
             <ul>
               <li class="d-flex align-items-center"><i class="icofont-user"></i>${newVoke.name}</li>
               <li class="d-flex align-items-center"><i class="icofont-wall-clock"></i><time>${newVoke.time}</time></a></li>
             </ul>
           </div>

           <div class="entry-content">
             <!-- <p>
               EcoEx, a start-up in the plastic waste management sector, has launched India’s first digital marketplace to facilitate exchange of plastic credit certificates and strengthen the plastic recycling infrastructure, the firm said in a statement on Wednesday.
             </p> -->
             <div id="buy" class="read-more">
             <span id="" style="padding: 6px;background-color:#FF4500;cursor:pointer;">
               Buy Now
             </span>
             </div>
             <center><button type="button" id="${data.key}" class="btn btn-danger"onclick="cancellation(this);">Delete</button></center>
           </div>

         </article><!-- End blog entry -->
       </div>
`

          document.getElementById("classe").innerHTML += html;
        }
        }
    });
    function expand(self){
      var Id = self.getAttribute("id");
      var fId=Id+"fd";
      if(document.getElementById(Id).className=="fa fa-angle-down")
      {
        document.getElementById(Id).className="fa fa-angle-up";
        document.getElementById(fId).style.display="block";
      }
      else if(document.getElementById(Id).className=="fa fa-angle-up")
      {
        document.getElementById(Id).className="fa fa-angle-down";
        document.getElementById(fId).style.display="none";
      }
    }
    function cancellation(self) {
      var Id = self.getAttribute("id");
      // var c=document.getElementById(data.key+"fd").childNodes;
      var pr=confirm("Are you sure you want to cancel?");
      if(pr)
      {
        var db= firebase.database();
        db.ref("orders/"+`${localStorage.getItem("uids")}`+"/"+Id+"/"+"status").set("cancelled");
        
        alert("Your order has been cancelled.\nAny payment made regarding this order will be refunded within 24 hours");  
      }
    }
    
    document.getElementById("log").addEventListener("click",logo);
    function logo(){
       
        firebase.auth().signOut();
    
    }
    
    firebase.auth().onAuthStateChanged(function(user) {
    
      if(!user){
    
          window.open('index1.html','_self');
      }     
    });