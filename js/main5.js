(function ($) {
    "use strict";

    
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');
    
    $('.validate-form').on('submit',function(e){
        e.preventDefault();
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery);
document.querySelector('#createroom').onclick = function(){
    var name,title,address,quantity,phone,remarks="";
    if(name!=null && title!=null && quantity!=null && address!=null && phone!=null){
      name = document.querySelector('#name').value;
      title = document.querySelector('#title').value;
      address = document.querySelector('#add').value;
      quantity = document.querySelector('#quantity').value;
      phone = document.querySelector('#phone').value;
      remark = document.querySelector('#remarks').value;
    
 vali();

            function vali(){
                var user = firebase.auth().currentUser;
         var tgref=firebase.database().ref('orders/');
    var data={
        "name":name,
        "title":title,
        "address":address,
        "quantity":quantity,
        "phone":phone,
        "remark":remark,
         }
     tgref.set(data).then(function(){
            window.open('customer.html#order','_self');   
    });
  
     }
        }
}

firebase.auth().onAuthStateChanged(function(user) {
 
 
   if(!user){

       window.open('index.html','_self');
   } 
    else{
         var user = firebase.auth().currentUser;
       console.log(user.email);
       sessionStorage.setItem("vemkey",user.email);
    }
    
});