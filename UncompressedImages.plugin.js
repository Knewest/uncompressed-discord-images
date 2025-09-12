/**
* @name Uncompressed Images
* @author Knew
* @description Discord's solution to previewing images is awful so by changing 'media.discordapp.net' links to 'cdn.discordapp.com' links, we will no longer have blurry images (especially with JPEG 1, WebP, and other lossy formats).
* @version 3.33
* @authorId 332116671294734336
* @authorLink https://github.com/Knewest
* @invite NqqqzajfK4
* @website https://twitter.com/KnewestLSEP
* @source https://github.com/Knewest/Uncompressed-Discord-Images
* @updateUrl https://raw.githubusercontent.com/Knewest/Uncompressed-Discord-Images/main/UncompressedImages.plugin.js
* @changelog {banner} https://betterdiscord.app/resources/thumbnails/1284.png
* @changelog {blurb} Missed or want to know previous changelogs? Find them [here](https://github.com/Knewest/Uncompressed-Discord-Images/releases).
* @changelog {fixed.item} Added a CSS rule to prevent vertically longer videos from having the video controls hidden.
* @changelog {footer} Need help? Join the [support server (NqqqzajfK4)](https://discord.gg/NqqqzajfK4).
*/

function debounce(func, wait) {
	let timeout;
	return function(...args) {
		const context = this;
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(context, args), wait);
	};
}

module.exports = class UncompressedImages {
	constructor() {
		this.observer = null;
		this.resizeListener = null;
		this.animationFrame = null;
	}

start() {

	const config = {
		attributes: true,
		childList: true,
		subtree: true,
		attributeFilter: ['src'],
	};

	const localObserver = new MutationObserver(callback);
// ----------------- //
	function updateGridLayoutClass() {
		const twoByTwoGridElements = document.querySelectorAll('.twoByTwoGrid_f4758a');
			twoByTwoGridElements.forEach((element) => {
				element.classList.remove('twoByTwoGrid_f4758a');
				element.classList.add('threeByThreeGrid_f4758a');
				element.style.gridTemplateColumns = 'repeat(2, 1fr)';

				addClassToChildren(element, 'oneByTwoSoloItem_f4758a');
		});

		const threeByThreeGridElements = document.querySelectorAll('.threeByThreeGrid_f4758a');
			threeByThreeGridElements.forEach((element) => {
				if (!element.classList.contains('original-threeByThreeGrid')) {
					addClassToChildren(element, 'oneByTwoSoloItem_f4758a');
				}
			});
		}

	function addClassToChildren(parentElement, className) {
		const childElements = parentElement.children;
			for (let i = 0; i < childElements.length; i++) {
				childElements[i].classList.add(className);
			}
		}

	function adjustHeightBasedOnNearestVerticalResolution() {
		let debounceTimer;
		const debounceDelay = 2000;

	const resizeObserver = new ResizeObserver((entries) => {
		const reversedEntries = Array.from(entries).reverse();
		let delay = 0;

		reversedEntries.forEach((entry) => {
			setTimeout(() => {
				const element = entry.target;
				const nearestGridItem = element.closest(
					'.oneByTwoGridItem_f4758a, ' +
					'.oneByTwoGrid_f4758a.oneByTwoLayoutThreeGrid_f4758a .oneByTwoSoloItem_f4758a, ' +
					'.twoByOneGridItem_f4758a, ' +
					'.oneByOneGrid_f4758a.oneByOneGridMosaic_f4758a, ' +
					'.threeByThreeGrid_f4758a .oneByTwoSoloItem_f4758a, ' +
					'.oneByTwoGrid_f4758a .oneByTwoGridItem_f4758a'
				);

				if (nearestGridItem) {
					const renderedHeight = nearestGridItem.getBoundingClientRect().height;
					if (renderedHeight >= 10) {
						element.style.height = `${renderedHeight}px`;
					}
				}
			}, delay);
			delay += 25;
		});

		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			centerImageUponWindowResize();
		}, debounceDelay);
	});

	const elementsToObserve = document.querySelectorAll('.clickableWrapper_af017a, .loadingOverlay_af017a');
		elementsToObserve.forEach((element) => {
			resizeObserver.observe(element);

			setTimeout(() => {
				resizeObserver.unobserve(element);
			}, 2000);
		});
	}
