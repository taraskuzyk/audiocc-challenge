const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})


//runTests()

readline.question(`Enter your expression: y = `, (input) => {
    expression = input.split("").filter((el)=> el!==" ").join("");
    console.log(expression)

    // y = a*x + b
    // only consider case when there is be a multiplication sign next to x like above
    // also we will only take linear x equations into consideration
    let a = 0
    let b = 0

    // let's find a first
    while(expression.includes("*x")){
        let x_pos = expression.indexOf("*x");
        let left = 0;
        for (i = x_pos; i > 0; i--){
            if (expression.charAt(i) === "-") {
                left = i
                break;
            } else if (expression.charAt(i) === "+") {
                left = i
                break;
            }
        }

        let expr = processInput(expression.slice(i, x_pos))
        a += Number(expr)
        expression = expression.replace(expression.slice(i, x_pos+2), "")

        // for (i = x_pos; expression.charAt(i) )
    }
    while(expression.includes("x*")){
        let x_pos = expression.indexOf("x*");
        let right = expression.length;
        for (i = x_pos+2; i < expression.length; i++){
            if (expression.charAt(i) === "-") {
                right = i
                break;
            } else if (expression.charAt(i) === "+") {
                right = i
                break;
            }
        }

        let expr = processInput(expression.slice(x_pos+2, right))
        if (expression.charAt(x_pos-1) === "+" || expression.charAt(x_pos-1) === "-"){
            a += Number(expression.charAt(x_pos-1)+expr)
            expression = expression.replace(expression.slice(x_pos-1, right), "")
        } else {
            a += Number(expr)
            expression = expression.replace(expression.slice(x_pos, right), "")
        }

    }
    console.log(a)

    b = processInput(expression)
    console.log(b)


    readline.close()
})


function processInput(input){
    let expression = "(" + ([...input].filter((el)=>legal_symbols.includes(el))).join("") + ")"

    while (expression.includes(")")){
        let left_bracket;
        let i = 0
        while (expression[i] !== ")"){
            if (expression[i] === "(") {
                left_bracket = i;
            }
            i++
        }
        let right_bracket = i;

        let expr = expression.slice(left_bracket + 1, right_bracket)
        while (expr.includes("*") || expr.includes("/")){
            let num1, num2
            let starIdx = expr.indexOf("*") === -1 ? 1000000 : expr.indexOf("*")
            let divIdx = expr.indexOf("/") === -1 ? 1000000 : expr.indexOf("/")
            let signIdx = starIdx < divIdx ? starIdx : divIdx

            for (i = signIdx-1; "0123456789".includes(expr[i]); i--){}
            num1 = expr.slice(i + 1, signIdx)
            for (j = signIdx+1; "0123456789".includes(expr[j]); j++){}
            num2 = expr.slice(signIdx + 1, j)

            let muldiv
            if (expr.charAt(signIdx) === "*")
                muldiv = Number(num1) * Number(num2)
            else
                muldiv = Number(num1) / Number(num2)

            let multipleArray = muldiv.toString().split("")

            expr = expr.replace(expr.slice(i + 1, j), muldiv.toString())
        }
        while (expr.includes("-") || expr.includes("+")){
            let num1, num2
            let plusIdx = expr.indexOf("+") === -1 ? 1000000 : expr.indexOf("+")
            let minusIdx = expr.indexOf("-") === -1 ? 1000000 : expr.indexOf("-")
            let signIdx = plusIdx < minusIdx ? plusIdx : minusIdx

            for (i = signIdx-1; "0123456789".includes(expr[i]); i--){}
            num1 = expr.slice(i + 1, signIdx)

            for (j = signIdx+1; "0123456789".includes(expr[j]); j++){}
            num2 = expr.slice(signIdx + 1, j)

            let minsum
            if (expr.charAt(signIdx) === "+")
                minsum = Number(num1) + Number(num2)
            else
                minsum = Number(num1) - Number(num2)

            let multipleArray = minsum.toString().split("")

            expr = expr.replace(expr.slice(i + 1, j), minsum.toString())
            if (num1 === "") // like for expression of -1
                break;

        }

        expression = expression.replace(expression.slice(left_bracket, right_bracket+1), expr)
    }
    return expression;
}






