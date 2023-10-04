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
		const days = dayjs(film.premiera).diff(dayjs(), 'days');
		const daysAbs = Math.abs(days);
		let dayWord = 'dní';
		if (daysAbs === 1) {
			dayWord = 'den';
		} else if (daysAbs > 1 && daysAbs < 5) {
			dayWord = 'dny';
		}
		premiera.innerHTML = `
			Premiéra <strong>${dayjs(film.premiera).format('D. M. YYYY')}</strong>, což je ${days < 0 ? ('před ' + daysAbs) : 'za ' + daysAbs} ${dayWord}.
		`;
	}
	const stars = document.querySelectorAll('.fa-star');
	let voteCount = 0;
	const vote = (count) => {
		stars.forEach((star, index) => {
			if (index < count) {
				star.classList.add('fas');
			} else {
				star.classList.remove('fas');
			}
		})
	}
	stars.forEach((star, index) => {
		let count = Number(star.textContent)
		star.addEventListener('click', () => {
			voteCount = count;
			vote(voteCount);
		});
		star.addEventListener('mouseenter', () => vote(count));
		star.addEventListener('mouseleave', () => vote(voteCount));
	})
	const noteForm = filmContainer.querySelector('#note-form');
	if (noteForm) {
		const onSubmit = (e) => {
			e.preventDefault();
			const messageInput = document.querySelector('#message-input');
			const termsCheckbox = document.querySelector('#terms-checkbox');
			messageInput?.classList?.remove('is-invalid');
			termsCheckbox?.classList?.remove('is-invalid');
			const text = messageInput?.value;
			const checked = termsCheckbox?.checked;
			if (text && checked) {
				noteForm.innerHTML = `
					<p class="card-text">${text}</p>
				`
				return;
			}
			if (!checked && termsCheckbox) {
				termsCheckbox.classList.add('is-invalid');
				termsCheckbox.focus();
			}
			if (!text && messageInput) {
				messageInput.classList.add('is-invalid');
				messageInput.focus();
			}

		}
		noteForm.addEventListener('submit', onSubmit);
	}
}