const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

const dropdownSelects = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for(let select of dropdownSelects){
    for (currCode in countryList){

        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }

        if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    } 
    
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async () => {
    let amt = document.querySelector(".amount input");
    let amtVal = amt.value;
    if(isNaN(amtVal) || amtVal === "" || amtVal < 1){
        amtVal = 1;
        amt.value = "1";
    }

        const URL = `${BASE_URL}${fromCurr.value.toLowerCase()}.json`;
        const response = await fetch(URL);
        const data = await response.json();
        let from = fromCurr.value.toLowerCase();
        let to = toCurr.value.toLowerCase();
        
            const rate = data[from][to];
            let finalAmt = amtVal*rate;

            const msg = document.querySelector(".msg");
            msg.innerText = `${amtVal} ${fromCurr.value}  =  ${finalAmt} ${toCurr.value}`;    
}

const updateFlag = (target)=>{
    let currCode = target.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let img = target.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();

});

window.addEventListener("load", ()=>{
    updateExchangeRate();
})

    