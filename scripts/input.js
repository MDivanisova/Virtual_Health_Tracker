import { userExists } from "./show.js";

function saveMeasurments(obj){ // funkcija za zacuvuvanje na parametrite 
    let VHTracker = localStorage.getItem("VHTracker"); // zimanje od local storage

    if(VHTracker!=null) VHTracker = JSON.parse(VHTracker); // dokolku ima vo local storage  se parsirat 
    else VHTracker = []; // ako nema se pravi prazna niza

    VHTracker.push(obj); // go dodava novio element od measurments na krajot na nizata 
    VHTracker = JSON.stringify(VHTracker); // prave mu se stringify 
    localStorage.setItem("VHTracker", VHTracker); // i se smestuva vo local storage
}

function checkMeasurments(obj){ // funkcija za proverki ili validacija na measurments
    console.log(obj);

    if(obj.Steps == "" || obj.Calories == "" || obj.Pulse == "" || obj.Sleep == "" || obj.Weight == "" || obj.Height == ""){ // uslovi za ako se prazni  
        alert("Make sure you fill all the fields");
        return false;
    }

    if(obj.Steps < 0 || obj.Steps > 100000){ // uslov za granici na steps
        alert("Enter valid number of steps");
        return false;
    }
    if(obj.Calories < 1 || obj.Calories > 16000){ // uslov za granici na calorii
        alert("Enter valid number of calories");
        return false;
    }
    if(obj.Sleep < 0 || obj.Sleep > 24){ // uslov za granici na sleep
        alert("Enter valid number of hours slept")
        return false;
    }
    if(obj.Pulse < 40 || obj.Pulse > 200){ // uslov za granici na puls
        alert("Enter valid number of bpm");
        return false;
    }
    if(obj.Weight < 2 || obj.Weight > 500){ // uslov za granici na tezina
        alert("Enter valid number of kilograms");
        return false;
    }
    if(obj.Height < 45 || obj.Height > 250){ // uslov za granici na visina
        alert("Enter valid number of height");
        return false;
    }

    return true;
}

function getMeasurments(){ // funkcija za da se zimat mesurments
    let now = new Date(); // go zimame denesniot datum
    let formatted = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}` // se formatira vo oblik year/month/date

    let steps = document.getElementById("Steps").value; //zimanje na vrednostite od input tagovite vo html polinjata
    let calories = document.getElementById("Calories").value;
    let sleep = document.getElementById("Sleep").value;
    let weight = document.getElementById("Weight").value;
    let height = document.getElementById("Height").value;
    let pulse = document.getElementById("Pulse").value;

    let measurmentsObj = { // se pravi objekt so site vrednosti zaedno 
        "Date": formatted,
        "Steps": steps,
        "Calories": calories,
        "Sleep": sleep,
        "Weight": weight,
        "Height": height,
        "Pulse": pulse
    }


    let chck = checkMeasurments(measurmentsObj); // se validira objektot 
    if(chck) { saveMeasurments(measurmentsObj); window.location.reload();} // ako validacijata e tocna togaj se smestuva vo local storage i se pravi refresh

}

export function insertMeasurments(){ // funkcija insertiranje na measurments, gi zima validira i zacuvuva
    document.getElementById("Measurments_form").addEventListener("submit", function(e) { // se zima  elem so dadenio id so pritiskanje na kopceto 
        e.preventDefault(); // spercuva da se naprave refresh
        getMeasurments(); // se povikua funkcijata 
    });
}