// ----------------- //
// ----------------- //
	function centerImageBecauseRegularCSSWillNot() {
		const updateImagePositions = document.querySelectorAll(
			'.imageContainer__0f481 .lazyImg_f4758a.processed-image.processed-grid-layout:not(.uncompressedImagesCentered)'
		);
		const imagesArray = Array.from(updateImagePositions).reverse();
		let delay = 0;

		imagesArray.forEach((image) => {
			setTimeout(() => {
				const container = image.closest(
					'.oneByTwoGridItem_f4758a, ' +
					'.oneByTwoGrid_f4758a.oneByTwoLayoutThreeGrid_f4758a .oneByTwoSoloItem_f4758a, ' +
					'.oneByTwoSoloItem_f4758a, ' +
					'.twoByOneGridItem_f4758a, ' +
					'.oneByOneGrid_f4758a.oneByOneGridMosaic_f4758a, ' +
					'.oneByTwoGrid_f4758a .oneByTwoGridItem_f4758a'
				);

				if (container && image) {
					if (container.matches('.threeByThreeGrid_f4758a .oneByTwoSoloItem_f4758a')) {
						container.style.maxHeight = '175px';
						image.classList.add('uncompressedImagesCentered');
					}

					const containerHeight = container.clientHeight;
					const originalImageHeight = image.clientHeight;
					const scaleFactor = Math.max(1, containerHeight / originalImageHeight);

					image.style.transform = `scale(${scaleFactor})`;
					image.style.transformOrigin = 'top';
					image.offsetHeight; // Forcing the reflow - Knew

					const scaledImageHeight = scaleFactor === 1 ? originalImageHeight : originalImageHeight * scaleFactor;
					const translateY = (containerHeight - scaledImageHeight) / 2;

					image.style.transform += ` translateY(${translateY}px)`;
					image.classList.add('uncompressedImagesCentered');
				}
			}, delay);
			delay += 100;
		});

		setTimeout(adjustHeightBasedOnNearestVerticalResolution, 10);
		setTimeout(centerImageUponWindowResize, 2000);
		setTimeout(adjustHeightBasedOnNearestVerticalResolution, 4500);
	}

	function centerImageUponWindowResize() { // Reminder: The function above is NOT the same. - Knew
		const updateImagePositions = document.querySelectorAll(
			'.imageContainer__0f481 .lazyImg_f4758a.processed-image.processed-grid-layout'
		);
		const imagesArray = Array.from(updateImagePositions).reverse();
		let delay = 0;

		imagesArray.forEach((image) => {
			setTimeout(() => {
				const container = image.closest(
					'.oneByTwoGridItem_f4758a, ' +
					'.oneByTwoGrid_f4758a.oneByTwoLayoutThreeGrid_f4758a .oneByTwoSoloItem_f4758a, ' +
					'.oneByTwoSoloItem_f4758a, ' +
					'.twoByOneGridItem_f4758a, ' +
					'.oneByOneGrid_f4758a.oneByOneGridMosaic_f4758a, ' +
					'.oneByTwoGrid_f4758a .oneByTwoGridItem_f4758a'
				);

				if (container && image) {
					if (container.matches('.threeByThreeGrid_f4758a .oneByTwoSoloItem_f4758a')) {
						container.style.maxHeight = '175px';
					}

					const containerHeight = container.clientHeight;
					const originalImageHeight = image.clientHeight;
					const scaleFactor = Math.max(1, containerHeight / originalImageHeight);

					image.style.transform = `scale(${scaleFactor})`;
					image.style.transformOrigin = 'top';
					image.offsetHeight; // Forcing the reflow - Knew

					const scaledImageHeight = scaleFactor === 1 ? originalImageHeight : originalImageHeight * scaleFactor;
					const translateY = (containerHeight - scaledImageHeight) / 2;

					image.style.transform += ` translateY(${translateY}px)`;
					image.classList.add('uncompressedImagesCentered');
				}
			}, delay);
			delay += 100;
		});
	}
	
	this.resizeListener = window.addEventListener(
		'resize',
		debounce(centerImageUponWindowResize, 75)
	);
