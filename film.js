import filmy from "./filmData.js";

const id = window.location.hash?.slice(1);

const film = filmy.find(f => f.id === id);

const filmContainer = document.querySelector('#detail-filmu') || document.body;

if (!film) {
	filmContainer.innerHTML = `Stránka nenalezena`;
} else {
	const img = filmContainer.querySelector('img');
	if (img) {
		img.src = film.plakat?.url;
		img.width = film.plakat?.sirka;
		img.height = film.plakat?.vyska;
	}
	const title = filmContainer.querySelector('.card-title');
	if (title) {
		title.textContent = film.nazev;
	}
	const descriprion = filmContainer.querySelector('.card-text:first-of-type');
	if (descriprion) {
		descriprion.textContent = film.popis;
	}
	const premiera = filmContainer.querySelector('#premiera');
	if (premiera) {
		const days = dayjs(film.premiera).diff(dayjs(), 'days')
		premiera.innerHTML = `Premiéra <strong>${dayjs(film.premiera).format('D. M. YYYY')}</strong>, což je ${days < 0 ? ('před ' + days * -1) : 'za ' + days} dní.`;
	}
}