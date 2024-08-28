const submit = document.querySelector(".button");
const forum = document.querySelector(".forum");
const clear = document.querySelector(".clearall");
const errorAmount = document.querySelector(".amount");

const errorTerm = document.querySelector(".term");
const errorRate = document.querySelector(".rate");
const errorChoice = document.querySelector(".typechoice");

const redEuro = document.querySelector(".euro1");
const redYear = document.querySelector(".yearso1");
const redPercent = document.querySelector(".percento1");

const colorLime = getComputedStyle(document.documentElement).getPropertyValue('--Lime');
const colorLime2 = getComputedStyle(document.documentElement).getPropertyValue('--Lime2');
const colorSlate100 = getComputedStyle(document.documentElement).getPropertyValue('--Slate100');
const colorSlate300 = getComputedStyle(document.documentElement).getPropertyValue('--Slate300');
const colorSlate700 = getComputedStyle(document.documentElement).getPropertyValue('--Slate700');
const colorRed = getComputedStyle(document.documentElement).getPropertyValue('--Red');

const amount = document.getElementById("amount");
const term = document.getElementById("term");
const interest = document.getElementById("interest");

const paymentreal = document.querySelector(".payment");
const totalPayment = document.querySelector(".totalpayment");

const empty = document.querySelector(".empty");
const completed = document.querySelector(".completed");

var totalSum = "";
var selectedVal = "";

var flag = [true, true, true, true];
var finalFlag = true;

clear.addEventListener('click', function(){
    forum.reset();
    empty.style.display = "flex";
    completed.style.display = "none";
    if(selectedVal != ""){
        const selectedValue = document.querySelector(`.${selectedVal}d`);
        selectedValue.style.backgroundColor = "white";
        selectedValue.style.border = `1.6px solid ${colorSlate300}`;
        const selectedRadio = document.querySelector(`.${selectedVal}e`);
        selectedRadio.style.filter = "none";
    }
    selectedVal = "";
})
forum.addEventListener('change', function(){
    if(selectedVal != ""){
        const selectedValue = document.querySelector(`.${selectedVal}d`);
        selectedValue.style.backgroundColor = "white";
        selectedValue.style.border = `1.6px solid ${colorSlate300}`;
        const selectedRadio = document.querySelector(`.${selectedVal}e`);
        selectedRadio.style.filter = "none";
    }
    const selected = document.querySelector(`input[name="mortgage-type"]:checked`);
    if(selected){
        selectedVal = selected.value;
        console.log(selectedVal);
        const selectedValue = document.querySelector(`.${selectedVal}d`);
        selectedValue.style.backgroundColor = colorLime2;
        selectedValue.style.border = `1.6px solid ${colorLime}`;
        const selectedRadio = document.querySelector(`.${selectedVal}e`);
        selectedRadio.style.filter = "hue-rotate(205deg) brightness(165%)";
    }
})

submit.addEventListener('click', function(event){
    event.preventDefault();
    if(amount.value == ""){
        errorAmount.style.display = "block";
        redEuro.style.backgroundColor = colorRed;
        redEuro.style.color = "white";
        flag[0] = false;
    }
    else{
        redEuro.style.backgroundColor = colorSlate100;
        redEuro.style.color = colorSlate700;
        errorAmount.style.display = "none";
        flag[0] = true;
    }
    if(term.value == ""){
        errorTerm.style.display = "block";
        redYear.style.color = "white";
        redYear.style.backgroundColor = colorRed;
        flag[1] = false;
    }
    else{
        redYear.style.color = colorSlate700;
        redYear.style.backgroundColor = colorSlate100;
        flag[1] = true;
        errorTerm.style.display = "none";
    }
    if(interest.value == ""){
        redPercent.style.color = "white";
        redPercent.style.backgroundColor = colorRed;
        flag[2] = false;
        errorRate.style.display = "block";
    }
    else{
        redPercent.style.color = colorSlate700;
        redPercent.style.backgroundColor = colorSlate100;
        flag[2] = true;
        errorRate.style.display = "none";
    }

    if(selectedVal == ""){
        flag[3] = false;
        errorChoice.style.display = "block";
    }
    else if(selectedVal == "repayment"){
        const p = calculateRepayment(amount.value, term.value, interest.value);
        paymentreal.textContent = parseFloat(p.toFixed(2)).toLocaleString('en-US', {minimumFractionDigits: 2});
        totalPayment.textContent = parseFloat(calculateRepaymentSum(p, term.value).toFixed(2)).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2});
        errorChoice.style.display = "none";
        flag[3] = true;
    }
    else if(selectedVal == "interestonly"){
        const p = calculateInterest(amount.value, interest.value);
        paymentreal.textContent = parseFloat(p.toFixed(2)).toLocaleString('en-US', {mimumFractionDigits: 2});
        totalPayment.textContent = parseFloat(calculateInterestSum(amount.value, p, term.value).toFixed(2)).toLocaleString('en-US', {minimumFractionDigits: 1});
        errorChoice.style.display = "none";
        flag[3] = true;
    }
    flag.forEach(fl => {
        if(!fl) finalFlag = false;
    })
    if(finalFlag) {
        completed.style.display = "block";
        empty.style.display = "none";
    }
    else{
        completed.style.display = "none";
        empty.style.display = "flex";
    }
    finalFlag = true;
})

function calculateRepayment(amounto, termo, interesto){
    const intereston = parseFloat(interesto) / 1200;
    const power = Math.pow(1 + intereston, parseFloat(termo * 12));
    const payment = (parseFloat(amounto) * intereston * power) / (power - 1);
    return(payment);
}
function calculateInterest(amounto, interesto){
    const intereston = parseFloat(interesto) / 1200;
    const payment = intereston * parseFloat(amounto);
    return(payment)
}
function calculateRepaymentSum(repaymentam,termo){
    const payment = repaymentam * parseFloat(termo) * 12;
    return(payment);
}
function calculateInterestSum(amounto, interestam,termo){
    const payment = (interestam * parseFloat(termo) * 12) + parseFloat(amounto);
    return(payment);
}