import { weather } from "./Api.js"; // importiranje na weather od Api.js

function todayMeasurments(lastDay){ // funkcija za denesknite measurments koja prima prametar, datum na poslednite zacuvani informacii 
    let now = new Date(); // se zima denesnata data 
    let formatted = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`; // se formatira vo dadenio foramt
    if(lastDay == formatted)return true // se sporeduva datumot na podlesnite zacuvani informacii so denesniot datum  ako se isti se vrakja true 
    return false;
}

function activity_lvl(){ // funkcija za lvl na aktivnost 
    let measurments = localStorage.getItem("VHTracker"); // se zimaat measurmentst od local storage
    if(measurments == null){ // proveruva se dali ima informacii 
        return "No information";
    }
    measurments = JSON.parse(measurments); // parsirat se 
    let lastDay = measurments[measurments.length-1]; // se zimat poslednite informacii  
    let isToday = todayMeasurments(lastDay.Date); // se povikuva todaymesurment so datat od poslednite informacii 

    if(!isToday || (isToday && lastDay.Steps <= 3000)){  // se proveruva ako poslednite informacii ne e deneska ili ako cekorite se pod 3000 , stava se activity lvl low
        let temp = document.getElementById("activity_lvl").innerHTML.split(" ")[0]; // zimame go delo od eleemtno kaj so treba da go smesteme activity lvl
        let activity_lvl = " low"; 
        document.getElementById("activity_lvl").innerHTML = temp + activity_lvl; 
        return "low";
    }

    if(isToday && (lastDay.Steps > 3000 || lastDay.Steps <= 6000)){ // se proveruva ako datata na poslednite informacii e denes se stava normal activity lvl
        let temp = document.getElementById("activity_lvl").innerHTML.split(" ")[0]; // zimame go delo od elemtno kaj so treba da go smesteme activity lvl
        let activity_lvl = " normal";
        document.getElementById("activity_lvl").innerHTML = temp + activity_lvl;
        return "normal"
    }

    if(isToday && lastDay.Steps > 6000){ // se proveruva ako datata na poslednite informacii e denes se stava high activity lvl
        let temp = document.getElementById("activity_lvl").innerHTML.split(" ")[0]; // zimame go delo od elemtno kaj so treba da go smesteme activity lvl
        let activity_lvl = " high";
        document.getElementById("activity_lvl").innerHTML = temp + activity_lvl;
        return "high";
    }
}

function recomendation(res){ // funkcija za rekomendiranje na tekst koja prima objekt so vremenski podatoci
    let activity = activity_lvl(); // se zima activity lvl
    const weather = res.description; // kakvo e vremeto rain cloud snow slear
    const temp = res.temperature; // kakva e temperaturata
    let recommendation = ""; 
    
    if(activity == "low") { // dokolku activity e low, nadole se pravat proeruvanja za toa kakvo e vremeto i se zavisi kakvo e vremeto i activity lvl se dava soodveten tekst
        if(weather == "Rain" && temp <= 10) {  
            recommendation = "You weren't very active today, but the weather is harsh. Try light indoor activity or a short walk if needed.";
        }
        else if(weather == "Rain" && temp > 10 && temp <= 22) {
            recommendation = "Good chance to go out and be active — just bring an umbrella.";
        }
        else if(weather == "Rain" && temp > 22) {
            recommendation = "Move, but keep it light and stay hydrated.";
        }
        else if((weather == "Clouds" || weather == "Mist") && temp <= 10) {
            recommendation = "You could use some movement. Dress warm and take a short walk.";
        }
        else if((weather == "Clouds" || weather == "Mist") && temp > 10 && temp <= 22) {
            recommendation = "Great weather to go out and be active.";
        }
        else if((weather == "Clouds" || weather == "Mist") && temp > 22) {
            recommendation = "Light activity is recommended, avoid the heat.";
        }
        else if(weather == "Clear" && temp <= 10) {
            recommendation = "Good weather for movement — just dress warmly.";
        }
        else if(weather == "Clear" && temp > 10 && temp <= 22) {
            recommendation = "Perfect conditions to go out and be active.";
        }
        else if(weather == "Clear" && temp > 22) {
            recommendation = "Go out, but choose light activity and drink water.";
        }
        else if(weather == "Snow") {
            recommendation = "A short winter walk could be refreshing if you're dressed properly.";
        }
    }
    else if(activity == "normal") { // dokolku activity e normal, nadole se pravat proeruvanja za toa kakvo e vremeto i se zavisi kakvo e vremeto i activity lvl se dava soodveten tekst
        if(weather == "Rain" && temp <= 10) {
            recommendation = "Light activity is fine if needed.";
        }
        else if(weather == "Rain" && temp > 10 && temp <= 22) {
            recommendation = "You can go out if you want, but rest is also okay.";
        }
        else if(weather == "Rain" && temp > 22) {
            recommendation = "Avoid extra effort — maintain your balance.";
        }
        else if((weather == "Clouds" || weather == "Mist") && temp <= 10) {
            recommendation = "Maintain your routine, just dress warmly.";
        }
        else if((weather == "Clouds" || weather == "Mist") && temp > 10 && temp <= 22) {
            recommendation = "Nice weather to stay balanced with light movement.";
        }
        else if((weather == "Clouds" || weather == "Mist") && temp > 22) {
            recommendation = "No need for extra activity — stay comfortable.";
        }
        else if(weather == "Clear" && temp <= 10) {
            recommendation = "Optional outdoor time, depending on how you feel.";
        }
        else if(weather == "Clear" && temp > 10 && temp <= 22) {
            recommendation = "Good weather — do what feels right.";
        }
        else if(weather == "Clear" && temp > 22) {
            recommendation = "Relax or keep activity light.";
        }
        else if(weather == "Snow") {
            recommendation = "A calm walk is okay, but not necessary.";
        }
    }
    else if(activity == "high") { // dokolku activity e high, nadole se pravat proeruvanja za toa kakvo e vremeto i se zavisi kakvo e vremeto i activity lvl se dava soodveten tekst
        if(weather == "Rain" && temp <= 10) {
            recommendation = "You've been very active today. Stay indoors and let your body recover.";
        }
        else if(weather == "Rain" && temp > 10 && temp <= 22) {
            recommendation = "Consider resting and recharging.";
        }
        else if(weather == "Rain" && temp > 22) {
            recommendation = "Avoid going out — heat plus fatigue isn't ideal.";
        }
        else if((weather == "Clouds" || weather == "Mist") && temp <= 10) {
            recommendation = "Recovery time is important — stay warm and rest.";
        }
        else if((weather == "Clouds" || weather == "Mist") && temp > 10 && temp <= 22) {
            recommendation = "Good moment to relax and take it easy.";
        }
        else if((weather == "Clouds" || weather == "Mist") && temp > 22) {
            recommendation = "Rest indoors and hydrate.";
        }
        else if(weather == "Clear" && temp <= 10) {
            recommendation = "Even though the weather is nice, your body needs rest.";
        }
        else if(weather == "Clear" && temp > 10 && temp <= 22) {
            recommendation = "Perfect weather to sit, relax, and enjoy the view.";
        }
        else if(weather == "Clear" && temp > 22) {
            recommendation = "Stay inside, cool down, and recover.";
        }
        else if(weather == "Snow") {
            recommendation = "You've already been very active. Best choice is rest and recovery indoors.";
        }
    }
    
    document.getElementById("recomendation").innerHTML = recommendation; // go smestuvame u soodvetnio html tag
}

function showWelcomeBox(user){ // funkcija za prikazuvanje na informaciite u prvio kvadrat kako slika u zavisnost dali e masko ili zensko i tekst so negovato ime
    document.getElementById("info_place").innerHTML = `Hello, ${user.name} `;
    let img_src = "";
    if(user.gender == "Female")img_src = "./materials/female.png";
    else img_src = "./materials/male.png";
    document.getElementById("img").src = img_src;
}

async function showWeather(city){ // asinhrona funkcija koja ceka odgovor od API pred da prodolzi
    let res = await weather(city); // ja povukcuvame funkcijata weather i cekame da dobieme informacii za vremento za grano na korisniko

    document.getElementById('city').innerHTML = city; // se prikazuva imeto na gradot 
    console.log(res.description);
    if(res.description == "Snow"){  // se proveruva kakva e vremenskata prognoza vo gradot i se prikazuva soodvetna ikonka
        document.getElementById("weather").innerHTML = `<i class="fas fa-snowflake"> ${res.description}</i>`
    }
    if(res.description == "Clear"){
        document.getElementById("weather").innerHTML = `<i class="fas fa-sun"> ${res.description}</i>`
    }
    if(res.description == "Rain"){
        document.getElementById("weather").innerHTML = `<i class="fas fa-cloud-rain"> ${res.description}</i>`
    }
    if(res.description == "Clouds"){
        document.getElementById("weather").innerHTML = `<i class="fa-solid fa-cloud"> ${res.description}</i>`
    }
    if(res.description == "Mist"){
        document.getElementById("weather").innerHTML = `<i class="fa-solid fa-cloud-fog"> ${res.description}</i>`
    }

    document.getElementById("temperature").innerHTML = ` ${res.temperature}`; // se prikazuva temperaturata
    document.getElementById("wind").innerHTML = ` ${res.windSpeed}`; // se prikazuva brzinata na veterot
    recomendation(res); // i se povikuva funkcijata za rekomendiranje na tekst 
}

function bmiShow(){ // funkcija za prikazuvanje na bmi 
    let measurments = localStorage.getItem("VHTracker"); // se zimat informaciite od local storage
    if(measurments != null){ // se proveruva dali ima informacii
        measurments = JSON.parse(measurments); // se parsirat
        let lastDay = measurments[measurments.length-1]; // go zimaa posledntoo merenje 
        let isToday = todayMeasurments(lastDay.Date); // proveruvame dali e denes toa posledno merenje
        if(isToday){ // ako e denes se presmetuva bmi so dolnite formuli 
            const bmi = lastDay.Weight*10000 / (lastDay.Height * lastDay.Height);
            document.getElementById("bmi_value").innerHTML= bmi.toFixed(2); // i se smestuva vo selektiranio html tag
    
        }
    }
}

function fillTable(data, type=1){ // funkcija za smestuvanje na infroamcii vo tabelite koja prima objekt so informacii i za  koja tabela se rabote koja standardno e 1
    if(type == 2){ // gi popolnuva vrednostite vo drugata tabela za prethodnite denovi 
        document.getElementById("Steps_vn").innerHTML = data.Steps
        document.getElementById("Calories_vn").innerHTML = data.Calories
        document.getElementById("Sleep_vn").innerHTML = data.Sleep
        document.getElementById("Pulse_vn").innerHTML = data.Pulse
    }
    else{ // tabela posedbna za denesnite informacii 
        document.getElementById("Steps_v").innerHTML = data.Steps
        document.getElementById("Calories_v").innerHTML = data.Calories
        document.getElementById("Sleep_v").innerHTML = data.Sleep
        document.getElementById("Pulse_v").innerHTML = data.Pulse

    }
}

function makeMeasurmentsListing(measurments){ // funkcija koja prima measurments informaciite za site denovi
    let index = measurments.length - 2; // go stavame indekso na pretposlednoto merenje
    if(!todayMeasurments(measurments[index+1].Date)){ // se proveruva dali poslednoto merenje e denes 
        index = index + 1; // ako ne e se pomestuva indekso za 1 za da go prikaze denesnoto merenje
    }
    if(index>=0){ // ako indekso e validen i postoe merenje 
        localStorage.setItem("index", JSON.stringify(index)); // se zacuvuva tekovnio index vo local storage

        fillTable(measurments[index],2); // ja popolnuvame tabelata so merenja od taj den 
        document.getElementById('Preview').innerHTML = measurments[index].Date; // go prikazuvame datumo vo html tago za koja data se rabote
    }
    goLeftMeasurments(measurments); // se povikuvaat funckiite da odeenje na levo i desno na koj i se prava measurments 
    goRightMeasurments(measurments);
}

function exportImplementation(){ // funckija za export na measurments
    let exportData = localStorage.getItem("VHTracker"); // se zimat od local storage
    if(exportData != null) // proveruva se dali imame informacii 
        if (exportData.length === 0) return alert("Нема податоци за извоз!");

    let dataStr = JSON.stringify(exportData, null, 2); // gi pretvarame vo JSOn tekst 
        let blob = new Blob([dataStr], { type: "application/json" }); // so blob se podgotvuvat podatocite za da se prevzemat kako file 
    let url = URL.createObjectURL(blob); // pravi privremen URL
    
 
    document.getElementById('export').addEventListener('click',function(){  // se ceka da se klikne kopceto export
        const link = document.createElement('a');
        link.href = url; // se pravi kako nevidliv link i mu se stava dinamicko ime na fajlo 
        link.download = 'VHTracker-data_' + new Date().toISOString().split('T')[0] + '.json';
    
        document.body.appendChild(link); // dodava go linko na stranicata
        link.click(); // kliknuva se avtomatski
        document.body.removeChild(link); // brise se linko od stranicata 
    
        setTimeout(() => URL.revokeObjectURL(url), 100); // po 100 ms se se brise privremenio url za da se oslobode memorija
    })
}

function importImplementation(){ // funkcija za importiranje na informacii na korisniko 
    document.getElementById('file').addEventListener('change', async function(event) {  // se ceka korisniko da izbere file 
    const file = event.target.files[0]; // go zima prvio izbran file
    
    if (!file) return; // ako ne e izbran file stopira 
    
    try { 
        const text = await file.text(); // ja cita sodrzinaa od file 
        let data = JSON.parse(text); 
        data = JSON.stringify(data); // prvo se parsira teksto pa se pretvara nazad vo txt 
        localStorage.setItem("VHTracker", data); // gi zacuvuva podatocite vo local storage 
        window.location.reload(); // se prave refresh 

    } catch (error) { // ako fane greska ja pecate vo console log
        console.error('Error:', error);
    }
    });
}

function fadeOut(callback) { // funkcija za fade efekt koja prima amonimna funkcija 
    let element = document.getElementById('animate'); // go zima elemento 
    let opacity = 0.6; // opasity se stava na 0.6
    let fade = setInterval(() => { // stava se interval koj se povtoruva sekoj 15 mili sec
        if (opacity <= 0) {
            clearInterval(fade);
            element.style.opacity = 0; 
            if (callback) callback();
        } // koga opasity staasa do nula, opasity se stava na nula i se povikuva callback funkcijata 
        element.style.opacity = opacity; // na sekoj 15 mili sec se namaluva opasity za o.5 
        opacity -= 0.05;
    }, 15);
}

function fadeIn() { // funkcija za fade in efect 
    let element = document.getElementById('animate'); // se zima html tago 
    let opacity = 0.0; // stava mu se opasity 0.0 
    let fade = setInterval(() => { // se stava interval koj se povtoruva na sekoj 10 mili sec
        if (opacity >= 1) { // koga opasity ke stigne do 1, stopira se i se stave opasity na 1
            clearInterval(fade);
            element.style.opacity = 1;
        }
        element.style.opacity = opacity; // zgolemuva se opasity za 0.05
        opacity += 0.05;
    }, 10);
}

export function goLeftMeasurments(measurments){ // funkcija za listanje na informaciite na levo koja gi zima site measurments
    document.getElementById("left").addEventListener('click', function(){ // se ceka da se klikne na kopceto za levo 

        let index = localStorage.getItem('index'); // se zima tekovnio index na infroamtions
        index = JSON.parse(index); // se parsira
        if(index - 1 < 0){ // ako slednio index e pomal od 0 ne pravi nisto 
        }
        else{ // ako e validen go namaluva indexo za 1 i gi prikazuva prethodnite informacii 
            index = index - 1;
            localStorage.setItem("index", JSON.stringify(index));
            document.getElementById('Preview').innerHTML = measurments[index].Date;
            fadeOut(() => { // se povikuva fade out mu se prakja funkcija koja e za popolnuvanej na tabelata i za fade in efekt
                fillTable(measurments[index], 2); 
                fadeIn();
            });
        }
    })
}

export function goRightMeasurments(measurments){ // funkcija za listanje na informaciite koja gi zima site measurments
    document.getElementById("right").addEventListener('click', function(){ // ceka se da se klikne kopceto za desno 
        let index = localStorage.getItem('index'); //indekso na elemento 
        index = JSON.parse(index); // parsira se
        if(index + 1 > measurments.length-2 ){ // ako indekso e na krajo na nizata se proveruva dali posledntoo merenje e denes ako ne e moze da se ode na desno
            if(!todayMeasurments(measurments[index+1].Date)){
                index = index + 1;
                localStorage.setItem("index", JSON.stringify(index));
                document.getElementById('Preview').innerHTML = measurments[index].Date;
                fadeOut(() => {
                    fillTable(measurments[index], 2); 
                    fadeIn();
                });
            }
        }
        else{ // ako sme u sredinata na nizata indekso se zgolemuva go zacucuva vo local storage, prikazuva se datumo i se prave fade animacija
            index = index + 1;
            localStorage.setItem("index", JSON.stringify(index));
            document.getElementById('Preview').innerHTML = measurments[index].Date;
            fadeOut(() => {
                fillTable(measurments[index], 2); 
                fadeIn();
            });
        }
    })
}

export function resetAll(){ // funkcija za reseriranje na site html tagovi 
    document.getElementById("info_place").innerHTML=""; // Hello, Martina
    document.getElementById("img").src=""; //img (female,male)
    document.getElementById("M").innerHTML=""; //You entered youre daily measurments or you already entered
    document.getElementById("bmi_value").innerHTML="--";
    document.getElementById("Preview").innerHTML="--";
    document.getElementById("Steps_v").innerHTML="--"
    document.getElementById("Calories_v").innerHTML="--"
    document.getElementById("Sleep_v").innerHTML="--"
    document.getElementById("Pulse_v").innerHTML="--"
    document.getElementById("Steps_vn").innerHTML="--"
    document.getElementById("Calories_vn").innerHTML="--"
    document.getElementById("Sleep_vn").innerHTML="--"
    document.getElementById("Pulse_vn").innerHTML="--"
    let temp = document.getElementById("activity_lvl").innerHTML.split(" ")[0];
    let activity_lvl = "<br> ???";
    document.getElementById("activity_lvl").innerHTML = temp + activity_lvl;
    document.getElementById("city").innerHTML="----"
    document.getElementById("weather").innerHTML="--";
    document.getElementById("temperature").innerHTML="--";
    document.getElementById("wind").innerHTML="--";
    document.getElementById("recomendation").innerHTML="--";


    document.getElementById("Steps").value = "";
    document.getElementById("Calories").value = "";
    document.getElementById("Sleep").value = "";
    document.getElementById("Pulse").value = "";
    document.getElementById("Height").value = "";
    document.getElementById("Weight").value = "";
    
}

export function userExists(){ // funkcija za da se proveruva dali postoi user vo local storage
    let user = localStorage.getItem("User"); //se zima od local storage
    if(user != null){ // se proveruva dali postoi korisnik 
        console.log("POstoi user")

        user = JSON.parse(user); // ako postoi se parsira 
        document.getElementById("blured").style.filter= 'blur(0px)' // se otstranuva blured efektot
        document.getElementById("Information").style.visibility = 'hidden'; // i se krie formata za informacii na usero 
        
        let measurments = localStorage.getItem("VHTracker"); // gi zimame merenjata od local storage
        let now = new Date(); // go ziamme denesnio den i go formatirame
        let formatted = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}` 
        if(measurments != null){ // se proveruva dali ima measurments vo local storig i ako ima se parsirat se zima poslednio den i se proveruva dali e denes so funkcijatata
            measurments = JSON.parse(measurments); 
            let lastDay = measurments[measurments.length-1];  
            let isToday = todayMeasurments(lastDay.Date);
            makeMeasurmentsListing(measurments); // se povikuva funkcijata  za listanje na measurments
            if(isToday){ // e denes se puni tabelata za denes i praveme disable na formata da ne mozae da se vnesuva veke za deneska
                fillTable(lastDay); 
                document.getElementById("M").innerHTML = `You entered your daily measurments for <br> ${formatted}`;
                document.getElementById("Steps").disabled=true;
                document.getElementById("Calories").disabled=true;
                document.getElementById("Sleep").disabled=true;
                document.getElementById("Pulse").disabled=true;
                document.getElementById("Height").disabled=true;
                document.getElementById("Weight").disabled=true;
                document.getElementById('Submit2').disabled = true;
            }
            else{ // dokolku ne e denes
                document.getElementById("M").innerHTML = `Enter your daily measurments for <br> ${formatted}`;
            }
        }
        else{ // dokolku nema informacii za denes
            document.getElementById("M").innerHTML = `Enter your daily measurments for <br> ${formatted}`;
        }
        showWelcomeBox(user); // se povikuvaat funkciite
        showWeather(user.city);
        bmiShow();
        importImplementation();
        exportImplementation();
    }
}

