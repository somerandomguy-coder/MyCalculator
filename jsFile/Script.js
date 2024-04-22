let stack = [];
let num = "", operator ="";
let display = document.querySelector(".display");
let dot = document.querySelector(".dot");

document.addEventListener("click", (e)=>{
    if (e.target.className.startsWith("n")){
        pushNumToStack(e);
        display.textContent = num;
        console.log(stack);
    } else if (["div", "mul", "min", "plus"].includes(e.target.className)) {
        pushOperatorToStack(e);
        dot.className = "dot";
        display.textContent = operator;
        console.log(stack);
    } else if (e.target.className == "equal") {
        stack.push(+num);
        num = "";
        while(stack.length > 1){
            operate();
        }
        if (stack[0].toString().startsWith("ERROR")) {
            display.textContent = stack[0];
            stack = [];
        } else {
            display.textContent = roundTo2Dec(+stack[0]);
        }
        dot.className = "dot";
        console.log(stack);
    } else if (e.target.className == "dot"){
        pushDotToNum(e);
        display.textContent = num;
    } else if (e.target.className == "clear"){
        stack = [];
        num = "";
        operator = "";
        display.textContent = "";
        dot.className = "dot";
    }
})

function roundTo2Dec(num){
    return Math.round(num*100)/100;
}
function pushNumToStack(e){
    num = num + e.target.className[1];
    if (operator != ""){
        stack.push(operator);
        operator = "";
    }
    if (stack.length==1){
        stack.pop();
    }
}

function pushOperatorToStack(e){
    if (stack.length == 1){
        num = "";
    }
    else if (num == ""){
        stack.push(0);
    } else {
        stack.push(+num);
        num = "";
    }
    operator = e.target.className;
    
}

function operate(){
    if ((stack[stack.length-1] == 0 && stack.length == 2) && stack[1]!= "div" ) {
        console.log(`meomeo stack = ${stack[1]}`);
        stack.pop();
        (operator == "") ? stack.push("plus") :stack.push(operator);
        stack.push(0); 
    }
    let first, second, op;
    second = stack.pop();
    op = stack.pop();
    first = stack.pop();
    console.log(`${first}, ${op}, ${second}`);
    switch (op){
        case "plus": stack.push(first + second);
        break;
        case "min": stack.push(first - second);
        break;
        case "mul": stack.push(first * second);
        break;
        case "div": 
        if (second === 0){
            stack.push("ERROR: Divide by zero");
        } else {
            stack.push(first / second);
        }
    }
}

function pushDotToNum(){
    if (num == ""){
        num = "0" + ".";
        if (operator == ""){
            if (stack.length==1){
                stack = [];
            }
        } else {
            stack.push(operator);
        }
    } else {
        num = num + ".";
    }
    operator = "";
    dot.className = "";
}