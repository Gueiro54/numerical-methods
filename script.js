document.querySelector("#switchNR").addEventListener("click", visibilitySwitch1)
document.querySelector("#switchMNR").addEventListener("click", visibilitySwitch2)

function visibilitySwitch1 (){
    document.querySelector('#newtonraphson').style.visibility = "visible"
    document.querySelector('#matrixnr').style.visibility = "hidden"
}
function visibilitySwitch2 (){
    document.querySelector('#newtonraphson').style.visibility = 'hidden'
    document.querySelector('#matrixnr').style.visibility = 'visible'
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
    if(guess==NaN|guess==null){
        guess = 1
    }
    //Caso o valor do input não for

    newtonRaphson(guess)
    //Declaração da função com o valor do chute 
}
const partialDerivativeX2 = function (foo, x, y){
    //foo = função que vai ser derivada nos pontos x e y
    const h = 0.0001

    const f = new Function("x, y, z", "return " + foo)

    return (f(x+h, y) - f(x-h, y))/(2*h)
}
const partialDerivativeX3 = function (foo, x, y, z){
    //foo = função que vai ser derivada nos pontos x e y
    const h = 0.0001

    const f = new Function("x, y, z", "return " + foo)

    return (f(x+h, y, z) - f(x-h, y, z))/(2*h)
}
const partialDerivativeY2 = function (foo, x, y){
    //foo = função que vai ser derivada nos pontos x e y
    const h = 0.0001

    const f = new Function("x, y, z", "return " + foo)

    return (f(x, y+h) - f(x, y-h))/(2*h)
}
const partialDerivativeY3 = function (foo, x, y, z){
    //foo = função que vai ser derivada nos pontos x e y
    const h = 0.0001

    const f = new Function("x, y, z", "return " + foo)

    return (f(x, y+h, z) - f(x, y-h, z))/(2*h)
}
const partialDerivativeZ3 = function (foo, x, y, z){
    //foo = função que vai ser derivada nos pontos x,y e z
    const h = 0.0001

    const f = new Function("x, y, z", "return " + foo)

    return (f(x, y, z+h) - f(x, y, z-h))/(2*h)
}
const jacobianMatrix = function (fc1, fc2, x, y, fc3, z){
    // Matriz jacobiana - Essa é a derivada parcial de cada uma das icognitas (colunas) em cada uma das funções (linhas)
    // O codigo só suporta o formato de matriz 3x3
    if(fc3 == undefined){
        let rm = [[partialDerivativeX2(fc1, x, y), partialDerivativeY2(fc1, x, y)],
        [partialDerivativeX2(fc2, x, y), partialDerivativeY2(fc2, x, y)]]

        return rm
    }
    else{
        let rm = [[partialDerivativeX3(fc1, x, y, z), partialDerivativeY3(fc1, x, y, z), partialDerivativeZ3(fc1, x, y, z)],
        [partialDerivativeX3(fc2, x, y, z), partialDerivativeY3(fc2, x, y, z), partialDerivativeZ3(fc2, x, y, z)],
        [partialDerivativeX3(fc3, x, y, z), partialDerivativeY3(fc3, x, y, z), partialDerivativeZ3(fc3, x, y, z)]]

        return rm
    }
    // Precisa de uma função para definir o tamanho da matriz a partir do numero de ic e fc
}
const calculaMatrixNR = function (){
    //Declaração de iteração
    let i = 0

    //Declaração de função 
    const rawfc1 = window.document.querySelector("#functionNR1").value
    const rawfc2 = window.document.querySelector("#functionNR2").value
    let rawfc3 = window.document.querySelector("#functionNR3").value
    
    //alerta para inserir uma função
    if(rawfc1 == ""||rawfc2 == ""){
        window.alert("Insira algo no campo de função")
    }

    //Declaração de icognita e condicional
    let x = window.document.querySelector("#inpNR1")
    let xi = Number(x.value)
    let y = window.document.querySelector("#inpNR2")
    let yi = Number(y.value)
    let z = window.document.querySelector("#inpNR3")
    let zi = Number(z.value)

    //Formatação da icognita
    const iFormat = function (x) {
        if(x == NaN | x == undefined | x == ""){
            x = 1
        }
        return x
    }

    xi = iFormat(xi)
    yi = iFormat(yi)
    
    if(rawfc3 == undefined){
        zi = undefined
    }
    else{
        if(zi == undefined | zi == NaN){
            zi = undefined
        }
        else{
            zi = iFormat(zi)
        }
    }

    //Formatação da função
    if(rawfc3 == ''){
        rawfc3 = undefined
    }

    let fc1 = functionFormat(rawfc1)
    let fc2 = functionFormat(rawfc2)
    if(rawfc3 != undefined){
        let fc3 = functionFormat(rawfc3)
    }
    else{
        let fc3 = undefined
    }

    const newtonRaphson2 = function (fc1, fc2, x, y, fc3, z){
        // xk+1 = xk - J(Jacobiana Inversa) x F(xk)
        /* Esse método tem como objetivo encontrar a raiz de matrizes, 
        onde é possivel observar funções de mais de um variavel e estimar estas para que 
        o total de TODAS funções dêem zero */
    
        //delta é o erro permitido para o método analítico
        const deltaP = 0.0001
        const deltaN = -0.0001

        //links primordiais
        const resNR = document.querySelector("#resFinalNR")
    
        //resultado da funções (criação de função a partir da string da função)
        const calculaF1 = new Function("x, y", "return " + fc1)
        const calculaF2 = new Function("x, y", "return " + fc2)
    
        let res1 = calculaF1(x, y)
        let res2 = calculaF2(x, y)
    
        //calculo da matriz jacobiana e sua inversão
        let jacobian = jacobianMatrix(fc1, fc2, x, y, fc3, z)
        let invJacobian = math.inv(jacobian)
    
        //matrix de funções (F(xk))
        matrixF = [res1, res2]
    
        if(res1 == NaN | res1 == null | res2 == NaN | res2 == null){
            //Caso dos resultados não conseguirem ser numericos
    
            resNR.innerHTML = "Função inválida"
        }
        else{
            if((res1<=deltaP & res1>=deltaN) & (res2<=deltaP & res2>=deltaN)){
                x = x.toFixed(6)
                y = y.toFixed(6)

                resNR.innerHTML = `Os valores da raiz de ${rawfc1} e ${rawfc2} são de x = ${x} e y = ${y}, obtidos na iteração ${i}`
            }
            else{
                if(i>=500){
                    resNR.innerHTML = `O método ultrapassou 500 iterações`
                }
                else{
                    //soma da iteração
                    i++
    
                    //obter a multiplicação das matrizes
                    let mult = math.multiply(invJacobian, matrixF)
    
                    let xk1 = x - mult[0]
                    let yk1 = y - mult[1]
                    let zk1 
    
                    newtonRaphson2(fc1, fc2, xk1, yk1, fc3, zk1)
                }
            }
        }
    }
    newtonRaphson2(fc1, fc2, xi, yi)
}