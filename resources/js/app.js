// Grabbing data from giphyAPI
let getData = () => {
  let APIkey = 'DZHQPTzFavUsqcCzDeyPGT3PSC2fUNUv';
  let searchTerm = $('.search-text').val().trim();
  let queryURL = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${APIkey}&limit=30`;

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(cbGifs);

  addButton(searchTerm);
  $('.search-text').val('');
};

// Generating images
let imageGenerator = (i, giphy) => {
    let image = $('<img>');

    image.attr({ src: giphy[i].images.fixed_height_still.url });
    image.attr({ class: 'gif' });
    image.attr({ 'data-state': 'still' });
    image.attr({ 'data-still': giphy[i].images.fixed_height_still.url });
    image.attr({ 'data-animate': giphy[i].images.original.url });
    $('.main-content').append(giphy[i].rating);
    $('.main-content').append(image);
}

// Callback function pasted into ajax
let cbGifs = response => {
  let giphy = response.data;
  $('.main-content').empty();
  // Looping through object images
  for (i in giphy) {
    imageGenerator(i, giphy);
  }// On click function to animate gifs
  $('.gif').on('click', function() {
    let state = $(this).attr('data-state');
    // Ternary condition
    state === 'still' ? 
    $(this).attr('src', $(this).attr('data-animate')) &&
    $(this).attr('data-state', 'animate') : 
    $(this).attr('src', $(this).attr('data-still')) && 
    $(this).attr('data-state', 'still');
  });
};

// Creating button being displayed 
let addButton = value => {
  $('.newButton').append(
    `<button onclick=buttonData('${encodeURIComponent(value.trim())}')>${value}</button>`
  );
};

// Storing data inside button generated after user searchTerm
let buttonData = buttonData => {
  let APIkey = 'DZHQPTzFavUsqcCzDeyPGT3PSC2fUNUv';
  let searchTerm = buttonData;
  let queryURL = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${APIkey}&limit=30&rating`;

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(cbGifs);
};

// Fetching data when 'enter' is hit
$('.search-text').on('keypress', function(event) {
  if (event.which === 13) {
    getData();
    $('.search-text').val('');
  }
});
