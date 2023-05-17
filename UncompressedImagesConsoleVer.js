	const config = {
	  attributes: true,
	  childList: true,
	  subtree: true,
	  attributeFilter: ['src'],
	};

	const observer = new MutationObserver(callback);

    function updateImagePositions() {
      const centerImageBecauseRegularCSSWillNot = document.querySelectorAll('.lazyImg-ewiNCh.processed-image.processed-grid-layout');
      const imgContainers = document.querySelectorAll('.imageContainer-10XenG.processed-grid-layout');

      centerImageBecauseRegularCSSWillNot.forEach((image, i) => {
        const container = imgContainers[i];
        if (container && image) {
          const containerHeight = container.clientHeight;
          const imageHeight = image.clientHeight;
          const translateY = (containerHeight - imageHeight) / 2;
          image.style.transform = `translateY(${translateY}px)`;
        }
      });
    }

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
			  const aspectRatio = offscreenImage.naturalWidth / offscreenImage.naturalHeight;
			  const maxWidth = image.closest('.imageWrapper-oMkQl4').clientWidth;
			  const maxHeight = image.closest('.imageWrapper-oMkQl4').clientHeight;
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
			} finally {
			  index++;
			  setImmediate(processImage);
			}
		  };
		}
	  }

	  let images = document.querySelectorAll('.lazyImg-ewiNCh.processed-image.processed-single-layout');
	  images.forEach((image) => {
		image.addEventListener('load', function () {
		  const classElement = image.closest('.imageWrapper-oMkQl4.imageZoom-3yLCXY.clickable-LksVCf.lazyImgContainer-3k3gRy.processed-single-layout');
		  if (classElement && image.naturalWidth > image.naturalHeight) {
			classElement.classList.add('auto-width');
		  }
		});
	  });
	}


    updateImagePositions();
    this.resizeListener = window.addEventListener('resize', updateImagePositions);

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
				  replaceURLs();
				  checkForGridLayout();
				  updateImagePositions();
              });
            }
          });

		} else if (
		  mutation.type === 'attributes' &&
		  mutation.attributeName === 'src'
		) {
          if (!mutation.target.src.includes('.gif')) {
			  processImage();
			  replaceURLs();
			  convertMediaToCDN();
			  replaceURLs();
			  checkForGridLayout();
			  updateImagePositions();
          }
        }
      }
    }

	function checkForGridLayout() {
	  const messages = document.querySelectorAll('.messageListItem-ZZ7v6g');
	  messages.forEach((message) => {
		const elements = message.querySelectorAll('.lazyImg-ewiNCh, .imageContainer-10XenG, .lazyImgContainer-3k3gRy, .imageWrapper-oMkQl4');
		const imageElements = message.querySelectorAll('.lazyImg-ewiNCh');
		if (imageElements.length > 1) {
		  elements.forEach((element) => {
			element.classList.add('processed-grid-layout');
		  });
		} else if (imageElements.length === 1) {
		  elements.forEach((element) => {
			element.classList.add('processed-single-layout');
		  });
		}
	  });
	}

	function createUncompressedImagesCSSStyle() {
	  const style = document.createElement('style');
	  style.textContent = `

		.mediaAttachmentsContainer-1WGRWy {
			width: initial !important;
		}	
	  
		.auto-width {
            width: auto !important;
	        height: auto !important;
		}
	  
		.imageWrapper-oMkQl4.imageZoom-3yLCXY.clickable-LksVCf.lazyImgContainer-3k3gRy.processed-single-layout {
			margin: initial !important;
		}
		
		.attachmentContentItem-UKeiCx {
			width: auto !important;
			max-width: 550px !important;
			max-height: 350px !important;
		}

		.clickableWrapper-2WTAkL {
			height: none !important;
		}
		
		.imageWrapper-oMkQl4.imageZoom-3yLCXY.clickable-LksVCf.lazyImgContainer-3k3gRy.processed-grid-layout {
			display: -webkit-box !important;
		}
		
		.imageContent-3Av-9c.embedWrapper-1MtIDg.attachmentContentContainer-3WAhvQ.attachmentContentItem-UKeiCx {
			height: none !important;	
		}
			
		.lazyImg-ewiNCh.processed-image.processed-grid-layout {
			aspect-ratio: unset !important;
			display: grid !important;
			width: auto !important;
			object-fit: cover !important;
		}
		
		.imageWrapper-oMkQl4.imageZoom-3yLCXY.clickable-LksVCf.lazyImgContainer-3k3gRy.processed-grid-layout {
			max-width: 100% !important;
		}
		
	  `;
	  document.head.appendChild(style);
	  return style;
	}

	function runMutation() {
	  convertMediaToCDN();
	  replaceURLs();
	  checkForGridLayout();
	  observer.observe(document, config);
	}

	runMutation();
	  if (!this.UncompressedImagesCSSStyle) {
		this.UncompressedImagesCSSStyle = createUncompressedImagesCSSStyle();
	  }
	  this.observer = observer;

	/**
	* Version 3.4 of Uncompressed Images
	* Copyright (Boost Software License 1.0) 2023-2023 Knew
	*/
