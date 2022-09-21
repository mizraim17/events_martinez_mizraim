///Game of clue version The office

//Variables of games

let selectUser = 0;

const suspectsArray = [
	{ id: 0, nombre: "Michael Scott" },
	{ id: 1, nombre: "Jim Halpert" },
	{ id: 2, nombre: "Dwight Schrute" },
	{ id: 3, nombre: "Pam Beesly" },
	{ id: 4, nombre: "Ryan Howard" },
	{ id: 5, nombre: "Oscar Martinez" },
	{ id: 6, nombre: "Angela Martin" },
	{ id: 7, nombre: "Andy Bernard" },
	{ id: 8, nombre: "Kevin Malone" },
];

const roomsArray = ["Cocina", "Oficina", "Zona de Estacionamiento", "Bodega"];

const weaponsArray = [
	"Olla",
	"Estrella ninja",
	"Parrilla Asadora",
	"Pistola",
	"Engrapadora",
];

//Function generate number random depending of size of array
let doRandom = (arrSearch) =>
	Math.round(Math.random() * (arrSearch.length - 1));

//Generate array without person die because he dont cant be the murder
let listWithoutMurder = (nameDiedPerson) => {
	newList = suspectsArray.filter((item) => item.nombre !== nameDiedPerson);
	return newList;
};

//Generate array only with assasin and person died

let genereAssesinMurder = () => {
	let arrayAssesinDied = [],
		numDiedPerson = parseInt(doRandom(suspectsArray)),
		listNew = listWithoutMurder(arrayAssesinDied[1]);

	arrayAssesinDied[1] = suspectsArray[numDiedPerson].nombre;
	arrayAssesinDied[0] = listNew;

	return arrayAssesinDied;
};

let oportunities = [false, false, false];

let menu = (asseMurder) => {
	let coins = 0;

	let arrWitMurd = asseMurder[0];

	let numAssesin = parseInt(doRandom(arrWitMurd));

	let numWeapon = parseInt(doRandom(weaponsArray));
	let numRoom = parseInt(doRandom(roomsArray));
	let gameWin = 0;

	//Me ayuda a encontrar el misterio y ganar
	// alert(`numAssesin ${numAssesin}`);
	// alert(`numWeapon ${numWeapon}`);
	// alert(`numnumRoomWeapon ${numRoom}`);

	do {
		// alert(`oportunities ${oportunities}`);
		// alert(`coins ${coins}`);

		let selectUser = parseInt(
			prompt(
				`"Bienvenido a Clue version the Office mataron a: "
				${
					asseMurder[1]
				} "es tu deber adivinar en 5 oportunidades, quién lo mato, con que lo mató y donde lo mató\n\n "${
					oportunities[0] == true
						? "Asesino adivinado \n"
						: "1.-Adivinar el nombre del asesino\n"
				} ${
					oportunities[1] == true ? "Arma adivinada\n" : "2. Adivinar Arma\n"
				}	${
					oportunities[2] == true
						? "Habitación adivinada"
						: " 3. Adivinar Habitación\n"
				}  `
			)
		);

		for (i = 0; i < 3; i++) {
			if (oportunities[i] === true) {
				gameWin++;
			}
		}

		switch (selectUser) {
			case 1:
				const TXT_1 = "Adivina el asesino seleciona su número";
				let instructions = "",
					optiAssesin = 0;
				counter = 0;

				for (element in arrWitMurd) {
					instructions =
						instructions + `${counter}.- ${arrWitMurd[element].nombre}\n`;
					counter++;
				}

				instructions + TXT_1;

				console.log("numero asesino", asseMurder[0]);

				do {
					optiAssesin = parseInt(prompt(`${instructions}`));
					coins++;

					// alert(`coins=${coins}`);
				} while (numAssesin !== optiAssesin && coins < 7);

				if (optiAssesin === numAssesin) {
					alert(`Ganaste fue ${arrWitMurd[numAssesin].nombre}`);
					selectUser = 0;
					oportunities[0] = true;
				} else if (coins === 5) {
					alert(`Perdiste fue ${arrWitMurd[numAssesin].nombre}`);
					selectUser = "s";
				}

				break;

			case 2:
				const TXT2 = "Adivina el arma del asesino";
				let instructions2 = "",
					optiWeapons = 0;
				counter2 = 0;

				for (element in weaponsArray) {
					instructions2 =
						instructions2 + `${counter2}.- ${weaponsArray[element]}\n`;
					counter2++;
				}

				instructions2 + TXT2;

				do {
					optiWeapons = parseInt(prompt(`${instructions2}`));
					coins++;
				} while (numWeapon !== optiWeapons && coins < 7);

				if (numWeapon === optiWeapons) {
					alert(`Ganaste el arma usada fue ${weaponsArray[numWeapon]}`);
					selectUser = "s";
					oportunities[1] = true;
				} else if (coins === 7) {
					alert(`Perdiste el arma usada era ${weaponsArray[numWeapon]}`);
					selectUser = "s";
				}

				break;

			case 3:
				const TXT3 = "Adivina donde fue el asesinato";
				let instructions3 = "",
					optiPlace = 0;
				counter3 = 0;

				for (element in roomsArray) {
					instructions3 =
						instructions3 + `${counter3}.- ${roomsArray[element]}\n`;
					counter3++;
				}

				instructions3 + TXT3;

				do {
					optiPlace = parseInt(prompt(`${instructions3}`));

					coins++;
				} while (numRoom !== optiPlace && coins < 7);

				if (numRoom === optiPlace) {
					alert(`Ganaste el lugar es la ${roomsArray[numRoom]}`);
					selectUser = "s";
					oportunities[2] = true;
				} else if (coins === 5) {
					alert(`Perdiste el lugar era ${roomsArray[numRoom]}`);
					selectUser = "s";
				}

				break;

			default:
				alert("Opción inválida");
				break;

			case "s":
				break;
		}

		// alert(`gameWin ${gameWin}`);
		alert(`coins ${coins}`);
	} while (selectUser !== "s" && coins !== 7 && gameWin !== 3);

	if (coins === 7) {
		let text_lose = `Perdiste el juego, fue  \n <b> ${arrWitMurd[numAssesin].nombre} </b> mato a
			<b>  ${asseMurder[1]} </b>  con la <b> ${weaponsArray[numWeapon]} </b>   en <b>   ${roomsArray[numRoom]} </b> `;

		labelModal = document.getElementById("exampleModalLabel");
		labelModal.innerHTML = "GAMEEEEE OVERRRRR";

		getModal = document.getElementById("exampleModal");

		txtModal = document.getElementById("txt-modal");

		getModal.classList.add("show");
		getModal.classList.add("bg-danger");

		getModal.style.display = "block";

		txtModal.innerHTML = text_lose;
	} else if (gameWin == 3) {
		let text_win = `Felicidades ganaste el juego, fue <b>  \n ${arrWitMurd[numAssesin].nombre} </b>   mato a
			<b>  ${asseMurder[1]} </b> con la <b> ${weaponsArray[numWeapon]} </b>  en <b> ${roomsArray[numRoom]} </b> `;

		labelModal = document.getElementById("exampleModalLabel");
		labelModal.innerHTML = "WIIIIIN";

		getModal = document.getElementById("exampleModal");

		txtModal = document.getElementById("txt-modal");

		getModal.classList.add("show");
		getModal.classList.add("bg-success");

		getModal.style.display = "block";

		txtModal.innerHTML = text_win;
	}
};

let main = () => {
	arrToPlay = menu(genereAssesinMurder());
};

main();
