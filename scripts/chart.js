function getMeasurments(){ // funkcija za da se zemat measurments 
    let measurments = localStorage.getItem("VHTracker");
    if(measurments != null) { // dali postoe nesto zacuvano  
        measurments = JSON.parse(measurments); // gi parsirame
        const lastSeven = measurments.slice(-7); // gi zimame poslednite 7 zapisi i gi smestuvame u promenliva
        return {data: lastSeven, empty:true} // vrakame gi vo objekt so data od poslednite 7 zapisi i promenliva sto znaci deka ima podatoci
    }
    else measurments = ["--","--","--","--","--","--","--"]; // ako ne postoe nesto zacuvano

    return  {data: measurments, empty:false}  // vrakame gi vo objekt so data od zapisi i promenliva sto znaci deka nemame podatoci
}   

function getXValues(){ // funkcija so koja ja zimame x valuto za vo graficite
    let result = getMeasurments(); // ja povikuvame funkcijata vo koj se smestuva objektot
   
    if(!result.empty) return result.data; // proveruvame sto ni vratil empty parametarot od objektot i ako e false se vrakjat podatocite od data parametarot 
    else{
        let res = []
        result.data.forEach(element => { // ako parametarot empty vratil true izminuvame niz sekoj elem vo result.Date gi smestuvame vo nizata  
            res.push(element.Date);
        }); 
        return res;
    }
    
}

function getYValues(mode){ // funkcija so koja ja zimame y valuto za vo graficite koja prima mode vrednost od 1-5 za koj grafik se povikuva
    let result = getMeasurments(); // ja povikuvame funkcijata
   
    if(!result.empty) { // proveruva se dali ima podatoci ili ne   
        return []
    }
    else{
        if(mode == 1){ // gi vrakjame cekorite za poslednite 7 dena
            let res = []
            result.data.forEach(element => {
                res.push(element.Steps);
            });
            return res;
        }
        if(mode == 2){ // gi vrakjame sleep h za poslednite 7 dena
            let res = []
            result.data.forEach(element => {
                res.push(element.Sleep);
            });
            return res;
        }
        if(mode == 3){ // gi vrakjame calories za poslednite 7 dena
            let res = []
            result.data.forEach(element => {
                res.push(element.Calories);
            });
            return res;
        }
        if(mode == 4){ // gi vrakjame pulse za poslednite 7 dena
            let res = []
            result.data.forEach(element => {
                res.push(element.Pulse);
            });
            return res;
        }
        if(mode == 5){ 
            let res = [];
            let now = new Date();
            let formatted = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
            if(result.data[result.data.length - 1].Date == formatted){ // proveruvame dali poslednio zapis e denes
                res.push(result.data[result.data.length - 1].Steps);
                res.push(result.data[result.data.length - 1].Sleep);
                res.push(result.data[result.data.length - 1].Calories);
                res.push(result.data[result.data.length - 1].Pulse);
            }
            return res; // ako e vrakjame gi 4 parametri za denes 

        }
        
    }
}


var xvalues = ["Steps", "Sleep", "Calories", "Pulse"]; // definirame gi oznakite na x osnata 
var yValues = getYValues(5); // zemame gi denesnite vrednosti za 4 parametri 
var barColors = ["#eb2323", "#17bedb","#dd1f8e","#1b632d"]; // definirame boja za sekoja kolona

new Chart("myChart", {
  type: "bar",
  data: {
    labels: xvalues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
        legend: {display: false},
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Values',  // Naslov na y oskata 
                    fontSize: 13,
                    fontColor: '#ffffff'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Parameters',  // Naslov na x oskata
                    fontSize: 13,
                    fontColor: '#ffffff'
                }
            }]
        },
        title: {
            display: true,
            text: 'Daily measurments',  // Naslov gore
            fontSize: 15,
            fontColor: '#ffffff',
            padding: 20
        }
    }
});


let xValues = getXValues(); // zimame gi vrednostite za x oskata
const yValues1 = getYValues(1); // zemame gi cekorite

new Chart("myChart1", {
    type: "line",
    data: {
        labels: xValues,
        datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "#ffffff",
            borderColor: "#eb2323",
            data: yValues1
        }]
    },
    options: {
        legend: {display: false},
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Steps',  // Naslov na y oskata 
                    fontSize: 13,
                    fontColor: '#ffffff'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Days',  // Naslov na x oskata
                    fontSize: 13,
                    fontColor: '#ffffff'
                }
            }]
        },
        title: {
            display: true,
            text: 'Steps in the last seven measurments',  // Naslov gore
            fontSize: 15,
            fontColor: '#ffffff',
            padding: 20
        }
    }
});

const yValues2 = getYValues(2); // zemame gi sleep h

new Chart("myChart2", {
    type: "line",
    data: {
        labels: xValues,
        datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "#ffffff",
            borderColor: "#17bedb",
            data: yValues2
        }]
    },
    options: {
        legend: {display: false},
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Sleep (hours)',  // Naslov na y oskata 
                    fontSize: 13,
                    fontColor: '#ffffff'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Days',  // Naslov na x oskata
                    fontSize: 13,
                    fontColor: '#ffffff'
                }
            }]
        },
        title: {
            display: true,
            text: 'Hours sleept in the last seven measurments',  // Naslov gore
            fontSize: 15,
            fontColor: '#ffffff',
            padding: 20
        }
    }
});


const yValues3 = getYValues(3); // zemame gi calories

new Chart("myChart3", {
    type: "line",
    data: {
        labels: xValues,
        datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "#ffffff",
            borderColor: "#dd1f8e",
            data: yValues3
        }]
    },
    options: {
        legend: {display: false},
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Calories',  // Naslov na y oskata 
                    fontSize: 13,
                    fontColor: '#ffffff'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Days',  // Naslov na x oskata
                    fontSize: 13,
                    fontColor: '#ffffff'
                }
            }]
        },
        title: {
            display: true,
            text: 'Calories eaten in the last seven measurments',  // Naslov gore
            fontSize: 15,
            fontColor: '#ffffff',
            padding: 20
        }
    }
});


const yValues4 = getYValues(4); // zemame go pulse

new Chart("myChart4", {
    type: "line",
    data: {
        labels: xValues,
        datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "#ffffff",
            borderColor: "#1b632d",
            data: yValues4
        }]
    },
    options: {
        legend: {display: false},
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Pulse (bpm)',  // Naslov na y oskata 
                    fontSize: 13,
                    fontColor: '#ffffff'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Days',  // Naslov na x oskata
                    fontSize: 13,
                    fontColor: '#ffffff'
                }
            }]
        },
        title: {
            display: true,
            text: 'Pulse (bpm) in the last seven measurments',  // Naslov gore
            fontSize: 15,
            fontColor: '#ffffff',
            padding: 20
        }
    }
});


