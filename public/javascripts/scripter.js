let logo = document.getElementById('sign');
let back = document.getElementById('back');

setInterval(() => {
	back.style.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
}, 1000);

let quotes = document.getElementsByClassName('aboutText');
for (let i = 0; i < quotes.length; i++) {
	setInterval(() => {
		quotes[i].style.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
		logo.style.transform = 'rotateX(360deg)';
	}, 1000);
}

let quotes1 = document.getElementsByClassName('homeHeader');
for (let i = 0; i < quotes1.length; i++) {
	quotes1[i].onmouseover = () => {
		quotes1[i].style.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
	};
}

let quoter = document.getElementById('motive');
setInterval(() => {
	quoter.style.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
	quoter.style.transform = 'rotateX(360deg)';
}, 1000);

let foods = document.getElementsByClassName('src');

document.getElementById('clickApi').onclick = () => {
	console.log('<><><><><><><><><><><><><><><><><><><');
	axios
		.get(
			'https://api.edamam.com/api/food-database/parser?ingr=%20bread&app_id=9d96839a&app_key=3b781656b4cb29e14fa769d007cc9c93'
		)
		.then((result) => {
			console.log(result.data.hints[0].food);
		});
};
