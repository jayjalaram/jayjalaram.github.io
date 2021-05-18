/**
 * Order form submit
 */


var urlParams;
(window.onpopstate = function () {
    let country;
    const http = new XMLHttpRequest()
    http.open("GET", "https://ipinfo.io?token=b68c3fd62a6a01")
    http.send()
    http.onreadystatechange = (e) => {
        if(http.readyState === XMLHttpRequest.DONE) {
            var status = http.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                ele = JSON.parse(http.responseText)
                country = ele["country"];
            } else {
                country = null;
            }
            loadData(country)
        }
    }
})();

function loadData(country){
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);

   console.log("User logged in from: ", country);
   if("vpa" in urlParams && urlParams["vpa"] != "undefined" && urlParams["vpa"] != "NaN" && country == "IN"){
       document.getElementById("validity").innerHTML = "Valid ✅";
   }else if("vpa" in urlParams && urlParams["vpa"] != "undefined" && urlParams["vpa"] != "NaN" && (country != null && country != "IN")){
       document.getElementById("validity").innerHTML = "Only Active in India! 🥺";
   }else if("vpa" in urlParams && urlParams["vpa"] != "undefined" && urlParams["vpa"] != "NaN"){
       document.getElementById("validity").innerHTML = "Valid ✅";
   }else{
       document.getElementById("validity").innerHTML = "Invalid ❌";
   }

   let text = "pay?pa=" + urlParams["vpa"] + "&mode=00&orgid=000000&cu=INR"

   if("nm" in urlParams){
       text = text + "&pn=" + (urlParams["nm"]).replace(/ /g,'') + "&tn=Buying%20chai%20for%20" + (urlParams["nm"]).replace(/ /g,'')
       document.getElementById("name").innerHTML = urlParams["nm"];
       if("amt" in urlParams){
           document.getElementById("amt").innerHTML = " of ₹ " + urlParams["amt"]
       }else{
           document.getElementById("amt").innerHTML = "";
       }
   }else{
       document.getElementById("name").innerHTML = "me";
       document.getElementById("amt").innerHTML = "";
   }

   if("amt" in urlParams){
       text = text + "&am=" + urlParams["amt"]
   }

   var txt = "LOL";
//    var returnUrl = window.location.href;
   var returnUrl = BASE_URL;
   document.getElementById("fullWS").href = "https://wa.me/9979174071?text="+ txt + encodeURIComponent(returnUrl);

   let intrmUrl = "upi://" + text;
   let signedUrl = "upi://" + text + "&sign=" + btoa(intrmUrl);

   document.getElementsByClassName("payLogoAnchor")[0].href = signedUrl;
   document.getElementsByClassName("payLogoAnchor")[1].href = "paytmmp://" + text;
   document.getElementsByClassName("payLogoAnchor")[2].href = "upi://" + text;
   document.getElementsByClassName("payLogoAnchor")[3].href = "upi://" + text;

    var qrcode = new QRCode("qrCode", {
        text: "upi://" + text,
        width: 350,
        height: 350,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
}   