// ----------------- //
// ----------------- //
	function enhanceAvatarQuality() {
		const avatarURLs = document.querySelectorAll(
			'img.avatar_c19a55[src^="https://cdn.discordapp.com/avatars"]:not(.processed-avatar), img.avatar__44b0c[src^="https://cdn.discordapp.com/avatars"]:not(.processed-avatar)'
		);
		avatarURLs.forEach((image) => {
			let newSrc = image.src
				.replace(/\.webp\?size=\d+/, '.png?size=4096');
			image.src = newSrc;
			image.classList.add('processed-avatar');
		});
	}

	function enhanceIconQuality() { // 'Enhance' is so corny. I should probably change this to "fetch", but whatever for now. - Knew
		const iconURLs = document.querySelectorAll(
			'img.icon__6e9f8[src^="https://cdn.discordapp.com/icons/"]:not(.processed-icon)'
		);
		iconURLs.forEach((image) => {
			let newSrc = image.src
				.replace(/\.webp\?size=\d+/, '.png?size=4096');
			image.src = newSrc;
			image.classList.add('processed-icon');
		});
	}
	
	function enhanceActivityIconQuality() {
		const iconURLs = document.querySelectorAll(
			'img.contentImage__42bf5[src^="https://cdn.discordapp.com/app-icons/"]:not(.processed-activity-icon)'
		);
		iconURLs.forEach((image) => {
			let newSrc = image.src
				.replace(/\.webp\?size=\d+&keep_aspect_ratio=false/, '.png?size=4096&keep_aspect_ratio=true')
			image.src = newSrc;
			image.classList.add('processed-activity-icon');
		});
	}

	function imagesExternalLinks() {
		const imgElements = document.querySelectorAll('img');
		imgElements.forEach(img => {
			const externalLink = /^(https:\/\/images-ext-\d+\.discordapp\.net\/external\/[^\/]+\/https\/[^?]+)\?.+$/;
			const match = img.src.match(externalLink);
			if (match) {
				img.src = match[1] + '?';
				img.classList.add('processed-external-link');
			}
		});
	}
