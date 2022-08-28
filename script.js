const fetchInput = () => {
    let inputEle = document.getElementById('arr');
    let inputArrVal = inputEle.value.split(',');
    let bricks = waterAndBricks(inputArr)
    let water = onlyWater(inputArr)
}

// create table function

const createTable = (xaxisinput,outputArr,id)  => {
    var dom = document.getElementById(id);
    var myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
    });
    var option;
    option = {
    xAxis: {
        type: 'category',
        data: xaxisinput
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
        data: outputArr,
        type: 'bar'
        }
    ]
    };
    if (option && typeof option === 'object') {
    myChart.setOption(option);
    }
    window.addEventListener('resize', myChart.resize);
}


const waterAndBricks = (bricks) => {
    let finalCase=[]
    let firstCase=[]
    let secondCase=[]
    let result=[]
    let lastValueForFirstCase=0
    let lastValueForSecondCase=0
    for (let i = 0; i < bricks.length; i++) {
        let element = bricks[i];
        if (element == 0) {
            firstCase.push(lastValueForFirstCase)
        }else{
            firstCase.push('-')
            lastValueForFirstCase =element
        }
    }
    for (let  i = bricks.length - 1; i >= 0; i--) {
        let element = bricks[i];
        if (element == 0) {
            secondCase[i] = lastValueForSecondCase
        }else{
            secondCase[i]= '-'
            lastValueForSecondCase=element
        }
    }
    for (let i = 0; i < bricks.length; i++) {
        let fc=firstCase[i]
        let sc=secondCase[i]
        if (fc == '-') {
            finalCase[i]='-'
        }else{
            finalCase[i]=fc - sc > 0 ? sc : fc
        }
    }
    for (let i = 0; i < bricks.length; i++) {
        let element = bricks[i];
        if(element == 0){
            result.push({
                value: finalCase[i],
                itemStyle: {
                    color: '#0000FF'
                }
            })
        }else{
            result.push({
                value: element,
                itemStyle: {
                    color: '#FFFF00'
                }
            })
        }
    }
    console.log(firstCase);
    console.log(secondCase);
    console.log(finalCase);
    console.log(result);
    console.log(countWaterUnits(finalCase));
    createTable(bricks,result,'chart-container')
    let outputSpan = document.getElementById('waterunit')
    outputSpan.innerHTML= `Total ${countWaterUnits(finalCase)} Water Units` 
}