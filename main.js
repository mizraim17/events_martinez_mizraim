///Game of clue version The office

//Variables of games

let containerCharacters;

let selectUser = 0;

const suspectsArray = [
	{ id: 0, nombre: "Michael Scott", name_image: "michael" },
	{ id: 1, nombre: "Jim Halpert", name_image: "jim" },
	{ id: 2, nombre: "Dwight Schrute", name_image: "dwight" },
	{ id: 3, nombre: "Pam Beesly", name_image: "pam" },
	{ id: 4, nombre: "Ryan Howard", name_image: "ryan" },
	{ id: 5, nombre: "Oscar Martinez", name_image: "oscar" },
	{ id: 6, nombre: "Angela Martin", name_image: "angela" },
	{ id: 7, nombre: "Andy Bernard", name_image: "andy" },
	{ id: 8, nombre: "Kevin Malone", name_image: "kevin" },
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
	// alert(`nameDiedPerson ${nameDiedPerson}`);

	newList = suspectsArray.filter((item) => item.nombre !== nameDiedPerson);
	return newList;
};

//Generate array only with assasin and person died

let genereAssesinMurder = () => {
	let arrayAssesinDied = [],
		numDiedPerson = parseInt(doRandom(suspectsArray)),
		listNew = listWithoutMurder(suspectsArray[numDiedPerson].nombre);

	console.log(`listNew ${listNew.length}`);

	arrayAssesinDied[1] = suspectsArray[numDiedPerson].id;
	arrayAssesinDied[0] = listNew;

	return arrayAssesinDied;
};

let oportunities = [false, false, false];

let generateInstru = (arrWitMurd) => {
	const TXT_1 = "Adivina el asesino seleciona su número";

	for (element in arrWitMurd) {
		console.log(
			`para instru "${arrWitMurd[element].id} ${arrWitMurd[element].nombre}`
		);
	}

	instructions = "";

	for (element in arrWitMurd) {
		instructions =
			instructions +
			`${arrWitMurd[element].id}.- ${arrWitMurd[element].nombre}\n`;
		counter++;
	}

	return TXT_1 + instructions;
};

//Generate prompr for inputs values and validate if the user win or lose

let menu = (asseMurder) => {
	let coins = 0;

	let arrWitMurd = asseMurder[0];
	let copyArrWitMurd = asseMurder[0];

	for (element in arrWitMurd) {
		console.log(
			`original "${arrWitMurd[element].id}  ${arrWitMurd[element].nombre}`
		);
	}
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
				let instructions = "",
					optiAssesin = 0;
				counter = 0;

				console.log("numero asesino", asseMurder[0]);

				do {
					instructions = generateInstru(arrWitMurd);

					optiAssesin = parseInt(prompt(`${instructions}`));
					coins++;

					console.log("numAssesin", numAssesin);
					console.log("optiAssesin", optiAssesin);

					if (copyArrWitMurd[numAssesin].id !== optiAssesin) {
						for (element in arrWitMurd) {
							console.log(
								`antes cut "${arrWitMurd[element].id}  ${arrWitMurd[element].nombre}`
							);
						}

						matchSuspects([arrWitMurd[element].id]);

						arrWitMurd = arrWitMurd.filter((item) => item.id !== optiAssesin);

						for (element in arrWitMurd) {
							console.log(
								`despues cut "${arrWitMurd[element].id}  ${arrWitMurd[element].nombre}`
							);
						}

						paintingCharacters(arrWitMurd);
						console.log("entro a borrar arrWitMurd", arrWitMurd);
					}

					// alert(`coins=${coins}`);
				} while (numAssesin !== optiAssesin && coins < 7);

				if (optiAssesin === numAssesin) {
					alert(`Correcto fue ${copyArrWitMurd[optiAssesin].nombre}`);

					// matchSuspects([numAssesin]);
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
		let text_lose = `Perdiste el juego, fue  \n <b> ${copyArrWitMurd[numAssesin].nombre} </b> mato a
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

//init

let initElements = () => {
	containerCharacters = document.getElementById("containerCharacters");
	containerListSuspects = document.getElementById("containerListSuspects");

	console.log("ini", containerCharacters);
};

let generateListSuspects = (arrSuspects) => {
	containerListSuspects.innerHTML = "";
	arrSuspects.forEach((character) => {
		let list = document.createElement("li");

		list.innerHTML = `<p> ${character.id}.-${character.nombre} \n </p> `;

		containerListSuspects.appendChild(list);
	});
};

let checkAssasin = (asseMurder, idSuspect) => {
	let arrWitMurd = asseMurder;
	const copyArrWitMurd = asseMurder;

	for (element in copyArrWitMurd) {
		console.log(
			`despues cut "${copyArrWitMurd[element].id}  ${copyArrWitMurd[element].nombre}`
		);
	}

	id_assasin = localStorage.getItem("id_assasin");

	console.log("id_assasin", id_assasin);

	let gameWin = 0;

	console.log(
		"---asesino rela",
		suspectsArray[id_assasin].id,
		"--- sospechosos",
		idSuspect
	);

	if (suspectsArray[id_assasin].id !== idSuspect) {
		arrWitMurd = arrWitMurd.filter((item) => item.id !== idSuspect);

		console.log(arrWitMurd);

		paintingCharacters(arrWitMurd);
		generateListSuspects(arrWitMurd);

		alert(`no es el asesino ${suspectsArray[idSuspect].nombre}`);
	} else if (suspectsArray[id_assasin].id == idSuspect) {
		console.log("-------------------------- entro");
		alert(`si  el asesino ${suspectsArray[idSuspect].nombre}`);

		showAssasin();
	}
};

