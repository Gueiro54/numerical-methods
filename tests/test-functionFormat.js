const functionFormat = function (string){
    const separaNum = /(?<==)[\s\d\*\-\+\/x²³\^(cos)(sin)\(\)yz]+/gi
    //RegExp para filtrar os operadores da função

    //Formatação da função (START)
    const simplified1Function = string.replaceAll(" ","")
    const simplified2Function = simplified1Function.replaceAll(",", ".")
    const simplified3Function = simplified2Function.match(separaNum)
    //Separação de f(x), exclusão dos espaços e substituição da virgula

    let simplified4Function = new String(simplified3Function[0])
    //Transforma a função novamente em string (anteriormente era Array)

    const regExpDX = /\d(?=x)x[²³^12]?/gi
    const regExpD = /\d(?=x)/gi
    const regExpX = /(?<=\d)x[²³^12]?/gi
    //Grupos de RegExp para a separação

    const separaDX = simplified4Function.match(regExpDX)
    const separaD = simplified4Function.match(regExpD)
    const separaX = simplified4Function.match(regExpX)
    //Separação dos grupos de icognitas

    for(let pos in separaDX){
        simplified4Function = simplified4Function.replace(separaDX[pos], separaD[pos] + "*" + separaX[pos])
    }
    //Formata as iconitas que não estão multiplicadas

    const simplified5Function = simplified4Function.replaceAll(/x\^2|x²|x\^\^2/gi, "Math.pow(x, 2)")
    let stringFunction = simplified5Function.replaceAll(/x\^3|x³|x\^\^3/gi, "Math.pow(x, 3)")
    stringFunction = stringFunction.replaceAll(/y\^2|y²|y\^\^2/gi, "Math.pow(y, 2)") 
    stringFunction = stringFunction.replaceAll(/y\^3|y³|y\^\^3/gi, "Math.pow(y, 3)") 
    stringFunction = stringFunction.replaceAll(/z\^2|z²|z\^\^2/gi, "Math.pow(z, 2)") 
    stringFunction = stringFunction.replaceAll(/z\^3|z³|z\^\^3/gi, "Math.pow(z, 3)") 
    stringFunction = stringFunction.replaceAll("cos", "Math.cos")
    stringFunction = stringFunction.replaceAll("sin", "Math.sin") 
    stringFunction = stringFunction.replaceAll("tan", "Math.tan") 
    //Substituição dos expoentes
    //Formatação da função (END)

    return stringFunction
}

//Passar cos(x) para math.cos(x)
const string = "f(x) = x²- 4 * x * y + 2 * y³ * z² + cos(z²)"

console.log(functionFormat(string))

const calculas = new Function("x, y, z", "return " + functionFormat(string))

console.log(calculas(2, 4, 53))