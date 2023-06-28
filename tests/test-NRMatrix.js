//Documento NR2 vesão Node.js

const mathjs = require("mathjs")
const partialDerivativeX = function (foo, x, y, z){
    //foo = função que vai ser derivada nos pontos x e y
    const h = 0.0001

    const f = new Function("x, y, z", "return " + foo)

    return (f(x+h, y, z) - f(x-h, y, z))/(2*h)
}
const partialDerivativeY = function (foo, x, y, z){
    //foo = função que vai ser derivada nos pontos x e y
    const h = 0.0001

    const f = new Function("x, y, z", "return " + foo)

    return (f(x, y+h, z) - f(x, y-h, z))/(2*h)
}
const partialDerivativeZ = function (foo, x, y, z){
    //foo = função que vai ser derivada nos pontos x,y e z
    const h = 0.0001

    const f = new Function("x, y, z", "return " + foo)

    return (f(x, y, z+h) - f(x, y, z-h))/(2*h)
}
const jacobianMatrix = function (fc1, fc2, x, y, fc3, z){
    // Matriz jacobiana
    // Essa é a derivada parcial de cada uma das icognitas
    let res = [[partialDerivativeX(fc1, x, y, z), partialDerivativeY(fc1, x, y, z), partialDerivativeZ(fc1, x, y, z)],
[partialDerivativeX(fc2, x, y, z), partialDerivativeY(fc2, x, y, z), partialDerivativeZ(fc2, x, y, z)], 
[partialDerivativeX(fc3, x, y, z), partialDerivativeY(fc3, x, y, z), partialDerivativeZ(fc3, x, y, z)]]
    // Precisa de uma função para definir o tamanho da matriz a partir do numero de ic e fc

    // Retorna o valor da matriz jacobiana
    return res
}
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
const calculaNR2 = function (){
    //Declaração de iteração
    let i = 0
    
    const rawfc1 = "f(x, y, z) = y³ * x² * z"
    const rawfc2 = "f(x, y, z) = 2 * y² * z² - y³"
    const rawfc3 = "f(x, y, z) = z³ * x * y² * x² - 62 * x - y³"

    let xi = 1
    let yi = 1
    let zi = 1
    //Declaração de função 
    /*const rawfc1 = window.document.querySelector("input#functionNR1")
    const rawfc2 = window.document.querySelector("input#functionNR2")
    const rawfc3 = window.document.querySelector("input#functionNR3")

    //Declaração de icognita e condicional
    let xi = window.document.querySelector("input#inpNR1")
    let yi = window.document.querySelector("input#inpNR2")
    let zi = window.document.querySelector("input#inpNR3")*/

    const iFormat = function (x) {
        if(x == NaN | x == undefined){
            x = 0
        }
        return x
    }

    xi = iFormat(xi)
    yi = iFormat(yi)
    zi = iFormat(zi)

    //Formatação da função
    const fc1 = functionFormat(rawfc1)
    const fc2 = functionFormat(rawfc2)
    const fc3 = functionFormat(rawfc3)
    

    const newtonRaphson2 = function (fc1, fc2, x, y, fc3, z){
        // xk+1 = xk - J(Jacobiana Inversa) x F(xk)
        /* Esse método tem como objetivo encontrar a raiz de matrizes, 
        onde é possivel observar funções de mais de um variavel e estimar estas para que 
        o total de TODAS funções dêem zero */
    
        //delta é o erro permitido para o método analítico
        const deltaP = 0.0000000000001
        const deltaN = -0.0000000000001
    
        //resultado da funções (criação de função a partir da string da função)
        const calculaF1 = new Function("x, y, z", "return " + fc1)
        const calculaF2 = new Function("x, y, z", "return " + fc2)
        const calculaF3 = new Function("x, y, z", "return " + fc3)
    
    
        let res1 = calculaF1(x, y, z)
        let res2 = calculaF2(x, y, z)
        let res3 = calculaF3(x, y, z)
    
        //calculo da matriz jacobiana e sua inversão
        let jacobian = jacobianMatrix(fc1, fc2, x, y, fc3, z)
        let invJacobian = mathjs.inv(jacobian)
    
        //matrix de funções (F(xk))
        matrixF = [res1, res2, res3]
    
        if(res1 == NaN | res1 == null | res2 == NaN | res2 == null){
            //Caso dos resultados não conseguirem ser numericos
            console.log("Função inválida")
        }
        else{
            if((res1<=deltaP & res1>=deltaN) & (res2<=deltaP & res2>=deltaN) & (res3<=deltaP & res3>=deltaN)){
                console.log(`Os valores da raiz de ${rawfc1}, ${rawfc2} e ${rawfc3} são de x = ${x}, y = ${y} e z = ${z}, obtidos na iteração ${i}`)
            }
            else{
                if(i>=2000){
                    console.log(`O método ultrapassou 2000 iterações`)
                }
                else{
                    //soma da iteração
                    i++
    
                    //obter a multiplicação das matrizes
                    let mult = mathjs.multiply(invJacobian, matrixF)
    
                    let xk1 = x - mult[0]
                    let yk1 = y - mult[1]
                    let zk1 = z - mult[2]
    
                    newtonRaphson2(fc1, fc2, xk1, yk1, fc3, zk1)
                }
            }
        }
    }
    newtonRaphson2(fc1, fc2, xi, yi, fc3, zi)
}

calculaNR2()