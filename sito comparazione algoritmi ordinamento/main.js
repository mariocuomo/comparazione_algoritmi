let coppieitimer = [];

let numeroElementi = [];
let numeroTimer_Insertion = [];
let numeroTimer_Selection = [];

var numero_elementi_max = 1000;
var numerolabel=50;
var step = numero_elementi_max/numerolabel;

function iniziaComparazione()
{
    var i;
    for(i=1;i<numero_elementi_max;i++){
        computaArrayDiDimensionei(i);
    }


    for(i=0;i<numerolabel;i++){
        numeroElementi[i]=(i+1)*step
        numeroTimer_Insertion[i] = (coppieitimer[i*step])[1];
        numeroTimer_Selection[i] = (coppieitimer[i*step])[2];
    }
    

    creaGrafico();
}

function computaArrayDiDimensionei(max)
{
    let sequencetmp = [];
    let sequencetmp_copy = [];
    var i;
    var start;
    var end;

    //crea array
    for(i=0;i<max;i++){
        sequencetmp[i]=parseInt(Math.random()*numero_elementi_max);
        sequencetmp_copy[i]=sequencetmp[i];
    }
    
    /*
    =====
    Insertion Sort
    =====
    */
    start = performance.now();
    InsertionSort(sequencetmp);
    end = performance.now();
    var timerInsertion = end - start;
    pulisciArray(sequencetmp_copy,sequencetmp,max);

    /*
    =====
    Selection Sort
    =====
    */
    start = performance.now();
    SelectionSort(sequencetmp);
    end = performance.now();
    var timerSelection =  end - start;
    pulisciArray(sequencetmp_copy,sequencetmp,max);


    coppieitimer.push([max, timerInsertion, timerSelection]);
}

function InsertionSort(arrayDaOrdinare)
{
    var i;
    for (i=1; i<arrayDaOrdinare.length; i++) {
        let tmp = arrayDaOrdinare[i];
        var j = i-1; 
        while ((j > -1) && (tmp < arrayDaOrdinare[j])) {
            arrayDaOrdinare[j+1] = arrayDaOrdinare[j];
            j--;
        }
        arrayDaOrdinare[j+1] = tmp;
    }
}

function SelectionSort(arrayDaOrdinare)
{
    var i;
    for (i=0;i<arrayDaOrdinare.length-1;i++){
        var min=i;
        var j;
        for (j=i+1;j<arrayDaOrdinare.length;j++){
            if(arrayDaOrdinare[j]<arrayDaOrdinare[min])
                min=j;            
        }
        var tmp = arrayDaOrdinare[i];
        arrayDaOrdinare[i]=arrayDaOrdinare[min];
        arrayDaOrdinare[min]=tmp;
    }
}


function pulisciArray(arrayPulito, arrayDaPulire, length) {
  var i;
  for(i=0;i<length;i++)
    arrayDaPulire[i]=arrayPulito[i];
}

function creaGrafico(){

new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
      labels: numeroElementi,
      datasets: [{ 
          data: numeroTimer_Insertion,
          label: "InsertionSort",
          borderColor: "#3e95cd",
          fill: false
        },
        { 
            data: numeroTimer_Selection,
            label: "Selection Sort",
            borderColor: "#ffa500",
            fill: false
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Insertion Sort vs Selection Sort'
      },
      scales: {
        xAxes: [ {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'grandezza dell\'input'
          },
          ticks: {
            major: {
              fontStyle: 'bold',
              fontColor: '#FF0000'
            }
          }
        } ],
        yAxes: [ {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'tempo di computazione',
          },
          ticks: {
            beginAtZero:true
        }
        } ]
      }
    }
  });
}  

