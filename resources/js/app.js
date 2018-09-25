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

let cbGifs = response => {
  let giphy = response.data;
  $('.main-content').empty();

  for (i in giphy) {
    imageGenerator(i, giphy);
  }
  $('.gif').on('click', function() {
    let state = $(this).attr('data-state');

    if (state === 'still') {
      $(this).attr('src', $(this).attr('data-animate'));
      $(this).attr('data-state', 'animate');
    } else {
      $(this).attr('src', $(this).attr('data-still'));
      $(this).attr('data-state', 'still');
    }
  });
};

let addButton = value => {
  $('.newButton').append(
    `<button onclick=buttonData('${encodeURIComponent(value.trim())}')>${value}</button>`
  );
};

let buttonData = buttonData => {
  let APIkey = 'DZHQPTzFavUsqcCzDeyPGT3PSC2fUNUv';
  let searchTerm = buttonData;
  let queryURL = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${APIkey}&limit=30&rating`;

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(cbGifs);
};

$('.search-text').on('keypress', function(event) {
  if (event.which === 13) {
    getData();
    $('.search-text').val('');
  }
});
