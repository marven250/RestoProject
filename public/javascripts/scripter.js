// const requestProxy = require('express-request-proxy')
// let menuItems = document.getElementsByClassName("foodItem")
let logo = document.getElementById("sign")
let back = document.getElementById("back")
  setInterval(() => {
    back.style.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  }, 1000)


let quotes = document.getElementsByClassName("aboutText")
for(let i=0; i< quotes.length; i++){
    setInterval(()=>{
      quotes[i].style.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      logo.style.transform = "rotateX(360deg)"
    }, 1000)
}

let quotes1 = document.getElementsByClassName("homeHeader")
for (let i = 0; i < quotes1.length; i++) {
  quotes1[i].onmouseover = () => {
    quotes1[i].style.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
}

let quoter= document.getElementById("motive")
setInterval(()=>{

  quoter.style.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  quoter.style.transform = "rotateX(360deg)"
}, 1000)




// document.getElementById("clickApi").onclick= ()=>{

//   var unirest = require("unirest");

//   var req = unirest("GET", "https://nutritionix-api.p.rapidapi.com/v1_1/search/cheddar%20cheese");

//   req.query({
//     "fields": "item_name,item_id,brand_name,nf_calories,nf_total_fat"
//   });

//   req.headers({
//     "x-rapidapi-host": "nutritionix-api.p.rapidapi.com",
//     "x-rapidapi-key": "66822c5c39msh90cfe72c5fb77eap113a2ejsn80082c0924e0"
//   });


//   req.end(function (res) {
//     console.log(res.body);

//     if (res.error) throw new Error(res.error);

    
//   });

//   proxyEdamam()

//   }
// function proxyEdamam(request, response) {
//   console.log('Routing a Edamam request');
//   (requestProxy({
//     url: `https://api.edamam.com/search`,

//     headers: {

//       app_id: '9d96839a',

//       app_key: '3b781656b4cb29e14fa769d007cc9c93	—'
//     }

//   }))(request, response);

//   // console.log("ayyyy")
//   // axios.get("https://api.edamam.com/api/food-database/parser?ingr=red%20apple&app_id={9d96839a}&app_key={3b781656b4cb29e14fa769d007cc9c93	—}").then(item=>{
//   //   console.log(item)
//   // })
//  }


module.exports= menuItems