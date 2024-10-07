/*
    Ratio Testsite Entry
*/

function requireAll(r: any) {
    r.keys().forEach(r);
}

//Require SASS
require('../sass/style.scss');

//JavaScript:
const radio = document.getElementById('progress').addEventListener('click', () => {


    const eerste = document.getElementById("weg").classList;
    eerste.add("visible");

    const list = document.getElementById("myDIV").classList;
    list.remove("visible");

    const lijst = document.getElementById("derde").classList;
    lijst.remove("visible");

})

const radio2 = document.getElementById('progress2').addEventListener('click', () => {

    let value = (document.getElementById("fname") as HTMLInputElement).value;
    let Lvalue = (document.getElementById("lname") as HTMLInputElement).value;
    if (value == "" || Lvalue == "") {
        alert("Je bent bent nog niet klaar.");
        let radio = (document.getElementById('progress') as HTMLInputElement)
        radio.checked = true;
    }

    else if ((document.getElementById('Man') as HTMLInputElement | null)?.checked || (document.getElementById('Vrouw') as HTMLInputElement | null)?.checked) {

        const eerste = document.getElementById("weg").classList;
        eerste.remove("visible");

        const list = document.getElementById("myDIV").classList;
        list.add("visible");

        const lijst = document.getElementById("derde").classList;
        lijst.remove("visible");
    }
    else {
        alert("Je bent bent nog niet klaar.");
        let radio = (document.getElementById('progress') as HTMLInputElement)
        radio.checked = true;
    }
})

const radio3 = document.getElementById('progress3').addEventListener('click', () => {

    let datum = (document.getElementById("datum") as HTMLInputElement).value;

    let nation = (document.getElementById("nation") as HTMLInputElement).value;
    let tel = (document.getElementById("tel") as HTMLInputElement).value;


    if (nation == "" || tel == "" || !datum) {
        alert("Je bent bent nog niet klaar.");
        let radio = (document.getElementById('progress2') as HTMLInputElement)
        radio.checked = true;
    }

    else if ((document.getElementById('Man') as HTMLInputElement | null)?.checked || (document.getElementById('Vrouw') as HTMLInputElement | null)?.checked) {
        const eerste = document.getElementById("weg").classList;
        eerste.remove("visible");

        const list = document.getElementById("derde").classList;
        list.add("visible");

        const lijst = document.getElementById("myDIV").classList;
        lijst.remove("visible");
    }

    else {
        alert("Je bent bent nog niet klaar.");
        let radio = (document.getElementById('progress2') as HTMLInputElement)
        radio.checked = true;
    }

})

document.getElementById("next-page-button").addEventListener('click', () => {

    let value = (document.getElementById("fname") as HTMLInputElement).value;
    let Lvalue = (document.getElementById("lname") as HTMLInputElement).value;

    let naam = (document.getElementById("fname") as HTMLInputElement).name;
    let Lnaam = (document.getElementById("lname") as HTMLInputElement).name;

    if (value == "") {
        alert("Je hebt je " + naam + " niet ingevuld!");
        return false
    }

    else if (Lvalue == "") {
        alert("Je hebt je " + Lnaam + " niet ingevuld!");
        return false
    }

    else if ((document.getElementById('Man') as HTMLInputElement | null)?.checked || (document.getElementById('Vrouw') as HTMLInputElement | null)?.checked) {

        const list = document.getElementById("myDIV").classList;
        list.add("visible");

        const lijst = document.getElementById("weg").classList;
        lijst.remove("visible");

        const progress2 = document.getElementById("progress2") as HTMLInputElement;
        progress2.checked = true;
    }

    else {
        alert("Je hebt je geslacht niet ingevuld");
    }

})

document.getElementById("terug").addEventListener('click', () => {

    const list = document.getElementById("myDIV").classList;
    list.remove("visible");

    const lijst = document.getElementById("weg").classList;
    lijst.add("visible");

    const progress1 = document.getElementById("progress") as HTMLInputElement;
    progress1.checked = true;
})


document.getElementById("verder").addEventListener('click', () => {

    let datum = (document.getElementById("datum") as HTMLInputElement).value;

    let nation = (document.getElementById("nation") as HTMLInputElement).value;
    let tel = (document.getElementById("tel") as HTMLInputElement).value;


    let landnaam = (document.getElementById("nation") as HTMLInputElement).name;
    let telnummer = (document.getElementById("tel") as HTMLInputElement).name;
    let date = (document.getElementById("datum") as HTMLInputElement).name;

    if (!datum) {
        alert("Je hebt je " + date + " niet ingevuld!");
        return false;
    }

    if (nation == "") {
        alert("Je hebt je " + landnaam + " niet ingevuld!");
        return false;
    }

    else if (tel == "") {
        alert("Je hebt je " + telnummer + " niet ingevuld!");
        return false;
    }

    if ((document.getElementById('Ja') as HTMLInputElement | null)?.checked || (document.getElementById('nee') as HTMLInputElement | null)?.checked) {

        const list = document.getElementById("derde").classList;
        list.add("visible");

        const lijst = document.getElementById("myDIV").classList;
        lijst.remove("visible");

        const progress1 = document.getElementById("progress3") as HTMLInputElement;
        progress1.checked = true;
    }

    else {
        alert("Je hebt kinderen niet ingevuld");
        return false;
    }
})

document.getElementById("terug2").addEventListener('click', () => {

    const list = document.getElementById("derde").classList;
    list.remove("visible");

    const lijst = document.getElementById("myDIV").classList;
    lijst.add("visible");

    const progress2 = document.getElementById("progress2") as HTMLInputElement;
    progress2.checked = true;
})


document.getElementById("Verstuur").addEventListener('click', () => {

    let Adresvalue = (document.getElementById("adres") as HTMLInputElement).value;
    let adresnaam = (document.getElementById("adres") as HTMLInputElement).name;

    let Svalue = (document.getElementById("school") as HTMLInputElement).value;
    let schoolnaam = (document.getElementById("school") as HTMLInputElement).name;
    if (Adresvalue == "") {
        alert("Je hebt je " + adresnaam + " niet ingevuld!");
        return false
    }

    else if (Svalue == "") {
        alert("Je hebt je " + schoolnaam + " niet ingevuld!");
        return false
    }

})

/*
    Submit Functie
*/

let formElement = document.querySelector("form.form") as HTMLFormElement
formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('formulier verzenden');

    let data = new FormData(formElement);
    let response = doRequest('submit.php', data);

    response.then((data) => {
        console.log(data);

        document.getElementById("demo").innerHTML = data.message;

        if (data.status == true) {
            document.getElementById("demo").style.color = "green";
        }

        else {
            document.getElementById("demo").style.color = "red";
        }
        return false;
    });
})

async function doRequest(url: string, data: FormData) {
    const response = await fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        redirect: 'follow',
        body: data
    });

    return response.json();
}