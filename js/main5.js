document.querySelector("#createroom").onclick = function(){
    var d= new Date();
    var format=d.getDate()+" / "+(d.getMonth()+1)+" / "+d.getFullYear()+" "+(d.getHours())+" : "+(d.getMinutes()+1)+" : "+(d.getSeconds()+1)+" GMT +0530 (Indian Standard Time)";
let name1,title,address,quantity="",phone,remark="",status="active",item_sell="",description="";    
vali();
            function vali(){
                name1 = document.querySelector('#name').value;
                title = document.querySelector('#title').value;
                address = document.querySelector('#add').value;
                quantity = document.querySelector('#quantity').value;
                phone = document.querySelector('#phone').value;
                remark = document.querySelector('#remarks').value;
                item_sell= document.querySelector('#desci').value;
                description=document.querySelector('#describee').value;
                if(name1!=null && title!=null && quantity!=null && address!=null && phone!=null){
                var user = firebase.auth().currentUser;
         var tgref=firebase.database().ref("orders/"+`${user.uid}/${document.getElementById("title").value}`);
    var data={
        "name":name1,
        "title":title,
        "address":address,
        "quantity":quantity,
        "phone":phone,
        "remark":remark,
        "time":format,
        "item_to_be_sold":item_sell,
        "description":description,
        "status":status,
         }
     tgref.set(data).then(function(){
        var cliref1 = firebase.database().ref('userdata/');
        var cliref2 = firebase.database().ref('orders/'+`${localStorage.uids}`);
        cliref1.on("child_added",function(snapshot) {
          if(snapshot.val().email==localStorage.emails)
          {
            if(snapshot.val().type=="monthly")
            {
                alert("You dont have to pay since you have subscribed to our monthly plan");
                window.location.href="customer.html#order";
            }
            else if(snapshot.val().type=="premium")
            {
                alert("You dont have to pay since you have subscribed to our premium plan");
                window.location.href="customer.html#order";
            }
            else if(!(cliref2.hasChildren()))
            {
                alert("You dont have to pay since the first pickup is free");
                window.location.href="customer.html#order";
            }
            else {
                localStorage.setItem('money',200);
                window.location.href="payment.html";  
            }            
          }
  
  });
             
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
       localStorage.setItem("vemkey",user.email);
    }
    
});