

$(()=>{
  let adddish=$('#add')
  let name=$('#name')
  let type=$('#type')
  let image_url=$('#image_url')
  let discription=$('#discription')
  let price=$('#price')
  let starters=$('#tm-gallery-page-pizza')
  let prev=$('#s')
  let main=$('#tm-gallery-page-salad')
  let desserts=$('#tm-gallery-page-noodle')
  
  main.empty()
  starters.empty()
  desserts.empty()
 
 
  main.hide()
  desserts.hide()
  
  $.ajax({
    method:'GET',
    url:"http://localhost:4444/ecommerce/home/menu",
  }
  ).done((data)=>{
          populate(data);
      })
      $.ajax({
        method:'GET',
        url:"http://localhost:4444/ecommerce/home/cart",
      }
      ).done((data)=>{
              populatecart(data);
          })
     
  $('#s').click((event)=>{
      event.preventDefault();
      prev.removeClass('tm-paging-link active')
      prev.addClass('tm-paging-link')
      prev=$('#s');
      prev.addClass('tm-paging-link active')
    

      main.hide()
  desserts.hide()
  starters.show()

    })
    $('#m').click((event)=>{
      event.preventDefault();
      prev.removeClass('tm-paging-link active')
      prev.addClass('tm-paging-link')
      prev=$('#m');
      prev.addClass('tm-paging-link active')
     
      main.show()
      desserts.hide()
      starters.hide()
    })
    $('#d').click((event)=>{
      event.preventDefault();
      prev.removeClass('tm-paging-link active')
      prev.addClass('tm-paging-link')
      prev=$('#d');
      prev.addClass('tm-paging-link active')
     
      main.hide()
  desserts.show()
  starters.hide()
    })
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
	  adddish.click((event)=>{
      event.preventDefault();
      $.ajax({
        method:'POST',
        url:"http://localhost:4444/ecommerce/home/menu",
        data:{
          name:name.val(),
          image_url:image_url.val(),
          discription:discription.val(),
          price:price.val(),
          type:type.val()
        }
      }
      ).done((data)=>{
              populate(data);
  
      })
    })
    function addtocart(obj)
    {

      $.ajax({
        method:'POST',
        url:"http://localhost:4444/ecommerce/home/cart",
        data:{
          name:obj.name,
          price:obj.price,
          discription:obj.discription,
          type:obj.type,
          image_url:obj.image_url
        }
      }).done((data)=>{
        populatecart(data);
      })
    }
    function populate(data)
    {
      main.empty()
      desserts.empty()
      starters.empty() 
      for(let i=0;i<data.length;i++)
      {
        let newdish=create(data[i],addtocart)
      if(data[i].type=='main')
       {
         main.append(newdish);}
      else if(data[i].type=='starter')
      starters.append(newdish);
      else 
      desserts.append(newdish);
     
      }
      
 
    }
    let cart=$("#cart")
    function populatecart(data)
    {
      cart.empty();
      for(let i=0;i<data.length;i++){
      let newdish=createforcart(data[i],deletefromcart)
    cart.append(newdish);}
  }
  function createforcart(data,deletecallback)
  {
    let t=$(`<article class="col-lg-6">
   </article>`)
   let x=$(`<figure class="tm-person">
   <img id="i" src=${data.image_url} />
 </figure>`)
let p=$(`<button id="trash-icon"><i class="fa fa-trash"></i></button>`)
let y=$(`<figcaption class="tm-person-description">
<h4 class="tm-person-name">${data.name}</h4>
<p class="tm-person-title">$${data.price}</p>

</figcaption>`)
y.append(p);
x.append(y);
t.append(x);
    p.click((event)=>{
    event.preventDefault();
    deletecallback(data._id);
    window.location.reload();
  })
  return t;
  }
function create(data,callback)
{
  let t=$(`<article class="col-lg-3 col-md-4 col-sm-6 col-12 tm-gallery-item">
  <figure>
    <img src=${data.image_url} alt="Image" class="img-fluid tm-gallery-img" />
    <figcaption>
      <h4 class="tm-gallery-title">${data.name}</h4>
      <p class="tm-gallery-description">${data.discription}</p>
      <p class="tm-gallery-price">$${data.price}</p>
    </figcaption>
  </figure>
</article>`)

  t.append(createaddbutton(data,callback));
  return t; 
}
function createaddbutton(data,callback)
{
  let t=$(`<button type="button" class="btn btn-outline-success">ADD THIS</button>`)
  t.click((event)=>{
    event.preventDefault();
    callback(data);
  })
  return t;
}
function deletefromcart(id)
{
 $.ajax({method:'delete',
url:"http://localhost:4444/ecommerce/home/cart/"+id},
).done((data)=>{
  window.location.reload();
  populatecart(data);

})
}
})
