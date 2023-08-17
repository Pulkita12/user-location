const button= document.querySelector("button")
button.addEventListener("click", ()=>{
   if(navigator.geolocation){
    
    button.innerText=" Allow to detect your location"
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
   }
   else{
    button.innerText=" Your Browser Doesn't Support"
   }
})

function onSuccess(position){
  button.innerText="Detecting Your location...."
let {latitude, longitude}=position.coords
console.log(latitude,longitude)

fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=6177110c65ef4c919a3235728c68b0bb`)
.then(response => response.json()).then(result => {
  let alldetails= result.results[0].components;
  let {country, postcode, city_district } =alldetails
  button.innerText=`${country} ${postcode}, ${city_district}`;
  console.log(alldetails)
 
  
}).catch(()=>{
  button.innerText="Something Went Wrong"
})

}


function onError(error){
    if(error.code==1){
      button.innerText="You Denied The Request"
    }
   else if(error.code==2){
    button.innerText="Location Cannot be found"

    }
  else{
    button.innerText="Something Went Wrong"
  }
  button.setAttribute("Disabled", "true");
}