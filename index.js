const MovieDisplayArea = document.querySelector('#Movie-Display-Area');



const TitleAreaDisplay = document.querySelector('#title-area');
const movieSearchForm = document.querySelector(`#movieSubmitArea`);

const detailPicArea = document.querySelector(`#detailPicture`);
const plotTextArea = document.querySelector(`#plotTextArea`)








fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${OMDB_KEY}`) //Hard coded populate an Image on start 
.then(resp => resp.json())
.then( movieList => {
    console.log(movieList);
    
    renderMovie(movieList)
})


//The Function that displays a movie 
function renderMovie(movieList){    
    
    
    const newIMG = document.createElement('img'); //make a new image element
    newIMG.src= movieList.Poster; //set the src to the movies new image
    MovieDisplayArea.appendChild(newIMG) //add the area to the DOM

    newIMG.addEventListener('click', (event) => {
        console.log('hey I was clicked');
        detailPicArea.src = movieList.Poster;
        plotTextArea.textContent = movieList.Plot;

    })
}






movieSearchForm.addEventListener('submit', (event) =>{

    event.preventDefault();
    const FormBTN = document.querySelector('#movieSubmitBtn');
    const userSearchQuery = event.target.userMovieText.value;
    
    console.log(userSearchQuery);
    
    fetchMovie(userSearchQuery)
    
})


//Broke out the Fetch to its own function
function fetchMovie(userSearchQuery){
    
    fetch(`http://www.omdbapi.com/?t=${userSearchQuery}&apikey=${OMDB_KEY}`)
    .then(resp => resp.json())
    .then( movieList => {
        // console.log(movieList);
        // console.log(movieList.ok)
        renderMovie(movieList)
  }) 
}







