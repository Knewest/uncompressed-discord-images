    const config = {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ['src'],
    };

    const observer = new MutationObserver(callback);

    function convertMediaToCDN() {
      const mediaURLs = document.querySelectorAll(
        'img[src^="https://media.discordapp.net/attachments"]:not(.processed-image)'
      );
      mediaURLs.forEach((image) => {
        image.src = image.src.replace(
          'https://media.discordapp.net/attachments',
          'https://cdn.discordapp.com/attachments'
        );
        image.classList.add('processed-image');
      });
    }

    function replaceURLs() {
      const messages = document.querySelectorAll('.messageListItem-ZZ7v6g');
      messages.forEach((message) => {
        const images = message.querySelectorAll('.imageDetails-1t6Zms');
        if (images.length > 1) {
          images.forEach((image) => {
            image.style.display = 'none';
          });
        }
      });

      const mediaURLs = document.querySelectorAll(
        'img[src^="https://media.discordapp.net/attachments"]'
      );
      let index = 0;
      function processImage() {
        const image = mediaURLs[index];
        if (image && !image.src.includes('.gif')) {
          const newSrc = image.src.replace(
            'https://media.discordapp.net/attachments',
            'https://cdn.discordapp.com/attachments'
          );
          const offscreenImage = new Image();
          offscreenImage.src = newSrc;
			offscreenImage.onload = function () {
			  try {
				const aspectRatio =
				  offscreenImage.naturalWidth / offscreenImage.naturalHeight;
				const maxWidth = image.closest('.imageWrapper-2p5ogY').clientWidth;
				const maxHeight = image.closest('.imageWrapper-2p5ogY').clientHeight;
				let width = offscreenImage.naturalWidth;
				let height = offscreenImage.naturalHeight;
				if (width > maxWidth) {
				  width = maxWidth;
				  height = width / aspectRatio;
				}
				if (height > maxHeight) {
				  height = maxHeight;
				  width = height * aspectRatio;
				}
				image.src = newSrc;
				image.classList.add('processed-image');
				image.style.width = `${width}px`;
				image.style.height = `${height}px`;
			  } catch (error) {
				// Meaningless error that broke functionality if "fixed"...
			  } finally {
				index++;
				setImmediate(processImage);
			  }
			};
        }
      }

      processImage();
    }

    function callback(mutationsList, observer) {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          const addedImages = Array.from(mutation.addedNodes)
            .flatMap((node) =>
              node.querySelectorAll
                ? Array.from(
                    node.querySelectorAll(
                      'img[src^="https://media.discordapp.net/attachments"]:not(.processed-image)'
                    )
                  )
                : []
            )
            .concat(
              Array.from(mutation.addedNodes).filter(
                (node) =>
                  node.tagName === 'IMG' &&
                  node.src.startsWith('https://media.discordapp.net/attachments') &&
                  !node.classList.contains('processed-image')
              )
            );

          addedImages.forEach(function (image) {
            if (!image.src.includes('.gif')) {
              setImmediate(function () {
                convertMediaToCDN();
              });
            }
          });
        } else if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'src'
        ) {
          if (!mutation.target.src.includes('.gif')) {
            replaceURLs();
          }
        }
      }
    }

    function runMutation() {
      convertMediaToCDN();
      replaceURLs();
      observer.observe(document, config);
    }

    runMutation();
    this.observer = observer;
