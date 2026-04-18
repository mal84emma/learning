export function initPopups(containerSel: string, cardSel: string) {
	document.querySelectorAll<HTMLElement>(containerSel).forEach(container => {
		const card = container.querySelector<HTMLElement>(cardSel);
		if (!card) return;

		function show() {
			card.style.left = '0';
			card.style.right = 'auto';
			card.style.bottom = 'calc(100% + 0.5rem)';
			card.style.top = 'auto';
			card.style.display = 'block';

			const rect = card.getBoundingClientRect();
			if (rect.right > window.innerWidth - 8) {
				card.style.left = 'auto';
				card.style.right = '0';
			}
			if (rect.top < 8) {
				card.style.bottom = 'auto';
				card.style.top = 'calc(100% + 0.5rem)';
			}
		}

		function hide() {
			card.style.display = '';
		}

		container.addEventListener('mouseenter', show);
		container.addEventListener('focusin', show);
		container.addEventListener('mouseleave', hide);
		container.addEventListener('focusout', hide);
	});
}
