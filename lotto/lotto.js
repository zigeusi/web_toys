//로또 만들기

let luckyNum = new Set;
let yourLottos = [];

const setLuckyNumber = () => {    
    while(luckyNum.size < 6){
        luckyNum.add(Math.floor(45 * Math.random()) + 1);
    }
}

const buyLottos = (money) => {
    const tryNum = money/1000;
    console.log('로또 '+ tryNum + '개를 발행하였습니다.')
    for(let i = 0; i < tryNum; i++){
        let lottoNum = new Set;
        while(lottoNum.size < 6){
            lottoNum.add(Math.floor(45 * Math.random()) + 1);
        }
        yourLottos.push(lottoNum);        
    }
}

const checkLotto = () => {
    let num3 = 0;
    let num4 = 0;
    let num5 = 0;
    let num6 = 0;
    let prize3 = 0; 
    let prize4 = 0;
    let prize5 = 0;
    let prize6 = 0;

    yourLottos.forEach(lotto => {
        console.log([...lotto]);
        const bingo = [...lotto].filter(value => {return luckyNum.has(value)});
        const bingoNum = bingo.length;
        switch (bingoNum) {
            case 0:
            case 1:
                break;
            case 2:
                num3 += 1;
                break;
            case 3:
                num4 += 1;
                break;
            case 4:
                num5 += 1;
                break;
            case 5:
                num6 += 1;
                break;
            default:
                console.log('error');
        }
    })
    prize3 += num3;
    prize4 += num4;
    prize5 += num5;
    prize6 += num6;
    
    const prizeSum = prize3*5000 + prize4*5000 + prize5*50000 + prize6*2000000;
    const investment = yourLottos.length*1000
    const profitRate = ((prizeSum - investment)/investment) * 100;

    console.log('luckyNumber: ' + [...luckyNum])
    console.log('3개 일치 (5000원)- ' + prize3 + '개')
    console.log('4개 일치 (50000원)- ' + prize4 + '개')
    console.log('5개 일치 (1500000원)- ' + prize5 + '개')
    console.log('6개 일치 (2000000000원)- ' + prize6 + '개')
    console.log('나의 수익률은 ' + profitRate + '% 입니다')

}

setLuckyNumber();
buyLottos(5000);
checkLotto();