export async function inputUserInformation(){ // funkcija koja e eksportirana i asinhrona za vnesuvanje na informacii na korisniko dokolku ne postoi 
    document.getElementById("Measurments_form1").addEventListener("submit", async function(){ // se ceka submit od korisnikot na formata
        let name = document.getElementById("Name").value; // se zimaat vrednostite od input elementite
        let city = document.getElementById("City").value;
        let gender = document.getElementById("Gender").value;
        
        if(name == "" || city == "" || gender == ""){
        alert("Please fill in all fields!");
        return;
        }
        if(name.length < 2 || name.length > 30){
            alert("Name must be between 2 and 30 characters!");
            return;
        }
        if(city.length < 2 || city.length > 30){
            alert("City must be between 2 and 30 characters!");
            return;
        }


        let user = { // se pravi objekt za korisniko
            "name": name,
            "city": city,
            "gender": gender
        }
        
        localStorage.setItem("User", JSON.stringify(user)); // se smestuva u localstorage

        
        showWelcomeBox(user); // se povikuva funkcijata
        await showWeather(user.city); // se ceka da se vcita vremeto 
        
        document.getElementById("blured").style.filter= 'blur(0px)' // se otstranuva blured i se krie formata 
        document.getElementById("Information").style.visibility = 'hidden';
        document.getElementById("City").value = "";  // se cistat input po registracija na korisniko 
        document.getElementById("Name").value = "";

    });
}



