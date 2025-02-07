let searchBox = document.getElementById('searchBox');
let lowerDiv = document.getElementById("lowerDiv");
let loadingSpinner=document.getElementById('loadingSpinner');




function movieCard(jsonData) {
    lowerDiv.innerHTML = "";



    if (jsonData.Response === "False") {
        lowerDiv.innerHTML = `<p>Movie not found. Please try again.</p>`;
        return;
    }

    let movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');

    let moviePoster = document.createElement('img');
    moviePoster.src = jsonData.Poster;
    moviePoster.classList.add('movie-poster');

    let movieDetailsDiv = document.createElement('div');
    movieDetailsDiv.classList.add('movie-details');


    function createDetail(label, value) {
        let detailRow = document.createElement('p');
        detailRow.innerHTML = `<strong>${label}:</strong> ${value}`;
        return detailRow;
    }


    movieDetailsDiv.appendChild(createDetail("Title", jsonData.Title));
    movieDetailsDiv.appendChild(createDetail("Year", jsonData.Year));
    movieDetailsDiv.appendChild(createDetail("Rated", jsonData.Rated));
    movieDetailsDiv.appendChild(createDetail("Released", jsonData.Released));
    movieDetailsDiv.appendChild(createDetail("Runtime", jsonData.Runtime));
    movieDetailsDiv.appendChild(createDetail("Genre", jsonData.Genre));
    movieDetailsDiv.appendChild(createDetail("Director", jsonData.Director));
    movieDetailsDiv.appendChild(createDetail("Writer", jsonData.Writer));
    movieDetailsDiv.appendChild(createDetail("Actors", jsonData.Actors));
    movieDetailsDiv.appendChild(createDetail("Plot", jsonData.Plot));
    movieDetailsDiv.appendChild(createDetail("Language", jsonData.Language));
    movieDetailsDiv.appendChild(createDetail("Country", jsonData.Country));
    movieDetailsDiv.appendChild(createDetail("Awards", jsonData.Awards));

    // Append elements to main container
    movieContainer.appendChild(moviePoster);
    movieContainer.appendChild(movieDetailsDiv);
    lowerDiv.appendChild(movieContainer);

}



searchBox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        lowerDiv.textContent = "";
        
        loadingSpinner.style.display='block';

        let searchQuery = event.target.value.trim();
        



        let url = `http://www.omdbapi.com/?apikey=3495dc3d&t=${searchQuery}&type=movie`;


        fetch(url)
            .then((response) => response.json())
            .then((jsonData) => {
                loadingSpinner.style.display='none';
                movieCard(jsonData);

            })
            .catch((error) => {
                loadingSpinner.style.display='none';
                console.error('Error fetching data:', error);
                lowerDiv.innerHTML = `<p>Error fetching movie details. Try again later.</p>`;
            });
    }
});
