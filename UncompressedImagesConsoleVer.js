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

function replaceURLs(image, callback) {
  if (!image.src.includes('.gif')) {
    setTimeout(function() {
      image.src = image.src.replace('https://media.discordapp.net/attachments', 'https://cdn.discordapp.com/attachments');
      setImmediate(callback);
    });
  } else {
    setImmediate(callback);
  }
}



function callback(mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      const addedImages = mutation.target.querySelectorAll('img[src^="https://media.discordapp.net/attachments"]');
      addedImages.forEach(function(image) {
        replaceURLs(image);
      });
    } else if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
      if (!mutation.target.src.includes('.gif')) {
        replaceURLs(mutation.target);
      }
    }
  }
}

function runMutation() {
  const images = document.querySelectorAll('img[src^="https://media.discordapp.net/attachments"]');
  let i = 0;

  function processNextImage() {
    if (i < images.length) {
      replaceURLs(images[i], function() {
        i++;
        processNextImage();
      });
    }
  }

  processNextImage();
  observer.observe(document, config);
}


runMutation();