// ----------------- //
// ----------------- //
	const SELECTOR_IMG_SRC = `
	  .zoomLens_ac0584 img[src^="https://media.discordapp.net/attachments"]:not(.processed-image),
	  .layerContainer_da8173 img[src^="https://media.discordapp.net/attachments"]:not(.processed-image),
	  .imageContainer__0f481 img[src^="https://media.discordapp.net/attachments"]:not(.processed-image),
	  .vc-imgzoom-lens img[src^="https://media.discordapp.net/attachments"]:not(.processed-image)
	`;

	function convertMediaToCDN() {
		const mediaURLs = Array.from(document.querySelectorAll(SELECTOR_IMG_SRC)).reverse();
		for (const image of mediaURLs) {
			if (
				!image.classList.contains('gif__2dc39') &&
				!image.closest('.video_f316dd') &&
				!image.classList.contains('processed-image')
			) {
				image.src = image.src.replace(
					'https://media.discordapp.net/attachments',
					'https://cdn.discordapp.com/attachments'
				);
				image.classList.add('processed-image');
			}
		}
	}

	function monitorZoomLensInjection() {
		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				for (const node of mutation.addedNodes) {
					if (
						node instanceof HTMLElement &&
						node.classList.contains('zoomLens_ac0584')
					) {
						convertMediaToCDN();
					}
				}
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	}
// ----------------- //
// ----------------- //
	function replaceURLs() {
		const messages = document.querySelectorAll('.container_b7e1cb');

		messages.forEach((message) => {
			const images = message.querySelectorAll('.imageDetails_ac0584');

			if (images.length === 1) {
				const image = images[0];
				image.style.display = 'inline-table';
				image.style.transform = 'translateX(5px) translateY(0)';
				image.style.lineHeight = 'unset';

				const parent = image.closest(
					'.imageContent__0f481.embedWrapper_b7e1cb.itemContentContainer_f4758a.mosaicItemContent__6c706'
				);

				if (parent) {
					parent.appendChild(image);
				}
			} else if (images.length > 1) {
				images.forEach((image) => {
					image.style.display = 'none';
				});
			}
		});

		const SINGLE_IMAGE_SELECTOR = '.container_b7e1cb .lazyImg_f4758a.processed-image.processed-single-layout';
		const SINGLE_WRAPPER_SELECTOR = '.imageWrapper_af017a.imageZoom_af017a.clickable_af017a.lazyImgContainer_f4758a.processed-single-layout';

		const GRID_IMAGE_SELECTOR = '.container_b7e1cb .lazyImg_f4758a.processed-image.processed-grid-layout';
		const GRID_WRAPPER_SELECTOR = '.imageWrapper_af017a.imageZoom_af017a.clickable_af017a.lazyImgContainer_f4758a.processed-grid-layout';

		// Handle single image layout (landscape):
		const imagesSingle = document.querySelectorAll(SINGLE_IMAGE_SELECTOR);
		imagesSingle.forEach((image) => {
			image.addEventListener('load', () => {
				const classElement = image.closest(SINGLE_WRAPPER_SELECTOR);
				if (classElement && image.naturalWidth > image.naturalHeight) {
					classElement.classList.add('auto-width-single');
				}
			});
		});

		// Handle grid image layout (portrait):
		const imagesGrid = document.querySelectorAll(GRID_IMAGE_SELECTOR);
		imagesGrid.forEach((image) => {
			image.addEventListener('load', () => {
				const classElement = image.closest(GRID_WRAPPER_SELECTOR);
				if (classElement && image.naturalHeight > image.naturalWidth) {
					classElement.classList.add('auto-width-grid');
				}
			});
		});
	}
// ----------------- //
// ----------------- //
	function processImageSrc() {
		convertMediaToCDN();
		replaceURLs();
		checkForGridLayout();
		updateGridLayoutClass();
		centerImageBecauseRegularCSSWillNot();
	}

	function callback(mutationsList, observer) {
		const CLASS_LAZY_IMG = 'lazyImg_f4758a';
		const SELECTOR_IMG_SRC = `.${CLASS_LAZY_IMG}`;
		
		for (const mutation of mutationsList) {
			if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
				const addedImages = Array.from(mutation.addedNodes).flatMap((node) =>
					node.querySelectorAll
						? Array.from(node.querySelectorAll(SELECTOR_IMG_SRC))
						: []
				);

				addedImages.forEach((image) => {
					if (!image.src.includes('.gif')) {
						setImmediate(processImageSrc);
					}
				});
			} else if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
				if (!mutation.target.src.includes('.gif')) {
					processImageSrc();
					enhanceAvatarQuality();
					enhanceIconQuality();
					enhanceActivityIconQuality();
					imagesExternalLinks();
				}
			}
		}
	}
