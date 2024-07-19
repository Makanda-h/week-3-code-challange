document.addEventListener('DOMContentLoaded', () => {
    const filmsList = document.getElementById('films');
    const filmDetails = document.getElementById('film-details');
    const poster = document.getElementById('movie-image');
    const title = document.getElementById('title');
    const runtime = document.getElementById('runtime');
    const showtime = document.getElementById('showtime');
    const availableTickets = document.getElementById('available-tickets');
    const description = document.getElementById('text');
    const buyTicketButton = document.getElementById('buy-ticket');

    function fetchFilms() {
        fetch('http://localhost:3000/films')
            .then(response => response.json())
            .then(data => {
                filmsList.innerHTML = '';
                data.forEach(film => {
                    const li = document.createElement('li');
                    li.textContent = film.title;
                    li.classList.add('film', 'item');
                    li.addEventListener('click', () => showFilmDetails(film));
                    filmsList.appendChild(li);
                });

                if (data.length > 0) {
                    showFilmDetails(data[0]);
                }
            });
    }

    function showFilmDetails(film) {
        filmDetails.style.display = 'block';
        poster.src = film.poster;
        title.textContent = film.title;
        runtime.textContent = `Runtime: ${film.runtime} minutes`;
        showtime.textContent = `Showtime: ${film.showtime}`;
        const available = film.capacity - film.tickets_sold;
        availableTickets.textContent = `Available Tickets: ${available}`;
        description.textContent = film.description;

        buyTicketButton.disabled = available === 0;
        buyTicketButton.onclick = () => buyTicket(film);
    }

    function buyTicket(film) {
        const available = film.capacity - film.tickets_sold;
        if (available > 0) {
            film.tickets_sold++;
            showFilmDetails(film);
        }
    }

    fetchFilms();
});