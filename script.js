const input = document.getElementById("inputfiled");
const search = document.getElementById("search");
const imagesContainer = document.getElementById("images");

search.addEventListener("click", () => {
  const newtext = input.value.trim();
  if (!newtext) return;

  const API_Key = "d9a3ebe4bbe7c744260a3bee793f89ff";
  const Base_url = "https://api.themoviedb.org/3";
  const url = `${Base_url}/search/movie?api_key=${API_Key}&query=${encodeURIComponent(newtext)}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      imagesContainer.innerHTML = "";

      if (data.results.length === 0) {
        imagesContainer.innerHTML = "<p>No results found</p>";
        return;
      }

      data.results.forEach(movie => {
        if (movie.poster_path) {
          imagesContainer.innerHTML += `
            <div class="gallery">
              <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="${movie.title}">
              <h3>${movie.title}</h3>
              <p>${movie.release_date ? movie.release_date.split("-")[0] : "N/A"}</p>
            </div>
          `;
        }
      });
    })
    .catch(err => console.error("Error fetching images:", err));


});