// ----------------- //
// ----------------- //
	function checkForGridLayout() {
		const CLASS_CONTAINER = 'container_b7e1cb';
		const CLASS_IMAGE_WRAPPER = 'imageWrapper_af017a';
		const CLASS_IMAGE_CONTAINER = 'imageContainer__0f481';
		const CLASS_LAZY_IMG = 'lazyImg_f4758a';
		const CLASS_LAZY_IMG_CONTAINER = 'lazyImgContainer_f4758a';
		const CLASS_IMAGE_CONTENT = 'imageContent__0f481';
		
		const messages = document.querySelectorAll(`.${CLASS_CONTAINER}`);
		messages.forEach((message) => {
			const allRelatedElements = message.querySelectorAll([
				`.${CLASS_LAZY_IMG}`,
				`.${CLASS_IMAGE_CONTAINER}`,
				`.${CLASS_LAZY_IMG_CONTAINER}`,
				`.${CLASS_IMAGE_WRAPPER}`,
				`.${CLASS_IMAGE_CONTENT}`,
			].join(', '));
			
		const imageElements = message.querySelectorAll(`.${CLASS_LAZY_IMG}`);
		const CLASS_PROCESSED_SINGLE = 'processed-single-layout';
		const CLASS_PROCESSED_GRID = 'processed-grid-layout';
		
			if (imageElements.length > 1) {
				allRelatedElements.forEach((element) => {
					element.classList.remove(CLASS_PROCESSED_SINGLE);
					element.classList.add(CLASS_PROCESSED_GRID);
				});
			} else if (imageElements.length === 1) {
				allRelatedElements.forEach((element) => {
					element.classList.remove(CLASS_PROCESSED_GRID);
					element.classList.add(CLASS_PROCESSED_SINGLE);
				});
			}
		});
	}
// ----------------- //
// ----------------- //
	function createUncompressedImagesCSSStyle() {
	const style = document.createElement('style');
	style.textContent = `

		.pointerCover_d125d2 {
			z-index: -9999 !important;
		}

		.pointerCover__5c3cc {
			z-index: -9999 !important;
		}
		
		.altText__0f481 {
			margin: .25rem 0 -0.15rem !important;
			line-height: 17px !important;
		}

		.mediaAttachmentsContainer__242e2 {

		}

		.auto-width-single {
			width: auto !important;
			height: auto !important;
			max-width: 550px !important;
		}		
		
		.auto-width-single img {
			max-height: 350px !important;
		}

		.auto-width-grid {
			height: auto !important;
			max-width: 550px !important;
		}		
		
		.auto-width-grid img {

		}

		.imageWrapper_af017a.imageZoom_af017a.clickable_af017a.lazyImgContainer_f4758a.processed-single-layout {
			
		}
		
		.carouselModal_d2b9a1.zoomedCarouselModalRoot_f74404.root__49fc1.fullscreenOnMobile__49fc1 {
			display: flex !important;
			justify-content: center !important;
			align-items: center !important;
		}

		.imageWrapper_af017a.imageZoom_af017a.clickable_af017a.lazyImgContainer_f4758a.processed-grid-layout {
			display: -webkit-box !important;
		}
		
		.imageContent__0f481.embedWrapper_b7e1cb.itemContentContainer_f4758a.mosaicItemContent__6c706.processed-single-layout {
			height: auto !important;
			width: auto !important;
			max-width: 550px !important;		
		}

		.imageWrapper_af017a.embedWrapper_b7e1cb.lazyImg_f4758a.mosaicItemContent__6c706.processed-single-layout {
			
		}

		.imageDetailsAdded_ac0584 .imageWrapper_af017a {
			height: 100% !important;
		}

		.imageDetails_ac0584 {
			margin: 0.15rem 0 0rem !important;
		}

		.lazyImg_f4758a.processed-image.processed-grid-layout {
			aspect-ratio: unset !important;
			display: grid !important;
			object-fit: cover !important;
		}
		
		.lazyImg_f4758a.processed-image.processed-single-layout {

		}	

		.imageWrapper_af017a.imageZoom_af017a.clickable_af017a.lazyImgContainer_f4758a.processed-grid-layout {
			max-width: 100% !important;
		}
		
		.imageWrapper_af017a.imageZoom_af017a.clickable_af017a.lazyImgContainer_f4758a.processed-single-layout {
			height: 100% !important;
		}
		
		.cursorPointer_B3uwDA {
			transform: translateY(2px) !important;
		}

		.spoilerContent__54ab5.spoilerContainer__54ab5 {
			background-color: rgba(255, 255, 255, 0);
		}

		.loadingOverlay_af017a {
			aspect-ratio: unset !important;
		}

		.threeByThreeGrid_f4758a .lazyImgContainer_f4758a, .threeByThreeGrid_f4758a .lazyImg_f4758a {
			aspect-ratio: unset !important;
		}

		.lazyImg_f4758a.processed-image.processed-grid-layout {
			min-height: auto !important;
		}

		.oneByTwoGrid_f4758a .itemContentContainer_f4758a, .oneByTwoGrid_f4758a .lazyImg_f4758a {
			height: unset !important;
		}
		
		.oneByOneGrid_f4758a {
			max-height: unset;
		}
	`;
	document.head.appendChild(style);
	return style;
	}

	function modifyImageUtilitiesCSSRule() {
		var styleElement = document.getElementById("ImageUtilitiesCSS");

		if (styleElement) {
			var cssText = styleElement.textContent;

			var oldRule = ".imageDetailsAdded_ac0584 .imageWrapper_af017a {border-radius: 8px !important;height: calc(100% - 1rem - 16px) !important;max-height: unset !important;margin-left: unset !important;}";
			var newRule = ".imageDetailsAdded_ac0584 .imageWrapper_af017a {border-radius: 8px !important;height: calc(100% - 1rem - 16px);max-height: unset !important;margin-left: unset !important;}";

			cssText = cssText.replace(oldRule, newRule);

			styleElement.textContent = cssText;
		} else {
			// console.error("Uncompressed Images Error: Style element with ID 'ImageUtilitiesCSS' not found.");
		}
	}
