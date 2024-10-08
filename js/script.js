const resultados = document.getElementById('resultados');
const cargo = document.getElementById('cargo');
const form = document.getElementById('form');
const button = document.getElementById('button');
const arthur = document.getElementById('arthur');

const audiosArthur = [
    new Audio("./audio/Voicy_Either You Got A Lazy Eye Or Lack Of Respect.mp3"),
    new Audio("./audio/Voicy_Give Me That Money.mp3"),
    new Audio("./audio/Voicy_I Gave You All I Had.mp3"),
    new Audio("./audio/Voicy_I'm A Wanted Man.mp3"),
    new Audio("./audio/Voicy_We Are More Ghosts, Than People .mp3"),
    new Audio("./audio/Voicy_You Gotta Run, And Don't Look Back.mp3"),
];

arthur.addEventListener('click', (e) => {
    const randomIndex = Math.floor(Math.random() * audiosArthur.length);
    audiosArthur[randomIndex].play();
})

button.addEventListener('click', (event) => {
    event.preventDefault(); 

    const salario = parseFloat(document.getElementById('salario').value);
    const refeicao = parseFloat(document.getElementById('refeicao').value);
    let mesesTrabalhados = parseInt(document.getElementById('mesesTrabalhados').value);

    if (mesesTrabalhados > 12){
        mesesTrabalhados = 12;
    }else if(mesesTrabalhados <= 12)
        mesesTrabalhados = mesesTrabalhados;
    }
    
        

    const dadosVt = salario * 0.06; // VT
    const valorVa = 22 * refeicao;
    const setentaPorCento = valorVa * 0.7;
    const descontoFolha = valorVa - setentaPorCento;

    const faixa1 = [1320, 0.075, 0];
    const faixa2 = [1320, 2571, 0.09, 19.80];
    const faixa3 = [2571, 3856, 0.12, 96.94];
    const faixa4 = [3856, 7507, 0.14, 174.94];

    const imposto1 = [2112, 0, 0];
    const imposto2 = [2112.01, 2826.65, 0.075, 158.40];
    const imposto3 = [2826.65, 3751.05, 0.15, 370.40];
    const imposto4 = [3751.06, 4664.68, 0.225, 651.73];
    const imposto5 = [4664.68, 0.275, 884.96];

    let inss = 0;
    if (salario <= faixa1[0]) {
        inss = salario * faixa1[1];
    } else if (salario <= faixa2[1]) {
        inss = salario * faixa2[2] - faixa2[3];
    } else if (salario <= faixa3[1]) {
        inss = salario * faixa3[2] - faixa3[3];
    } else if (salario <= faixa4[1]) {
        inss = salario * faixa4[2] - faixa4[3];
    } else {
        inss = salario * faixa4[2] - faixa4[3];
    }

    let ir = 0;
    if (salario <= imposto1[0]) {
        ir = 0;
    } else if (salario <= imposto2[1]) {
        ir = salario * imposto2[2] - imposto2[3];
    } else if (salario <= imposto3[1]) {
        ir = salario * imposto3[2] - imposto3[3];
    } else if (salario <= imposto4[1]) {
        ir = salario * imposto4[2] - imposto4[3];
    } else {
        ir = salario * imposto5[1] - imposto5[2];
    }

    // Cálculo do Décimo Terceiro Salário
    const decimoTerceiro = (salario / 12) * mesesTrabalhados - inss - ir;

    // Cálculo do Auxílio-Doença
    const mediaAuxilio = salario * 0.90; // 90% do salário

     let valorParcela = 0;
    if (salario <= 1640.34) {
        valorParcela = salario * 0.8;
    } else if (salario > 1640.34 && salario <= 2736.27) {
        valorParcela = 1640.34 * 0.8 + 0.5 * (salario - 1640.34);
    } else {
        valorParcela = 1909.34; // Valor fixo para salários acima de 2736.27
    }

    resultados.innerHTML = `
        <table border="1">
            <tr><td>Cargo:</td><td>${cargo.value}</td></tr>
            <tr><td>Desconto Alimentação:</td><td>${descontoFolha.toFixed(2)}</td></tr>
            <tr><td>Desconto VT:</td><td>${dadosVt.toFixed(2)}</td></tr>
            <tr><td>Desconto INSS:</td><td>${inss.toFixed(2)}</td></tr>
            <tr><td>Desconto IR:</td><td>${ir.toFixed(2)}</td></tr>
            <tr><td>Décimo Terceiro:</td><td>${decimoTerceiro.toFixed(2)}</td></tr>
            <tr><td>Auxílio-doença:</td><td>${mediaAuxilio.toFixed(2)}</td></tr>
            <tr><td>Seguro desemprego:</td><td>${valorParcela.toFixed(2)}</td></tr>
        </table>
    `;
});
