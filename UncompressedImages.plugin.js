/**
* @name Uncompressed Images
* @author Knew
* @description Discord's solution to previewing images is awful so by changing 'media.discordapp.net' links to 'cdn.discordapp.com' links, we will no longer have blurry images (especially with JPEG 1, WebP, and other lossy formats).
* @version 3.29
* @authorId 332116671294734336
* @authorLink https://github.com/Knewest
* @invite NqqqzajfK4
* @website https://twitter.com/KnewestLSEP
* @source https://github.com/Knewest/Uncompressed-Discord-Images
* @updateUrl https://raw.githubusercontent.com/Knewest/Uncompressed-Discord-Images/main/UncompressedImages.plugin.js
* @changelog {banner} https://betterdiscord.app/resources/thumbnails/1284.png
* @changelog {blurb} Missed or want to know previous changelogs? Find them [here](https://github.com/Knewest/Uncompressed-Discord-Images/releases).
* @changelog {added.title} What I changed:
* @changelog {added.item} Updated class names using [this tool by Syndishanx](https://syndishanx.github.io/Website/Update_Classes.html).
* @changelog {footer} Need help? Join my the [support server (NqqqzajfK4)](https://discord.gg/NqqqzajfK4).
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

	function updateGridLayoutClass() {
		const twoByTwoGridElements = document.querySelectorAll('.twoByTwoGrid_cda674');
		twoByTwoGridElements.forEach(element => {
			element.classList.remove('twoByTwoGrid_cda674');
			element.classList.add('threeByThreeGrid_cda674');
			element.style.gridTemplateColumns = "repeat(2, 1fr)";

			addClassToChildren(element, 'oneByTwoSoloItem_cda674');
		});

		const threeByThreeGridElements = document.querySelectorAll('.threeByThreeGrid_cda674');
		threeByThreeGridElements.forEach(element => {
			if (!element.classList.contains('original-threeByThreeGrid')) {
				addClassToChildren(element, 'oneByTwoSoloItem_cda674');
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
	
		const resizeObserver = new ResizeObserver(entries => {
			const reversedEntries = Array.from(entries).reverse();
			let delay = 0;
	
			reversedEntries.forEach(entry => {
				setTimeout(() => {
					const element = entry.target;
					const nearestGridItem = element.closest('.oneByTwoGridItem_cda674, .oneByTwoGrid_cda674.oneByTwoLayoutThreeGrid_cda674 .oneByTwoSoloItem_cda674, .twoByOneGridItem_cda674, .oneByOneGrid_cda674.oneByOneGridMosaic_cda674, .threeByThreeGrid_cda674 .oneByTwoSoloItem_cda674, .oneByTwoGrid_cda674 .oneByTwoGridItem_cda674');
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
	
		const elementsToObserve = document.querySelectorAll('.clickableWrapper_d4597d, .loadingOverlay_d4597d');
		elementsToObserve.forEach(element => {
			resizeObserver.observe(element);
	
			setTimeout(() => {
				resizeObserver.unobserve(element);
			}, 2000);
		});
	}	

	function centerImageBecauseRegularCSSWillNot() {
		const updateImagePositions = document.querySelectorAll('.imageContainer_cf58b5 .lazyImg_cda674.processed-image.processed-grid-layout:not(.uncompressedImagesCentered)');
		const imagesArray = Array.from(updateImagePositions).reverse();
		let delay = 0;
	
		imagesArray.forEach((image) => {
			setTimeout(() => {
				const container = image.closest('.oneByTwoGridItem_cda674, .oneByTwoGrid_cda674.oneByTwoLayoutThreeGrid_cda674 .oneByTwoSoloItem_cda674, .oneByTwoSoloItem_cda674, .twoByOneGridItem_cda674, .oneByTwoSoloItem_cda674, .oneByOneGrid_cda674.oneByOneGridMosaic_cda674, .oneByTwoGrid_cda674 .oneByTwoGridItem_cda674');
				if (container && image) {
					if (container.matches('.threeByThreeGrid_cda674 .oneByTwoSoloItem_cda674')) {
						container.style.maxHeight = '175px';
						image.classList.add('uncompressedImagesCentered');
					} 
					const containerHeight = container.clientHeight;
					const originalImageHeight = image.clientHeight;
					const scaleFactor = Math.max(1, containerHeight / originalImageHeight);
	
					image.style.transform = `scale(${scaleFactor})`;
					image.style.transformOrigin = 'top';
					image.offsetHeight;
	
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
	
	function centerImageUponWindowResize() {
		const updateImagePositions = document.querySelectorAll('.imageContainer_cf58b5 .lazyImg_cda674.processed-image.processed-grid-layout');
		const imagesArray = Array.from(updateImagePositions).reverse();
		let delay = 0;
	
		imagesArray.forEach((image) => {
			setTimeout(() => {
				const container = image.closest('.oneByTwoGridItem_cda674, .oneByTwoGrid_cda674.oneByTwoLayoutThreeGrid_cda674 .oneByTwoSoloItem_cda674, .oneByTwoSoloItem_cda674, .twoByOneGridItem_cda674, .oneByTwoSoloItem_cda674, .oneByOneGrid_cda674.oneByOneGridMosaic_cda674, .oneByTwoGrid_cda674 .oneByTwoGridItem_cda674');
				if (container && image) {
					if (container.matches('.threeByThreeGrid_cda674 .oneByTwoSoloItem_cda674')) {
						const containerHeight = container.clientHeight;
						const originalImageHeight = image.clientHeight;
						const scaleFactor = Math.max(1, containerHeight / originalImageHeight);
		
						image.style.transform = `scale(${scaleFactor})`;
						image.style.transformOrigin = 'top';
						image.offsetHeight;
		
						const scaledImageHeight = scaleFactor === 1 ? originalImageHeight : originalImageHeight * scaleFactor;
						const translateY = (containerHeight - scaledImageHeight) / 2;
						image.style.transform += ` translateY(${translateY}px)`;
						container.style.maxHeight = '175px';
						image.classList.add('uncompressedImagesCentered');
					} 
					const containerHeight = container.clientHeight;
					const originalImageHeight = image.clientHeight;
					const scaleFactor = Math.max(1, containerHeight / originalImageHeight);
	
					image.style.transform = `scale(${scaleFactor})`;
					image.style.transformOrigin = 'top';
					image.offsetHeight;
	
					const scaledImageHeight = scaleFactor === 1 ? originalImageHeight : originalImageHeight * scaleFactor;
					const translateY = (containerHeight - scaledImageHeight) / 2;
					image.style.transform += ` translateY(${translateY}px)`;
	
					image.classList.add('uncompressedImagesCentered');
					
				}
			}, delay);
			delay += 100;
		});
	}

	function enhanceAvatarQuality() {
		const avatarURLs = document.querySelectorAll(
		'img.avatar_f9f2ca[src^="https://cdn.discordapp.com/avatars"]:not(.processed-avatar), img.avatar_c51b4e[src^="https://cdn.discordapp.com/avatars"]:not(.processed-avatar)'
		);
		avatarURLs.forEach((image) => {
			let newSrc = image.src.replace(/\?size=\d*/, '');
			if (!newSrc.includes('?quality=lossless')) {
				newSrc += '?quality=lossless';
			}
			image.src = newSrc;
			image.classList.add('processed-avatar');
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

	function enhanceIconQuality() {
		const iconURLs = document.querySelectorAll(
		'img.icon__11cf1[src^="https://cdn.discordapp.com/icons/"]:not(.processed-icon)'
		);
		iconURLs.forEach((image) => {
			let newSrc = image.src.replace(/\?size=\d*/, '');
			if (!newSrc.includes('?quality=lossless')) {
				newSrc += '?quality=lossless';
			}
			image.src = newSrc;
			image.classList.add('processed-icon');
		});
	}

	const SELECTOR_IMG_SRC = '.zoomLens_uOK8xV img[src^="https://media.discordapp.net/attachments"]:not(.processed-image), .layerContainer_cd0de5 img[src^="https://media.discordapp.net/attachments"]:not(.processed-image), .imageContainer_cf58b5 img[src^="https://media.discordapp.net/attachments"]:not(.processed-image), .vc-imgzoom-lens img[src^="https://media.discordapp.net/attachments"]:not(.processed-image)';

	function convertMediaToCDN() {
		const mediaURLs = Array.from(document.querySelectorAll(SELECTOR_IMG_SRC)).reverse();
		mediaURLs.forEach((image) => {
			if (!image.classList.contains('gif_bad108') && !image.nextElementSibling?.classList.contains('video_f316dd')) {
				image.src = image.src.replace(
					'https://media.discordapp.net/attachments',
					'https://cdn.discordapp.com/attachments'
				);
				image.classList.add('processed-image');
			}
		});
	}
	

	function replaceURLs() {
		const messages = document.querySelectorAll('.container_b558d0');
			messages.forEach((message) => {
			const images = message.querySelectorAll('.imageDetails_1t6Zms');
				if (images.length === 1) {
					const image = images[0];
					image.style.display = 'inline-table';
					image.style.transform = 'translateX(5px) translateY(-0px)';
					image.style.lineHeight = 'unset';
					
					const parent = image.closest('.imageContent_cf58b5.embedWrapper_b558d0.attachmentContentContainer_e65e75.attachmentContentItem__47a25');
		if (parent) {
			parent.appendChild(image);
		}
		} else if (images.length > 1) {
				images.forEach((image) => {
					image.style.display = 'none';
				});
		}
	});

	let imagesSingle = document.querySelectorAll('.container_b558d0 .lazyImg_cda674.processed-image.processed-single-layout');
	imagesSingle.forEach((image) => {
		image.addEventListener('load', function () {
		const classElement = image.closest('.imageWrapper__178ee.imageZoom__9528e.clickable__2869d.lazyImgContainer_cda674.processed-single-layout');
		if (classElement && image.naturalWidth > image.naturalHeight) {
			classElement.classList.add('auto-width-single');
		}		
		});
	});

	let imagesGrid = document.querySelectorAll('.container_b558d0 .lazyImg_cda674.processed-image.processed-grid-layout');
	imagesGrid.forEach((image) => {
		image.addEventListener('load', function () {
		const classElement = image.closest('.imageWrapper__178ee.imageZoom__9528e.clickable__2869d.lazyImgContainer_cda674.processed-grid-layout');
		if (classElement && image.naturalHeight > image.naturalWidth) {
			classElement.classList.add('auto-width-grid');
		}		
		});
	});
	}

	this.resizeListener = window.addEventListener('resize', debounce(centerImageUponWindowResize, 75));

	function processImageSrc() {
	convertMediaToCDN();
	replaceURLs();
	checkForGridLayout();
	updateGridLayoutClass();
	centerImageBecauseRegularCSSWillNot();
	}

	function callback(mutationsList, observer) {
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
					imagesExternalLinks();
				}
			}
		}
	}

	function checkForGridLayout() {
		const messages = document.querySelectorAll('.container_b558d0');
		messages.forEach((message) => {
			const elements = message.querySelectorAll('.lazyImg_cda674, .imageContainer_cf58b5, .lazyImgContainer_cda674, .imageWrapper__178ee, .imageContent_cf58b5');
			const imageElements = message.querySelectorAll('.lazyImg_cda674');
			if (imageElements.length > 1) {
			elements.forEach((element) => {
				element.classList.remove('processed-single-layout');
				element.classList.add('processed-grid-layout');
			});
			} else if (imageElements.length === 1) {
			elements.forEach((element) => {
				element.classList.remove('processed-grid-layout');
				element.classList.add('processed-single-layout');
			});
			}
		});
		}

	function createUncompressedImagesCSSStyle() {
	const style = document.createElement('style');
	style.textContent = `

		.pointerCover_c49869 {
			z-index: -9999 !important;
		}

		.pointerCover__5c3cc {
			z-index: -9999 !important;
		}
		
		.altText_cf58b5 {
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

		.imageWrapper__178ee.imageZoom__9528e.clickable__2869d.lazyImgContainer_cda674.processed-single-layout {
			
		}
		
		.carouselModal_d2b9a1.zoomedCarouselModalRoot_f74404.root_f9a4c9.fullscreenOnMobile_f9a4c9 {
			display: flex !important;
			justify-content: center !important;
			align-items: center !important;
		}

		.imageWrapper__178ee.imageZoom__9528e.clickable__2869d.lazyImgContainer_cda674.processed-grid-layout {
			display: -webkit-box !important;
		}
		
		.imageContent_cf58b5.embedWrapper_b558d0.attachmentContentContainer_e65e75.attachmentContentItem__47a25.processed-single-layout {
			height: auto !important;
			width: auto !important;
			max-width: 550px !important;		
		}

		.imageWrapper__178ee.embedWrapper_b558d0.lazyImg_cda674.attachmentContentItem__47a25.processed-single-layout {
			
		}

		.imageDetailsAdded_sda9Fa .imageWrapper__178ee {
			height: 100% !important;
		}

		.imageDetails_1t6Zms {
			margin: 0.15rem 0 0rem !important;
		}

		.lazyImg_cda674.processed-image.processed-grid-layout {
			aspect-ratio: unset !important;
			display: grid !important;
			object-fit: cover !important;
		}
		
		.lazyImg_cda674.processed-image.processed-single-layout {

		}	

		.imageWrapper__178ee.imageZoom__9528e.clickable__2869d.lazyImgContainer_cda674.processed-grid-layout {
			max-width: 100% !important;
		}
		
		.imageWrapper__178ee.imageZoom__9528e.clickable__2869d.lazyImgContainer_cda674.processed-single-layout {
			height: 100% !important;
		}
		
		.cursorPointer_B3uwDA {
			transform: translateY(2px) !important;
		}

		.spoilerContent_aa9639.spoilerContainer_aa9639 {
			background-color: rgba(255, 255, 255, 0);
		}

		.loadingOverlay_d4597d {
			aspect-ratio: unset !important;
		}

		.threeByThreeGrid_cda674 .lazyImgContainer_cda674, .threeByThreeGrid_cda674 .lazyImg_cda674 {
			aspect-ratio: unset !important;
		}

		.lazyImg_cda674.processed-image.processed-grid-layout {
			min-height: auto !important;
		}

		.oneByTwoGrid_cda674 .attachmentContentContainer_e65e75, .oneByTwoGrid_cda674 .lazyImg_cda674 {
			height: unset !important;
		}
	`;
	document.head.appendChild(style);
	return style;
	}

	function modifyImageUtilitiesCSSRule() {
		var styleElement = document.getElementById("ImageUtilitiesCSS");

		if (styleElement) {
			var cssText = styleElement.textContent;

			var oldRule = ".imageDetailsAdded_sda9Fa .imageWrapper__178ee {border-radius: 8px !important;height: calc(100% - 1rem - 16px) !important;max-height: unset !important;margin-left: unset !important;}";
			var newRule = ".imageDetailsAdded_sda9Fa .imageWrapper__178ee {border-radius: 8px !important;height: calc(100% - 1rem - 16px);max-height: unset !important;margin-left: unset !important;}";

			cssText = cssText.replace(oldRule, newRule);

			styleElement.textContent = cssText;
		} else {
			// console.error("Uncompressed Images Error: Style element with ID 'ImageUtilitiesCSS' not found.");
		}
	}

	function runMutation() {
		convertMediaToCDN();
		replaceURLs();
		enhanceAvatarQuality();
		enhanceIconQuality();
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

    const threeByThreeGridElements = document.querySelectorAll('.threeByThreeGrid_cda674');
    threeByThreeGridElements.forEach(element => {
        element.classList.remove('threeByThreeGrid_cda674');
        element.classList.add('twoByTwoGrid_cda674');
        element.style.gridTemplateColumns = "";

        removeClassFromChildren(element, 'oneByTwoSoloItem_cda674');
    });

    const elementsWithAdjustedHeight = document.querySelectorAll('.clickableWrapper_d4597d, .loadingOverlay_d4597d');
    elementsWithAdjustedHeight.forEach(element => {
        element.style.height = "100%";
    });

    const centeredImages = document.querySelectorAll('.imageContainer_cf58b5 .lazyImg_cda674.processed-image.processed-grid-layout.uncompressedImagesCentered');
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

	removeLoadEventListener('.container_b558d0 .lazyImg_cda674.processed-image.processed-single-layout');
	removeLoadEventListener('.container_b558d0 .lazyImg_cda674.processed-image.processed-grid-layout');

	const imageDetails = document.querySelectorAll('.messageListItem_d5deea .imageDetails_1t6Zms');
	imageDetails.forEach((image) => {
		if (image) {
			image.style.removeProperty('display');
			image.style.removeProperty('transform');
			image.style.lineHeight = '16px';
			image.style.display = '';
		}
	});

	const imageContainers = document.querySelectorAll('.imageDetails_1t6Zms');
	imageContainers.forEach((element) => {
		if (element) {
			const commonParent = element.closest('.imageContent_cf58b5.embedWrapper_b558d0.attachmentContentContainer_e65e75.attachmentContentItem__47a25');
			const targetParent = commonParent ? commonParent.querySelector('.imageContainer_cf58b5 div') : null;
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
* Version 3.28 of 'Uncompressed Images'.
* Copyright (Boost Software License 1.0) 2023-2024 Knew
* Link to plugin: https://github.com/Knewest/Uncompressed-Discord-Images
* Support server: https://discord.gg/NqqqzajfK4
*
* @changelog {banner} https://cdn.discordapp.com/attachments/753561208073879642/1134847376541106176/output_animation8.webp
* @changelog {blurb} Missed or want to know previous changelogs? Find them [here](https://github.com/Knewest/embed-more-images/releases).
* @changelog {fixed.item} 
* @changelog {added.title} What I changed
* @changelog {added.item}
* @changelog {footer} Need help? Join my the [support server (NqqqzajfK4)](https://discord.gg/NqqqzajfK4).
*/