// ----------------- //
// ----------------- //
	function runMutation() {
		convertMediaToCDN();
		monitorZoomLensInjection();
		replaceURLs();
		enhanceAvatarQuality();
		enhanceIconQuality();
		enhanceActivityIconQuality();
		imagesExternalLinks();
		setTimeout(modifyImageUtilitiesCSSRule, 4000);
		localObserver.observe(document, config);
	}

	runMutation();

	if (!this.UncompressedImagesCSSStyle) {
		this.UncompressedImagesCSSStyle = createUncompressedImagesCSSStyle();
	}

	this.mutationObserver = localObserver;

/** 
Main code ends here, don't forget. 
That "}" is attached to the "start () {" function.
*/
// ----------------- //
} stop() {
	if (this.mutationObserver) {
		this.mutationObserver.disconnect();
		this.mutationObserver = null;
	}

	if (this.UncompressedImagesCSSStyle) {
		this.UncompressedImagesCSSStyle.remove();
		this.UncompressedImagesCSSStyle = null;
	}

	if (this.resizeListener) {
		window.removeEventListener('resize', this.resizeListener);
		this.resizeListener = null;
	}

	if (this.animationFrame) {
		cancelAnimationFrame(this.animationFrame);
		this.animationFrame = null;
	}

	function removeClassFromChildren(parentElement, className) {
		const childElements = parentElement.children;
		for (let i = 0; i < childElements.length; i++) {
			childElements[i].classList.remove(className);
		}
	}

	(function modifyImageUtilitiesCSSRuleDisable() {
		var styleElement = document.getElementById("ImageUtilitiesCSS");

		if (styleElement) {
			var cssText = styleElement.textContent;

			var newRule = ".imageDetailsAdded_ac0584 .imageWrapper_af017a {border-radius: 8px !important;height: calc(100% - 1rem - 16px) !important;max-height: unset !important;margin-left: unset !important;}";
			var oldRule = ".imageDetailsAdded_ac0584 .imageWrapper_af017a {border-radius: 8px !important;height: calc(100% - 1rem - 16px);max-height: unset !important;margin-left: unset !important;}";

			cssText = cssText.replace(oldRule, newRule);

			styleElement.textContent = cssText;
		}
	})();

    const threeByThreeGridElements = document.querySelectorAll('.threeByThreeGrid_f4758a');
    threeByThreeGridElements.forEach(element => {
        element.classList.remove('threeByThreeGrid_f4758a');
        element.classList.add('twoByTwoGrid_f4758a');
        element.style.gridTemplateColumns = "";

        removeClassFromChildren(element, 'oneByTwoSoloItem_f4758a');
    });

    const elementsWithAdjustedHeight = document.querySelectorAll('.clickableWrapper_af017a, .loadingOverlay_af017a');
    elementsWithAdjustedHeight.forEach(element => {
        element.style.height = "100%";
    });

    const centeredImages = document.querySelectorAll('.imageContainer__0f481 .lazyImg_f4758a.processed-image.processed-grid-layout.uncompressedImagesCentered');
    centeredImages.forEach(image => {
        image.style.transform = "";
        image.classList.remove('uncompressedImagesCentered');
    });

	const revertClassesAndStyles = (selector, className, srcRegex, srcReplacement, appendQuery) => {
		const elements = document.querySelectorAll(selector);
		elements.forEach((element) => {
			if (element) {
				element.classList.remove(className);
				if (srcRegex && srcReplacement) {
					element.src = element.src.replace(srcRegex, srcReplacement);
				}
				if (appendQuery) {
					if (element.src.includes('?')) {
						element.src += '&' + appendQuery;
					} else {
						element.src += '?' + appendQuery;
					}
				}
			}
		});
	};	

	revertClassesAndStyles('.auto-width-single', 'auto-width-single');
	revertClassesAndStyles('.auto-width-grid', 'auto-width-grid');
	revertClassesAndStyles('.max-width-adjusted', 'max-width-adjusted');
	revertClassesAndStyles('.processed-avatar', 'processed-avatar', /\?quality=lossless/, '');
	revertClassesAndStyles('.processed-icon', 'processed-icon', /\?quality=lossless/, '');
	revertClassesAndStyles('.processed-image', 'processed-image', /https:\/\/cdn\.discordapp\.com\/attachments/, 'https:\/\/media.discordapp.net\/attachments');
	revertClassesAndStyles('.processed-single-layout', 'processed-single-layout');
	revertClassesAndStyles('.processed-grid-layout', 'processed-grid-layout');
	revertClassesAndStyles('.processed-external-link', 'processed-external-link', null, null, 'format=webp');

	const removeLoadEventListener = (selector) => {
		const images = document.querySelectorAll(selector);
		images.forEach((image) => {
			if (typeof handleImageLoad === 'function') {
				image.removeEventListener('load', handleImageLoad);
			}
		});
	};

	removeLoadEventListener('.container_b7e1cb .lazyImg_f4758a.processed-image.processed-single-layout');
	removeLoadEventListener('.container_b7e1cb .lazyImg_f4758a.processed-image.processed-grid-layout');

	const imageDetails = document.querySelectorAll('.messageListItem__5126c .imageDetails_ac0584');
	imageDetails.forEach((image) => {
		if (image) {
			image.style.removeProperty('display');
			image.style.removeProperty('transform');
			image.style.lineHeight = '16px';
			image.style.display = '';
		}
	});

	const imageContainers = document.querySelectorAll('.imageDetails_ac0584');
	imageContainers.forEach((element) => {
		if (element) {
			const commonParent = element.closest('.imageContent__0f481.embedWrapper_b7e1cb.itemContentContainer_f4758a.mosaicItemContent__6c706');
			const targetParent = commonParent ? commonParent.querySelector('.imageContainer__0f481 div') : null;
			if (targetParent) {
				targetParent.appendChild(element);
			}
		}
	});

	if (typeof timeoutId !== 'undefined') {
		clearTimeout(timeoutId);
	}
}
};

/**
* Version 3.32 of 'Uncompressed Images'.
* Copyright (Boost Software License 1.0) 2023-2025 Knew
* Link to plugin: https://github.com/Knewest/Uncompressed-Discord-Images
* Support server: https://discord.gg/NqqqzajfK4
*/

/** IGNORE THIS
* @changelog {banner} https://cdn.discordapp.com/attachments/753561208073879642/1134847376541106176/output_animation8.webp
* @changelog {blurb} Missed or want to know previous changelogs? Find them [here](https://github.com/Knewest/embed-more-images/releases).
* @changelog {fixed.item} 
* @changelog {added.title} What I changed
* @changelog {added.item}
* @changelog {footer} Need help? Join my the [support server (NqqqzajfK4)](https://discord.gg/NqqqzajfK4).
*/
