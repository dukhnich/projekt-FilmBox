import filmy from "./filmData.js";

const id = window.location.hash?.slice(1);

const film = filmy.find(f => f.id === id);

const filmContainer = document.querySelector('#detail-filmu') || document.body;

const player = document.querySelector('#prehravac');

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
				messageInput.focus();
			}
			if (!text && messageInput) {
				messageInput.classList.add('is-invalid');
				messageInput.focus();
			}
		}
		noteForm.addEventListener('submit', onSubmit);
	}
}

if (player) {
	const playBtn = player.querySelector('.play');
	const pauseBtn = player.querySelector('.pause');
	const video = player.querySelector('video');
	const currentTimeEl = player.querySelector('.current-time');
	const controls = player.querySelector('.player-controls');

	playBtn?.addEventListener('click', () => video?.play());
	pauseBtn?.addEventListener('click', () => video?.pause());
	video?.addEventListener('playing', () => player.classList.add('playing'));
	video?.addEventListener('pause', () => player.classList.remove('playing'));
	video?.addEventListener('timeupdate', (e) => {
		const time = Math.round(e?.target.currentTime || 0);
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		if (currentTimeEl) {
			currentTimeEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
		}
	});
	document.addEventListener('keyup', (event) => {
		if (
			video &&
			event.code === 'Space' &&
			event.target.tagName !== 'TEXTAREA' &&
			event.target.tagName !== 'INPUT' &&
			event.target.tagName !== 'BUTTON'
		  ) {
			video.paused ? video.play() : video.pause();
		  }
	});
	if (controls) {
		let timeoutId = null;
		const displayControlsHandler = () => {
			controls.classList.remove('hidden');
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => controls.classList.add('hidden'), 3000);
		}
		document.addEventListener('keyup', displayControlsHandler);
		document.addEventListener('mousemove', displayControlsHandler);
	}
}