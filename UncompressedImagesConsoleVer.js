const config = {
  attributes: true,
  childList: true,
  subtree: true,
  attributeFilter: ['src'],
};

const observer = new MutationObserver(callback);

function replaceURLs() {
  const images = document.querySelectorAll('img[src^="https://media.discordapp.net/attachments"]');
  
  images.forEach(function(image) {
    if (!image.src.includes('.gif')) {
      
      setTimeout(function() {
        image.src = image.src.replace('https://media.discordapp.net/attachments', 'https://cdn.discordapp.com/attachments');
      }, 750);
    }
  });
}

function callback(mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {

      const addedImages = mutation.target.querySelectorAll('img[src^="https://media.discordapp.net/attachments"]');
      addedImages.forEach(function(image) {

        if (!image.src.includes('.gif')) {
          
          setTimeout(function() {
            image.src = image.src.replace('https://media.discordapp.net/attachments', 'https://cdn.discordapp.com/attachments');
          }, 750);
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
