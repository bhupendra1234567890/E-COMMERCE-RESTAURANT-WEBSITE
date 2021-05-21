$(()=>{
  
  let username=$('#username')
  let email=$('#email')
  let password=$('#password')
  let confirmpassword=$('#confirmpassword')

  let button=$('#signup')

  button.click((event)=>{

    event.preventDefault();
    $.ajax({
      method:'POST',
      url:"http://localhost:4444/ecommerce/register",
      data:{
        username:username.val(),
        email:email.val(),
        password:password.val(),
        confirmpassword:confirmpassword.val()
      }
    
  }).done((data)=>{
    console.log('hiii')
    console.log((data)==="yes")
    if((data)==="yes")
    {
      console.log('1');
      window.location.href="http://localhost:4444/ecommerce/login";
    }
    else{
    console.log(data);
  }
  })}
  )
})