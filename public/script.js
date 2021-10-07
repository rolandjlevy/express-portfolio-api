const $ = (el) => document.querySelector(el);

const project = {
  id: 'wave-pool-simulator', 
    image: './images/projects/wave-pool-simulator.jpg',
    heading: 'Wave-pool Simulator',
    details: 'A fun CSS animation experiment using spinning conic gradient circles with sliders to control speed, colour, corners and shape',
    category: 'Widget',
    languages: ['css', 'javascript'],
    infoButtons: {
      play: 'https://css-conic-gradient-wave-pattern.rolandjlevy.repl.co/',
      github: 'https://github.com/rolandjlevy/css-conic-gradient-wave-pattern',
      code: 'https://github.com/rolandjlevy/css-conic-gradient-wave-pattern'
    }
};

const secret = '';
$('#secret').value = secret;

if (secret.length) {
  Object.entries(project).forEach(([key, value]) => {
    console.log({[key]: value});
    if (key === 'languages') {
      $(`#${key}`).value = value.join()
    } else if (key === 'infoButtons') {
      Object.entries(value).forEach(([name, url]) => {
        $(`#${name}`).value = url;
      });
    } else {
      $(`#${key}`).value = value
    }
  });
}

