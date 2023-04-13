/**
 * @name Uncompressed Images
 * @author Knew
 * @description Discord's solution to previewing images is awful so by changing 'media.discordapp.net' links to 'cdn.discordapp.com' links, we will no longer have blurry images (especially with JPEG and WebP).
 * @version 2.4
 * @authorId 332116671294734336
 * @authorLink https://github.com/Knewest
 * @website https://twitter.com/KnewestLSEP
 * @source https://github.com/Knewest/uncompressed-discord-images
 * @updateUrl https://raw.githubusercontent.com/Knewest/uncompressed-discord-images/main/UncompressedImages.plugin.js
 */

   module.exports = class name{
     
       load() { }
       start() {

const config = {
  attributes: true,
  childList: true,
  subtree: true,
  attributeFilter: ['src'],
};

const observer = new MutationObserver(callback);
function replaceURLs() {
  const images = document.querySelectorAll('img[src^="https://media.discordapp.net/attachments"]');
  let index = 0;
  function processImage() {
    const image = images[index];
    if (image && !image.src.includes('.gif')) {
      image.src = image.src.replace('https://media.discordapp.net/attachments', 'https://cdn.discordapp.com/attachments');
      index++;
      setImmediate(processImage);
    }
  }

  processImage();
}

function callback(mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      const addedImages = mutation.target.querySelectorAll('img[src^="https://media.discordapp.net/attachments"]');
      addedImages.forEach(function(image) {
        if (!image.src.includes('.gif')) {
          setImmediate(function() {
            image.src = image.src.replace('https://media.discordapp.net/attachments', 'https://cdn.discordapp.com/attachments');
          });
        }
      });
    } 
    
    else if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
      if (!mutation.target.src.includes('.gif')) {
        replaceURLs();
      }
    }
  }
}

function runMutation() {
  replaceURLs();
  observer.observe(document, config);
}

runMutation();

}
stop(){
  
}
}

/**
* Version 2.4 of Uncompressed Images
* Copyright (Boost Software License 1.0) 2023-2023 Knew
*/
