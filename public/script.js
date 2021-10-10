const $ = (el) => document.querySelector(el);

const project = {
  id: 'which-city',
  sortOrder: 33,
  active: 1,
  image: 'louvre.jpg',
  heading: 'Quiz game',
  details: 'Which City? involves browsing photos and trying to guess the city.',
  category: 'Game',
  languages: ['react','sass'],
  infoButtons: {
    play: 'https://which-city.herokuapp.com/',
    github: 'https://github.com/rolandjlevy/which-city'
  }
}

const secret = '';
$('#secret').value = secret;

if (secret.length) {
  $('#secret').focus();
  Object.entries(project).forEach(([key, value]) => {
    if (key === 'languages') {
      $(`#${key}`).value = value.join()
    } else if (key === 'infoButtons') {
      Object.entries(value).forEach(([name, url]) => {
        $(`#${name}`).value = url;
      });
    } else {
      console.log({key, value})
      $(`#${key}`).value = value;
    }
  });
}