document.addEventListener("DOMContentLoaded", () => {
	function postForm() {
		const ajaxSend = async (formData) => {
			const response = await fetch("mail.php", {
				method: "POST",
				body: formData,
			});
			if (!response.ok) {
				throw new Error(
					`Ошибка по адресу ${url}, статус ошибки ${response.status}`
				);
			}
			return await response.text();
		};

		if (document.querySelector("form")) {
			const forms = document.querySelectorAll("form");

			forms.forEach((form) => {
				form.addEventListener("submit", function (e) {
					e.preventDefault();
					const formData = new FormData(this);

					ajaxSend(formData)
						.then((response) => {
							console.log(response);
							let body = document.body;
							let modal = document.querySelector(".success");
							let close = modal.querySelector(".modal__close");
							success(body, modal, close);
							form.reset(); // очищаем поля формы
						})
						.catch((err) => {
							console.error(err);
							alert(
								"Что-то пошло не так, свяжитесь с администратором сайта по телефону - 89154355322"
							);
						});
				});
			});
		}
	}

	// Успешная отправка
	function success(body, modal, close) {
		modal.style.display = "flex";
		close.addEventListener("click", () => {
			closeModals();
			modal.style.display = "none";
			body.classList.remove("locked");
		});
		modal.addEventListener("click", (e) => {
			if (e.target === modal) {
				closeModals();
				modal.style.display = "none";
				body.classList.remove("locked");
			}
		});
		setTimeout(() => {
			closeModals();
			modal.style.display = "none";
			body.classList.remove("locked");
		}, 3000);
	}

	postForm();
});
