const MovieDisplayArea = document.querySelector('#Movie-Display-Area');     //area which new movies will display





const TitleAreaDisplay = document.querySelector('#title-area');  
const movieSearchForm = document.querySelector(`#movieSubmitArea`);
const movieSearchTextArea = document.querySelector('#userMovieText');



const detailPicArea = document.querySelector(`#detailPicture`);
const titleHolderHeader = document.querySelector('#titleHolder');
const plotTextArea = document.querySelector(`#plotTextArea`);
const boxOfficeDetailDisplay = document.querySelector('#boxOfficeHolder');


const movieArray =[];
let sortedMovies =[];



fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${OMDB_KEY}`) //Hard coded populate an Image on start 
.then(resp => resp.json())
.then( movieList => {
    console.log(movieList);
    movieArray.push(movieList)
    
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
        boxOfficeDetailDisplay.textContent = `Total Box Office ${movieList.BoxOffice}`;
        
    })
}






movieSearchForm.addEventListener('submit', (event) =>{
    
    event.preventDefault();
    const FormBTN = document.querySelector('#movieSubmitBtn');
    const userSearchQuery = event.target.userMovieText.value;
    
    console.log(userSearchQuery);
    
    fetchMovie(userSearchQuery)
   // movieSearchTextArea.textcontent = ' ' //reset();
   
})


//Broke out the Fetch to its own function
function fetchMovie(userSearchQuery){
    
    fetch(`http://www.omdbapi.com/?t=${userSearchQuery}&apikey=${OMDB_KEY}`)
    .then(resp => resp.json())
    .then( movieList => {
        console.log(movieList);
        // console.log(movieList.ok)
        movieArray.push(movieList)
        console.log(`This is the movieArray ${movieArray}`)
        renderMovie(movieList)
    }) 
}





const boxOfficeOption = document.querySelector('#sortMenu')
boxOfficeOption.addEventListener("change", (event) =>{
    
     removeAllChildNodes(MovieDisplayArea);
     
     if (event.target.value == 'sortBoxOffice' ){
        console.log("whoooooo");
        movieArray.forEach(movie =>{ movie.BoxOffice = movie.BoxOffice.replaceAll(/[$,]/g,"")
    
                                    })

        sortedMovies = movieArray.sort((a, b) => Number(b.BoxOffice) - Number(a.BoxOffice));
        console.log(sortedMovies);
        renderSortedMovies(sortedMovies)
    
    }

    if (event.target.value == 'sortYear' ){
        sortedMovies = movieArray.sort((a, b) => Number(b.Year) - Number(a.Year));
        console.log(sortedMovies);
        renderSortedMovies(sortedMovies)
        
        
    }
    
    if (event.target.value == 'sortByIMDBRating' ){
        
        sortedMovies = movieArray.sort((a, b) => Number(b.imdbRating) - Number(a.imdbRating));
        console.log(sortedMovies);
        renderSortedMovies(sortedMovies)
        
        
    }
    if (event.target.value == 'sortByMetaScore' ){
        
        sortedMovies = movieArray.sort((a, b) => Number(b.Metascore) - Number(a.Metascore));
        console.log(sortedMovies)
        renderSortedMovies(sortedMovies)
        
    }
    
    
});


//sorts the movies we've already red in:
// known issue: if a feild is NA it's pulled to the top
//known issue: if a movie is not found the empty object returned is still inserted
function renderSortedMovies(sortedMovieArray){    
    
    
    sortedMovieArray.forEach( movie =>{
        
        
        
        let newReIMG = document.createElement('img'); //make a new image element
        
        newReIMG.src= movie.Poster; //set the src to the movies new image
        MovieDisplayArea.appendChild(newReIMG) //add the area to the DOM
     
        newReIMG.addEventListener('click', (event) => {
            console.log('hey I was clicked');
            titleHolderHeader.textContent = movie.Title;
            detailPicArea.src = movie.Poster;
            plotTextArea.textContent = movie.Plot;
            boxOfficeDetailDisplay.textContent = `Total Box Office $${movie.BoxOffice}`;
            
        })
        
    })
}







function removeAllChildNodes(MovieDisplayArea) {
    while (MovieDisplayArea.firstChild) {
        MovieDisplayArea.removeChild(MovieDisplayArea.firstChild);
    }
}
