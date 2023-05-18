const MovieDisplayArea = document.querySelector('#Movie-Display-Area');     //area which new movies will display





const TitleAreaDisplay = document.querySelector('#title-area');  
const movieSearchForm = document.querySelector(`#movieSubmitArea`);




const detailPicArea = document.querySelector(`#detailPicture`);
const titleHolderHeader = document.querySelector('#titleHolder');
const plotTextArea = document.querySelector(`#plotTextArea`)


//Work on a poll and make sure that data gets saved to a file using POST method.
// work on mouse over or hover. when your mouse hovers over the image of a movie, display name and plot.
const poll = {
    question: 'How did you hear about us?'
    answers: [ 
        "Family", "Friends", "Email", "Other", 
    ]
}





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
        titleHolderHeader.textContent = movieList.Title;
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
        console.log(movieList);
        // console.log(movieList.ok)
        renderMovie(movieList)
  }) 
}







