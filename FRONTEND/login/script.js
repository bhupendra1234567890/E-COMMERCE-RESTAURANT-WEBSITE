let email=$('#email1')
let password=$('#password')
let button=$('#signin')
$(()=>{
 
 
  button.click((event)=>{

    event.preventDefault();
  $.ajax({
      method:'POST',
      url:"http://localhost:4444/ecommerce/login",
      data:{
        email:email.val(),
        password:password.val(),
      }
    
  }).done((p)=>{
    let l=(p==='YES')
        console.log(l);
    if(l)
    {
    
      console.log('hii');
      window.location.href="http://localhost:4444/ecommerce/home";
    }
    else{
     
      window.location.href="http://localhost:4444/ecommerce/login";
      
    }
    
    })
    ;}
  )

            
  
})