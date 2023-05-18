const MovieDisplayArea = document.querySelector('#Movie-Display-Area');     //area which new movies will display





const TitleAreaDisplay = document.querySelector('#title-area');  
const movieSearchForm = document.querySelector(`#movieSubmitArea`);
const movieSearchTextArea = document.querySelector('#userMovieText');



const detailPicArea = document.querySelector(`#detailPicture`);
const titleHolderHeader = document.querySelector('#titleHolder');
const plotTextArea = document.querySelector(`#plotTextArea`);
const boxOfficeDetailDisplay = document.querySelector('#boxOfficeHolder');
const gptTextArea = document.querySelector('#gptTextArea')


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
        plotTextArea.textContent = `Movie Plot: ${movieList.Plot}`;
        boxOfficeDetailDisplay.textContent = `Total Box Office: ${movieList.BoxOffice}`;
        rewriteText(movieList);
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
            boxOfficeDetailDisplay.textContent = `Total Box Office ${movie.BoxOffice}`;
            
        })
        
    })
}







function removeAllChildNodes(MovieDisplayArea) {
    while (MovieDisplayArea.firstChild) {
        MovieDisplayArea.removeChild(MovieDisplayArea.firstChild);
    }
}




// Generate rewritten movie description using openai API (GPT 3.5 model)
async function rewriteText(movieList) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{role: "user", content: `Rewrite the following as Shakespeare: ${movieList.Plot} Be concise.`}],
        max_tokens: 60
      })
    })
  
    // Throw error message if POST request fails
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
  
    // Display rewritten movie description on page
    const data = await response.json();
    gptTextArea.textContent = `Shakespearean Movie Plot: ${data.choices[0].message.content}`;
    console.log(data.choices[0].message.content);
  }