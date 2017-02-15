
var makeRequest = function(url, callback) {
  var request = new XMLHttpRequest(); // create request
  request.open("GET", url); // once it opens want to get
  request.onload = callback; // when it loads we want to requestComplete
  request.send(); // send the request
}

var requestComplete = function(){
  if (this.status !== 200) return; 
  var jsonString = this.responseText; 
  var musicResults = JSON.parse(jsonString);
  
  var results = musicResults.albums.items
  displayAlbums(results);
}

var displayAlbums = function(results){
  var div = document.getElementById('albums');
  document.getElementById('albums').innerHTML = "";
  for (entry of results){
    var p = document.createElement('p'); 
    p.innerHTML = '<a href=' + entry.external_urls.spotify + '>' + entry.name + '</a>'
    console.log(entry.href)
    div.append(p)
  }
}

var onButtonClick = function(){
  var input = document.getElementById('search-query')
  var url = "https://api.spotify.com/v1/search?q="+ input.value +"&type=album";
  makeRequest(url, requestComplete);
};

var app = function(){
  var button = document.getElementById('button')
  button.onclick = onButtonClick;
  
}

window.onload = app;