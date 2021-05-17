document.querySelector("#createroom").onclick = function(){
    var d= new Date();
let name1,title,address,quantity,phone,remarks="";    
vali();
            function vali(){
                name1 = document.querySelector('#name').value;
                title = document.querySelector('#title').value;
                address = document.querySelector('#add').value;
                quantity = document.querySelector('#quantity').value;
                phone = document.querySelector('#phone').value;
                remark = document.querySelector('#remarks').value;
                if(name1!=null && title!=null && quantity!=null && address!=null && phone!=null){
                var user = firebase.auth().currentUser;
         var tgref=firebase.database().ref(`${user.uid}/${document.getElementById("title").value}`);
    var data={
        "name":name1,
        "title":title,
        "address":address,
        "quantity":quantity,
        "phone":phone,
        "remark":remark,
         "time":d,
         }
     tgref.set(data).then(function(){
             window.location.href="customer.html#order";  
    });
  
     }
    }
}
firebase.auth().onAuthStateChanged(function(user) {
 
 
   if(!user){

       window.location.href="index.html";
   } 
    else{
         var user = firebase.auth().currentUser;
       console.log(user.email);
       sessionStorage.setItem("vemkey",user.email);
    }
    
});