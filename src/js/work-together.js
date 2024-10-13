const form = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');
const closeModalButton = document.getElementById('closeModal');
const errorNotification = document.getElementById('errorNotification');
const backdrop = document.getElementById('backdrop'); // Додаємо backdrop

form.addEventListener('submit', function (event) {
  event.preventDefault(); // Відміняємо стандартну поведінку форми

  const formData = new FormData(form);

  // Логування даних, що відправляються
  console.log('Sending data:', {
    email: formData.get('email'),
    comment: formData.get('comment'),
  });

  const data = {
    email: formData.get('email'),
    comment: String(formData.get('comment')),
  };

  console.log(data); // Перевірте, чи виводяться значення

  // Відправляємо POST запит
  fetch('https://portfolio-js.b.goit.study/api/requests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .then(data => {
      // Успішний запит
      console.log('Success:', data);
      backdrop.classList.add('is-open'); // Показуємо фон
      form.reset(); // Очищуємо форму
    })
    .catch(error => {
      // Помилка при відправці запиту
      errorNotification.style.display = 'block'; // Показуємо вспливаюче повідомлення про помилку
      setTimeout(() => {
        errorNotification.style.display = 'none'; // Ховаємо повідомлення через 3 секунди
      }, 3000);
    });
});

// Функція для закриття модального вікна
function closeModal() {
  backdrop.classList.remove('is-open');
}

// Закриття по кліку на кнопку закриття (іконку)
closeModalButton.addEventListener('click', closeModal);

// Закриття по кліку на backdrop
backdrop.addEventListener('click', function (event) {
  if (event.target === backdrop) {
    // Перевіряємо, що клік був по backdrop, а не по модальному вікну
    closeModal();
  }
});

// Закриття по натисканню клавіші Escape
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});
