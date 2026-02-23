import {inputUserInformation, userExists, resetAll} from './show.js'; // importiranje na trite funkcii od fajlo show.js
import { insertMeasurments } from './input.js'; // importiranje na funkcijata od input.js


window.addEventListener('load', async function() { // funkcija koja se izvrsuva koga se vcituva stranictata i gi povikuva dolnite funkcii
    resetAll();
    await inputUserInformation();
    userExists();
    insertMeasurments();
});
