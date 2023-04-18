const mathjs = require("mathjs")
document.querySelector("#switchNR").addEventListener("click", visibilitySwitch(1));
document.querySelector("#switchMNR").addEventListener("click", visibilitySwitch(2));
const visibilitySwitch = function (prop){
    const newtonRaphson = window.document.querySelector('#newton-raphson')
    const matrixNR = window.document.querySelector('#matrix-nr')

    if(prop = 1){
        newtonRaphson.style.visibility("visible")
        matrixNR.style.visibility("hidden")
    }
    if(prop = 2){
        newtonRaphson.style.visibility("hidden")
        matrixNR.style.visibility("visible")
    }
}
const derivative = function (foo, x){
    const h = 0.001

    const f = new Function("x", "return " + foo)
    
    return (f(x+h)-f(x-h))/(2*h)
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
const calculaNR = function () {
    //let rawFunctionNR = "f(x) = x^^2 + x - 5"
    let rawFunctionNR = window.document.querySelector("input#functionNR").value
    //Obtem a função

    if(rawFunctionNR === ""){
        window.alert("Insira algo no campo de função")
    }
    //alerta para inserir uma função

    functionNR = functionFormat(rawFunctionNR)
    //Declaração da função para formatar a string
    
    let i = 0
    //Declara as iterações

    const newtonRaphson = function (g){ //xk+1 = xk - (fxk/f'xk)
        const deltaP = 0.0001
        const deltaN = -0.0001
        //Declara o delta (erro)
        
        const calculaF = new Function("x", "return " + functionNR)
        let res = calculaF(g)
        //Calcula o resultado da função com o valor de x

        let resNR = window.document.querySelector('#resFinal')
        //Declara o elemento que mostrará o resultado na tela

        if(res == NaN | res == null){
            resNR.innerHTML = `A função que você inseriu não é valida`
            //Retorno de função inválida
        }else{
            if(res < deltaP & res > deltaN){
                g = g.toFixed(6)
                resNR.innerHTML = `O valor da raiz é aproximadamente de x = ${g}, obtido na iteração ${i}`
                //Retorno da raiz
            }else{
                if(i>500){
                    resNR.innerHTML = `Não foi possível chegar ao fim do método pois esse ultrapassou 500 iterações <br> O resultado obtido até então foi ${g}`
                    //Breakpoint para evitar maiores problemas
                } else{
                    let nx
                    //Declaração do xk+1
    
                    let dF = derivative(functionNR, g)
                    //Chama função para declarar
                    
                    nx = g - (res/dF)
                    //Calculo da formula de Newton-Raphson

                    //Verificação dos valores das iterações

                    i++
                    //Soma da iteração

                    return newtonRaphson(nx)
                    //Recursão da função com o novo valor
                }
            }
        }
    }
    const guessInp = window.document.querySelector("input#inp1NR")
    let guess = Number(guessInp.value)
    if(guess===NaN|guess===null){
        guess = 0
    }
    //Caso o valor do input não for

    newtonRaphson(guess)
    //Declaração da função com o valor do chute 
}
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
    // Matriz jacobiana - Essa é a derivada parcial de cada uma das icognitas (colunas) em cada uma das funções (linhas)
    // O codigo só suporta o formato de matriz 3x3
    if(z == undefined & fc3 == undefined){
        let res = [[partialDerivativeX(fc1, x, y), partialDerivativeY(fc1, x, y)],
[partialDerivativeX(fc2, x, y), partialDerivativeY(fc2, x, y)]]
    }
    else{
        let res = [[partialDerivativeX(fc1, x, y, z), partialDerivativeY(fc1, x, y, z), partialDerivativeZ(fc1, x, y, z)],
        [partialDerivativeX(fc2, x, y, z), partialDerivativeY(fc2, x, y, z), partialDerivativeZ(fc2, x, y, z)],
        [partialDerivativeX(fc3, x, y, z), partialDerivativeY(fc3, x, y, z), partialDerivativeZ(fc3, x, y, z)]]
    }
    // Precisa de uma função para definir o tamanho da matriz a partir do numero de ic e fc

    // Retorna o valor da matriz jacobiana
    return res
}
const calculaMatrixNR = function (){
    //Declaração de iteração
    let i = 0
    
    const rawfc1 = "f(x) = x²-cos(x*y)-1"
    const rawfc2 = "f(x) = sin(y)-2*cos(x)"

    let xi = 1
    let yi = 1

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

    //Formatação da função
    const fc1 = functionFormat(rawfc1)
    const fc2 = functionFormat(rawfc2)

    const newtonRaphson2 = function (fc1, fc2, x, y){
        // xk+1 = xk - J(Jacobiana Inversa) x F(xk)
        /* Esse método tem como objetivo encontrar a raiz de matrizes, 
        onde é possivel observar funções de mais de um variavel e estimar estas para que 
        o total de TODAS funções dêem zero */
    
        //delta é o erro permitido para o método analítico
        const deltaP = 0.0001
        const deltaN = -0.0001

        //links primordiais
        const resNR = document.querySelector("p#resFinalNR")
    
        //resultado da funções (criação de função a partir da string da função)
        const calculaF1 = new Function("x, y", "return " + fc1)
        const calculaF2 = new Function("x, y", "return " + fc2)
    
        let res1 = calculaF1(x, y)
        let res2 = calculaF2(x, y)
    
        //calculo da matriz jacobiana e sua inversão
        let jacobian = jacobianMatrix(fc1, fc2, x, y)
        let invJacobian = mathjs.inv(jacobian)
    
        //matrix de funções (F(xk))
        matrixF = [res1, res2]
    
        if(res1 == NaN | res1 == null | res2 == NaN | res2 == null){
            //Caso dos resultados não conseguirem ser numericos
    
            resNR.innerHTML = "Função inválida"
            
        }
        else{
            if((res1<=deltaP & res1>=deltaN) & (res2<=deltaP & res2>=deltaN)){
                resNR.innerHTML = `Os valores da raiz de ${rawfc1} e ${rawfc2} são de x = ${x} e y = ${y}, obtidos na iteração ${i}`
            }
            else{
                if(i>=100){
                    resNR.innerHTML =`O método ultrapassou 100 iterações`
                }
                else{
                    //soma da iteração
                    i++
    
                    //obter a multiplicação das matrizes
                    let mult = mathjs.multiply(invJacobian, matrixF)
    
                    let xk1 = x - mult[0]
                    let yk1 = y - mult[1]
    
                    newtonRaphson2(fc1, fc2, xk1, yk1)
                }
            }
        }
    }
    newtonRaphson2(fc1, fc2, xi, yi)
}

const obj = window.document.querySelector("#resFinalNR")
obj.innerHTML = "oi"