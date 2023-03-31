function derivada(foo, x){
    const h = 0.001

    const f = new Function("x", "return " + foo)
    
    return (f(x+h)-f(x-h))/(2*h)
}

const calculaNR = function () {
    //let rawFunctionNR = "f(x) = x^^2 + x - 5"
    let rawFunctionNR = window.document.querySelector("input#functionNR").value
    //Obtem a função

    if(rawFunctionNR === ""){
        window.alert("Insira algo no campo de função")
    }

    const separaNum = /(?<==)[\s\d\*\-\+\/x²³\^]+/gi
    //RegExp para filtrar os operadores da função

    //Formatação da função (START)
    const simplified1FunctionNR = rawFunctionNR.replaceAll(" ","")
    const simplified2FunctionNR = simplified1FunctionNR.replaceAll(",", ".")
    const simplified3FunctionNR = simplified2FunctionNR.match(separaNum)
    //Separação de f(x), exclusão dos espaços e substituição da virgula

    let simplified4FunctionNR = new String(simplified3FunctionNR[0])
    //Transforma a função novamente em string (anteriormente era Array)

    const regExpDX = /\d(?=x)x[²³^12]?/gi
    const regExpD = /\d(?=x)/gi
    const regExpX = /(?<=\d)x[²³^12]?/gi
    //Grupos de RegExp para a separação

    const separaDX = simplified4FunctionNR.match(regExpDX)
    const separaD = simplified4FunctionNR.match(regExpD)
    const separaX = simplified4FunctionNR.match(regExpX)
    //Separação dos grupos de icognitas

    for(let pos in separaDX){
        simplified4FunctionNR = simplified4FunctionNR.replace(separaDX[pos], separaD[pos] + "*" + separaX[pos])
    }
    //Formata as iconitas que não estão multiplicadas

    const simplified5FunctionNR = simplified4FunctionNR.replaceAll(/x\^2|x²|x\^\^2/gi, "Math.pow(x, 2)")
    const functionNR = simplified5FunctionNR.replaceAll(/x\^3|x³|x\^\^3/gi, "Math.pow(x, 3)") 
    //Substituição dos expoentes
    //Formatação da função (END)
    
    let i = 1
    //Declara as iterações

    const newtonRaphson = function (g){ //xk+1 = xk - (fxk/f'xk)
        const deltaP = 0.0001
        const deltaN = -0.0001
        //Declara o delta (erro)
        
        const calculaF = new Function("x", "return " + functionNR)
        let res = calculaF(g)
        //Calcula o resultado da função com o valor de x

        let resNR = window.document.querySelector("#resFinal")
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
    
                    let dF = derivada(functionNR, g)
                    //Chama função para declarar
                    
                    nx = g - (res/dF)
                    //Calculo da formula de Newton-Raphson

                    //console.log(`${g} igual a ${res} na iteração ${i}`)
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
