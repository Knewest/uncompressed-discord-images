	const config = {
	  attributes: true,
	  childList: true,
	  subtree: true,
	  attributeFilter: ['src'],
	};

	const observer = new MutationObserver(callback);

	function centerImageBecauseRegularCSSWillNot() {
	  const updateImagePositions = document.querySelectorAll('.container-2sjPya .lazyImg-ewiNCh.processed-image.processed-grid-layout');

	  updateImagePositions.forEach((image) => {
		const container = image.closest('.imageWrapper-oMkQl4.imageZoom-3yLCXY.clickable-LksVCf.lazyImgContainer-3k3gRy.processed-grid-layout');
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
			'.container-2sjPya img[src^="https://media.discordapp.net/attachments"]:not(.processed-image), .zoomLens-uOK8xV img[src^="https://media.discordapp.net/attachments"]:not(.processed-image), .layerContainer-2lfOPe img[src^="https://media.discordapp.net/attachments"]:not(.processed-image)'
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
	  const messages = document.querySelectorAll('.container-2sjPya');
	  messages.forEach((message) => {
		const images = message.querySelectorAll('.imageDetails-1t6Zms');
		if (images.length === 1) {
		  const image = images[0];
		  image.style.display = 'inline-table';
		  image.style.transform = 'translateX(5px) translateY(-0px)';
		  image.style.lineHeight = 'unset';
		  
		  const parent = image.closest('.imageContent-3Av-9c.embedWrapper-1MtIDg.attachmentContentContainer-3WAhvQ.attachmentContentItem-UKeiCx');
		  if (parent) {
			parent.appendChild(image);
		  }
		} else if (images.length > 1) {
		  images.forEach((image) => {
			image.style.display = 'none';
		  });
		}
	});

	const mediaURLs = document.querySelectorAll(
	   '.container-2sjPya img[src^="https://media.discordapp.net/attachments"]:not(.processed-image), .zoomLens-uOK8xV img[src^="https://media.discordapp.net/attachments"]:not(.processed-image), .layerContainer-2lfOPe img[src^="https://media.discordapp.net/attachments"]:not(.processed-image)'
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
	  processImage();
	}

	  let images = document.querySelectorAll('.container-2sjPya .lazyImg-ewiNCh.processed-image.processed-single-layout');
	  images.forEach((image) => {
		image.addEventListener('load', function () {
		  const classElement = image.closest('.imageWrapper-oMkQl4.imageZoom-3yLCXY.clickable-LksVCf.lazyImgContainer-3k3gRy.processed-single-layout');
		  if (classElement && image.naturalWidth > image.naturalHeight) {
			classElement.classList.add('auto-width');
		  }
		});
	  });
	}

    this.resizeListener = window.addEventListener('resize', centerImageBecauseRegularCSSWillNot);

    function callback(mutationsList, observer) {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          const addedImages = Array.from(mutation.addedNodes)
            .flatMap((node) =>
			  node.querySelectorAll
				? Array.from(
					node.querySelectorAll(
					  '.container-2sjPya img[src^="https://media.discordapp.net/attachments"]:not(.processed-image), .zoomLens-uOK8xV img[src^="https://media.discordapp.net/attachments"]:not(.processed-image), .layerContainer-2lfOPe img[src^="https://media.discordapp.net/attachments"]:not(.processed-image)'
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
				  centerImageBecauseRegularCSSWillNot();
                });
            }
        });

		} else if (
		  mutation.type === 'attributes' &&
		  mutation.attributeName === 'src'
		) {
          if (!mutation.target.src.includes('.gif')) {
			  convertMediaToCDN();
			  replaceURLs();
			  checkForGridLayout();
			  centerImageBecauseRegularCSSWillNot();
            }
        }
      }
    }

	function checkForGridLayout() {
	  const messages = document.querySelectorAll('.container-2sjPya');
	  messages.forEach((message) => {
		const elements = message.querySelectorAll('.lazyImg-ewiNCh, .imageContainer-10XenG, .lazyImgContainer-3k3gRy, .imageWrapper-oMkQl4, .imageContent-3Av-9c');
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
			max-width: 550px !important;
		}		
		
		.auto-width img {
	        max-height: 350px !important;
		}
	  
		.imageWrapper-oMkQl4.imageZoom-3yLCXY.clickable-LksVCf.lazyImgContainer-3k3gRy.processed-single-layout {
			margin: initial !important;
		}
		
		.clickableWrapper-2WTAkL {
			height: none !important;
		}
		
		.imageWrapper-oMkQl4.imageZoom-3yLCXY.clickable-LksVCf.lazyImgContainer-3k3gRy.processed-grid-layout {
			display: -webkit-box !important;
		}
		
		.imageContent-3Av-9c.embedWrapper-1MtIDg.attachmentContentContainer-3WAhvQ.attachmentContentItem-UKeiCx.processed-single-layout {
			height: auto !important;
			width: auto !important;
			max-width: 550px !important;		
		}

		.imageWrapper-oMkQl4.embedWrapper-1MtIDg.lazyImg-ewiNCh.attachmentContentItem-UKeiCx.processed-single-layout {
			width: auto !important;
		}
			
		.lazyImg-ewiNCh.processed-image.processed-grid-layout {
			aspect-ratio: unset !important;
			display: grid !important;
			width: auto !important;
			height: auto !important;
			object-fit: cover !important;
		}
		
		.lazyImg-ewiNCh processed-image processed-single-layout {
			max-width: 550px !important;
		}	
	
		.imageWrapper-oMkQl4.imageZoom-3yLCXY.clickable-LksVCf.lazyImgContainer-3k3gRy.processed-grid-layout {
			max-width: 100% !important;
		}
		
		.imageWrapper-oMkQl4.imageZoom-3yLCXY.clickable-LksVCf.lazyImgContainer-3k3gRy.processed-single-layout {
			height: 100% !important;
		}
		
		.cursorPointer-B3uwDA {
			transform: translateY(2px) !important;
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
	* Version 3.10 of Uncompressed Images
	* Copyright (Boost Software License 1.0) 2023-2023 Knew
	* Link to plugin: https://github.com/Knewest/uncompressed-discord-images
	*/
