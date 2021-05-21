$(()=>{
  $(document).ready(function(){
    var acc = document.getElementsByClassName("accordion");
    var i;
    
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }});
		 let cardbody=$('#cardbody')
     let logout=$(`#logout`)
     let address=$(`#addaddress`)
     let add1=$('#address')
     let add2=$('#city')
     let add3=$('#country')
     let add4=$('#postalcode')
     let addresslist;
     let addressblock=$(`#addressblock`);
     $.ajax({
      method:'get',
      url:'http://localhost:4444/ecommerce/home/address',
    }).done((data)=>{
      populateaddress(data);
     
    })
     address.click(()=>{
       $.ajax({
         method:'post',
         url:'http://localhost:4444/ecommerce/home/address',
         data:{
            address:add1.val(),
            city:add2.val(),
            country:add3.val(),
            postalcode:add4.val()
         }
       }).done((data)=>{
        populateaddress(data);
        
       })
     })
        $.ajax({
         method:'get',
         url:"http://localhost:4444/ecommerce/account",
       }).done((data)=>{
        if(data!=null){
        console.log(data);
           let t=$(`
                   <h6 class="heading-small text-muted mb-4">User information</h6>
                   <div class="pl-lg-4">
                     <div class="row">
                       <div class="col-lg-6">
                         <div class="form-group focused">
                           <label class="form-control-label" for="input-username">Username</label>
                           <label type="text" id="input-username" class="form-control form-control-alternative" >${data.username}</label>
                         </div>
                       </div>
                       <div class="col-lg-6">
                         <div class="form-group">
                           <label class="form-control-label" for="input-email">Email address</label>
                           <label type="email" id="input-email" class="form-control form-control-alternative" placeholder="jesse@example.com">${data.email}</label>
                         </div>
                       </div>
                     </div>
                     <div class="row">
                       <div class="col-lg-6">
                         <div class="form-group focused">
                           <label class="form-control-label" for="input-first-name">First name</label>
                           <label type="text" id="input-first-name" class="form-control form-control-alternative" >
                             ${data.firstname}
                           </label>
                         </div>
                       </div>
                       <div class="col-lg-6">
                         <div class="form-group focused">
                           <label class="form-control-label" for="input-last-name">Last name</label>
                           <label type="text" id="input-last-name" class="form-control form-control-alternative" >${data.lastname}</label>
                         </div>
                       </div>
                     </div>
                   </div>
                   <hr class="my-4">
                   <!-- Address -->
            `)
          let x=cardbody.last();
          console.log(x);
           
          
           cardbody.prepend(t);
           //cardbody.append(x);
          // cardbody.last().remove();
          }
       })
       logout.click((event)=>{
       event.preventDefault();
       $.ajax({
         method:'get',
         url:"http://localhost:4444/ecommerce/logout"
       }).done(()=>{
                 window.location.href="http://localhost:4444/ecommerce/login"
       })
     })
     function populateaddress(data)
     {
     addressblock.empty();
      for(let i=0;i<data.length;i++)
      {
        let t=$(` <div class="tm-accordion1">
        <button class="accordion1">${i+1}.ADRESS</button>
        <div id="panel"class="panel">
        <div class="pl-lg-4">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group focused">
                <label class="form-control-label" for="input-address">Address</label>
                <label id="input-address" class="form-control form-control-alternative" >${data[i].address}</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-4">
              <div class="form-group focused">
                <label class="form-control-label" for="input-city">City</label>
                <label
                type="text" id="input-city" class="form-control form-control-alternative" >${data[i].city}</label>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="form-group focused">
                <label class="form-control-label" for="input-country">Country</label>
                <label type="text" id="input-country" class="form-control form-control-alternative" >${data[i].country}</label>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="form-group">
                <label class="form-control-label" for="input-country">Postal code</label>
                <label type="number" id="input-postal-code" class="form-control form-control-alternative" >${data[i].postalcode}</label>
              </div>
            </div>
          </div>
        </div>
        </div>
       `)
       addressblock.append(t);
      }
      $(document).ready(function(){
        var acc = document.getElementsByClassName("accordion1");
        var i;
        
        for (i = 0; i < acc.length; i++) {
          acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
              panel.style.maxHeight = null;
            } else {
              panel.style.maxHeight = panel.scrollHeight + "px";
            }
          });
        }});

     }
    })