let showAssasin = () => {
	let column = document.createElement("div");

	id_assasin = localStorage.getItem("id_assasin");

	containerCharacters.innerHTML = "";

	column.className = "col-md-4 mt-3";
	column.id = `character-${suspectsArray[id_assasin].id}`;
	column.innerHTML = `<div class="card" style="width: 18rem;">
  <img src="./characters/${suspectsArray[id_assasin].name_image}.png" id="imgId-${suspectsArray[id_assasin].id}" class="card-img-top " alt="...">
  <div class="card-body">
    <h5 class="card-title">${suspectsArray[id_assasin].nombre}</h5>
    <a href="#" id="btn-possAssesin-${suspectsArray[id_assasin].id}" class="btn btn-primary">tú fuiste</a>
  </div>
</div>`;

	containerCharacters.append(column);
};

let paintingCharacters = (arrSuspects) => {
	// console.log("entro a paintingCharacters", arrSuspects);

	containerCharacters.innerHTML = "";

	console.log("containerCharacters", containerCharacters);

	arrSuspects.forEach((character) => {
		let column = document.createElement("div");

		column.className = "col-md-4 mt-3";
		column.id = `character-${character.id}`;
		column.innerHTML = `<div class="card" style="width: 18rem;">
  <img src="./characters/${character.name_image}.png" id="imgId-${character.id}" class="card-img-top " alt="...">
  <div class="card-body">
    <h5 class="card-title">${character.nombre}</h5>
    <a href="#" id="btn-possAssesin-${character.id}" class="btn btn-primary">tú fuiste</a>
  </div>
</div>`;

		containerCharacters.append(column);

		let btnAccuse = document.getElementById(`btn-possAssesin-${character.id}`);

		// console.log("btnAccuse", btnAccuse);

		btnAccuse.onclick = () => checkAssasin(arrSuspects, character.id);
	});
};

let matchSuspects = (idCharacter) => {
	let num = String(idCharacter);

	let idLlega = `imgId-${num}`;

	console.log("dide", idLlega);

	let blurCharacter = "";

	blurCharacter = document.getElementById(idLlega);

	console.log("elemento sostenido", blurCharacter);
	blurCharacter.classList = "blur-image";
};

let play = (arrToPlay) => {
	let btn = document.getElementById("btnStarPlay");
	btn.onclick = () => menu(arrToPlay);
};

let blur = () => {
	let btn_2 = document.getElementById("btnBlur");
	btn_2.onclick = () => matchSuspects();
};

let genereMistery = (arrCompleteDied) => {
	let numAssesin = parseInt(doRandom(arrCompleteDied[0]));

	let numWeapon = parseInt(doRandom(weaponsArray));
	let numRoom = parseInt(doRandom(roomsArray));

	localStorage.setItem("id_assasin", numAssesin);
	localStorage.setItem("id_died", arrCompleteDied[1]);
	localStorage.setItem("id_weapon", numWeapon);
	localStorage.setItem("id_room", numRoom);
};

let main = () => {
	arrToPlay = genereAssesinMurder();
	console.log("arrToPlay", arrToPlay[0], "arrToPlay-1", arrToPlay[1]);

	genereMistery(arrToPlay);

	// menu(arrToPlay);

	initElements();

	generateListSuspects(arrToPlay[0]);

	paintingCharacters(arrToPlay[0]);

	// play(arrToPlay);

	// blur();
};

main();
