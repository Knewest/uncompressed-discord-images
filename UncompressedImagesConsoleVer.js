function loop(){
		
var images = document.querySelectorAll('img[src^="https://media.discordapp.net/attachments"]');

images.forEach(function(image) {
  image.src = image.src.replace('https://media.discordapp.net/attachments', 'https://cdn.discordapp.com/attachments');
});

    setTimeout(loop, 1000);
}
