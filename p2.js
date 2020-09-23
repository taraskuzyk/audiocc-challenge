// WARNING: THE SOLUTION IS BASED OF THE INPUT OUTPUT PAIRS
// THE NUMBERS OF WHICH DIDN'T START WITH ONE
// (assuming that was a typo!)

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

let expression, i, j, k;

readline.question(`Enter your expression: `, (input) => {
    expression = input;

    let prev = "1", curr = ""
    while (processInput(curr) !== curr){
        prev = processInput(input)
        curr = processInput(prev)
    }

    console.log(curr)

    readline.close()
})

function processInput(input){
    if (input.length <= 1)
        return "number too small"

    let arr = input.split("")
    if (arr[arr.length - 1] === "0" && arr[arr.length - 2] === "1"){
        let nines = input.length -1
        let strnines = ""
        while (nines--){
            strnines += "9"
        }
        return strnines
    }
    let ascendingPart = input.charAt(0);

    let i = 1;

    while(Number(input.charAt(i-1)) <= Number(input.charAt(i))){
        ascendingPart += input.charAt(i)
        i++
    }

    arr = ascendingPart.split("")

    let nines = input.length - ascendingPart.length
    if (nines === 0)
        return arr.join("");

    let strnines = ""
    while (nines--){
        strnines += "9"
    }
    arr[arr.length - 1] = (Number(arr[arr.length - 1]) - 1).toString()
    return (arr.concat(strnines.split(""))).join("")

}
