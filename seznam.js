import filmy from "./filmData.js";

const filmList = document.querySelector('#seznam-filmu');

const renderFilm = (film, el) => {
	if (!(film && typeof film === 'object' && el)) {
		return;
	}
	el.innerHTML += `
		<div class="col">
			<div class="card">
				<img
					src="${film.plakat?.url}"
					width="${film.plakat?.sirka}"
					height="${film.plakat?.vyska}"
					class="card-img-top"
					alt="plakát '${film.nazev}'"
				/>
				<div class="card-body">
					<h5 class="card-title">${film.nazev}</h5>
					<p class="card-text">${film.ochutnavka}</p>
					<a href="film.html" class="btn btn-primary">Přehrát</a>
				</div>
			</div>
		</div>
	`
}

filmy.push({
	id: 'lichozrouti',
	nazev: 'Lichožrouti',
	plakat: {
		url: 'https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/161/570/161570190_af0cee.jpg',
		sirka: 420,
		vyska: 592,
	},
	ochutnavka: 'Česká animovaná pohádka.',
	popis:
		`Lichožrouti jsou malí tvorové, kteří žijí s námi lidmi a mohou za to, že lidstvu z každého páru ponožek vždy zůstane jen jedna – lichá. Ponožkami se totiž živí! Osudy hlavních protagonistů LICHOŽROUTŮ a jejich největšího protihráče, podivínského a opuštěného PROFESORA, spojuje příběh hlavního hrdiny, malého LICHOŽROUTA HIHLÍKA, na kterého čekají ve filmu velká dobrodružství. Dny jeho dědy LAMORA, který ho vychoval, jsou u konce a HIHLÍK musí překonat strach, vylézt z okna a vydat se hledat strejdu PADREHO, o kterém neměl doteď ani tušení. Svou odvahu čerpá z toho, co mu vštípil dědeček – lásky k rodině, dobré výchovy a lichožroutího „desatera". Ani v novém lupičském domově u mafiánského strýce a dvou poťouchlých bratranců své ideály a zásady neopouští. A to i přesto, že ho zavedou do nebezpečných situací. Když nakonec s těžkým srdcem přeci jen poruší dvě základní lichožroutí pravidla „ Nikdy nevezmeš celý pár" a „Drž se lidí, ale drž se od nich dál", pak jenom proto, že věří, že vyčerpal všechny možnosti, aby došel ke svému vytouženému cíli – rodině.
		S trochou nadsázky se dá říct, že poselství filmu zní: Rodina je nade vše! Drž se té, kterou máš, měj ji rád a dělej vše pro to, aby byla dobrá, protože jinou na tomhle světě mít nebudeš. A je jedno, jestli jsi člověk, nebo LICHOŽROUT!`,
	premiera: '2016-10-20',
})

if (filmList) {
	filmList.innerHTML = '';
	if (Array.isArray(filmy)) {
		filmy.forEach(film => renderFilm(film, filmList));
	}
}