/**
 * @name Uncompressed Images
 * @description Discord's solution to previewing images is awful so by changing 'media' links to 'cdn' links, we will no longer have blurry images (especially with JPEG and WebP).Discord's solution to previewing images is awful so by changing 'media.discordapp.net' links to 'cdn.discordapp.com' links, we will no longer have blurry images (especially with JPEG and WebP).
 * @author Knew
 * @authorId 332116671294734336
 * @authorLink https://github.com/Knewest
 * @version 0.0.1
 * @source 
 * @updateUrl 
 */


   module.exports = class name{
     
       load() { }
       start() {


	function loop(){
		
var images = document.querySelectorAll('img[src^="https://media.discordapp.net/attachments"]');

images.forEach(function(image) {
  image.src = image.src.replace('https://media.discordapp.net/attachments', 'https://cdn.discordapp.com/attachments');
});

    setTimeout(loop, 1000);
}

loop();
}
stop(){
  
}
}