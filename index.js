const MovieDisplayArea = document.querySelector('#Movie-Display-Area');
const TitleAreaDisplay = document.querySelector('#title-area');
const movieSearchForm = document.querySelector(`#movieSubmit`);
//const userSearchQuery = document.querySelector()



fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${OMDB_KEY}`)
.then(resp => resp.json())
.then( movieList => {
    console.log(movieList);
    
    renderMovie(movieList)
})



function renderMovie(movieList){
    
    
    const newIMG = document.createElement('img');
    newIMG.src= movieList.Poster;
    MovieDisplayArea.appendChild(newIMG);
    TitleAreaDisplay.textContent = movieList.Title;
    


}

movieSearchForm.addEventListener('submit', (event) =>{

    event.preventDefault();
    const FormBTN = document.querySelector('#submitBtn');
    const userSearchQuery = event.target.userMovieText.value;
    
    console.log(userSearchQuery);
    
    fetchMovie(userSearchQuery)
    
})


function fetchMovie(userSearchQuery){
    
    fetch(`http://www.omdbapi.com/?t=${userSearchQuery}&apikey=${OMDB_KEY}`)
    .then(resp => resp.json())
    .then( movieList => {
        console.log(movieList);
        
        renderMovie(movieList)
    }) 
}