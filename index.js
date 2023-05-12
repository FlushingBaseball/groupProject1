const MovieDisplayArea = document.querySelector('#Movie-Display-Area')




fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${OMDB_KEY}`)
.then(resp => resp.json())
.then( movieList => {
    //console.log(movieList);
    const newIMG = document.createElement('img');
    newIMG.src= movieList.Poster;
    MovieDisplayArea.appendChild(newIMG);
 
})