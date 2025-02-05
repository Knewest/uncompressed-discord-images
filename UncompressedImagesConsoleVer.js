// ==UserScript==
// @name        Uncompressed Images
// @namespace   Uncompressed Images
// @match       https://www.discord.com/*
// @grant       none
// @version     3.30
// @author      @Knewest on Github
// @source https://github.com/Knewest/uncompressed-discord-images
// ==/UserScript==

	function debounce(func, wait) {
		let timeout;
		return function(...args) {
			const context = this;
			clearTimeout(timeout);
			timeout = setTimeout(() => func.apply(context, args), wait);
		};
	}

	const config = {
		attributes: true,
		childList: true,
		subtree: true,
		attributeFilter: ['src'],
	};

	const localObserver = new MutationObserver(callback);

	function updateGridLayoutClass() {
		const twoByTwoGridElements = document.querySelectorAll('.twoByTwoGrid_f4758a');
		twoByTwoGridElements.forEach(element => {
			element.classList.remove('twoByTwoGrid_f4758a');
			element.classList.add('threeByThreeGrid_f4758a');
			element.style.gridTemplateColumns = "repeat(2, 1fr)";

			addClassToChildren(element, 'oneByTwoSoloItem_f4758a');
		});

		const threeByThreeGridElements = document.querySelectorAll('.threeByThreeGrid_f4758a');
		threeByThreeGridElements.forEach(element => {
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
	
		const resizeObserver = new ResizeObserver(entries => {
			const reversedEntries = Array.from(entries).reverse();
			let delay = 0;
	
			reversedEntries.forEach(entry => {
				setTimeout(() => {
					const element = entry.target;
					const nearestGridItem = element.closest('.oneByTwoGridItem_f4758a, .oneByTwoGrid_f4758a.oneByTwoLayoutThreeGrid_f4758a .oneByTwoSoloItem_f4758a, .twoByOneGridItem_f4758a, .oneByOneGrid_f4758a.oneByOneGridMosaic_f4758a, .threeByThreeGrid_f4758a .oneByTwoSoloItem_f4758a, .oneByTwoGrid_f4758a .oneByTwoGridItem_f4758a');
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
		elementsToObserve.forEach(element => {
			resizeObserver.observe(element);
	
			setTimeout(() => {
				resizeObserver.unobserve(element);
			}, 2000);
		});
	}	

	function centerImageBecauseRegularCSSWillNot() {
		const updateImagePositions = document.querySelectorAll('.imageContainer__0f481 .lazyImg_f4758a.processed-image.processed-grid-layout:not(.uncompressedImagesCentered)');
		const imagesArray = Array.from(updateImagePositions).reverse();
		let delay = 0;
	
		imagesArray.forEach((image) => {
			setTimeout(() => {
				const container = image.closest('.oneByTwoGridItem_f4758a, .oneByTwoGrid_f4758a.oneByTwoLayoutThreeGrid_f4758a .oneByTwoSoloItem_f4758a, .oneByTwoSoloItem_f4758a, .twoByOneGridItem_f4758a, .oneByTwoSoloItem_f4758a, .oneByOneGrid_f4758a.oneByOneGridMosaic_f4758a, .oneByTwoGrid_f4758a .oneByTwoGridItem_f4758a');
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
		const updateImagePositions = document.querySelectorAll('.imageContainer__0f481 .lazyImg_f4758a.processed-image.processed-grid-layout');
		const imagesArray = Array.from(updateImagePositions).reverse();
		let delay = 0;
	
		imagesArray.forEach((image) => {
			setTimeout(() => {
				const container = image.closest('.oneByTwoGridItem_f4758a, .oneByTwoGrid_f4758a.oneByTwoLayoutThreeGrid_f4758a .oneByTwoSoloItem_f4758a, .oneByTwoSoloItem_f4758a, .twoByOneGridItem_f4758a, .oneByTwoSoloItem_f4758a, .oneByOneGrid_f4758a.oneByOneGridMosaic_f4758a, .oneByTwoGrid_f4758a .oneByTwoGridItem_f4758a');
				if (container && image) {
					if (container.matches('.threeByThreeGrid_f4758a .oneByTwoSoloItem_f4758a')) {
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
		'img.avatar_c19a55[src^="https://cdn.discordapp.com/avatars"]:not(.processed-avatar), img.avatar__44b0c[src^="https://cdn.discordapp.com/avatars"]:not(.processed-avatar)'
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

	const SELECTOR_IMG_SRC = '.zoomLens_uOK8xV img[src^="https://media.discordapp.net/attachments"]:not(.processed-image), .layerContainer_da8173 img[src^="https://media.discordapp.net/attachments"]:not(.processed-image), .imageContainer__0f481 img[src^="https://media.discordapp.net/attachments"]:not(.processed-image), .vc-imgzoom-lens img[src^="https://media.discordapp.net/attachments"]:not(.processed-image)';

	function convertMediaToCDN() {
		const mediaURLs = Array.from(document.querySelectorAll(SELECTOR_IMG_SRC)).reverse();
		mediaURLs.forEach((image) => {
			if (!image.classList.contains('gif__2dc39') && !image.nextElementSibling?.classList.contains('video_f316dd')) {
				image.src = image.src.replace(
					'https://media.discordapp.net/attachments',
					'https://cdn.discordapp.com/attachments'
				);
				image.classList.add('processed-image');
			}
		});
	}
	

	function replaceURLs() {
		const messages = document.querySelectorAll('.container_b7e1cb');
			messages.forEach((message) => {
			const images = message.querySelectorAll('.imageDetails_1t6Zms');
				if (images.length === 1) {
					const image = images[0];
					image.style.display = 'inline-table';
					image.style.transform = 'translateX(5px) translateY(-0px)';
					image.style.lineHeight = 'unset';
					
					const parent = image.closest('.imageContent__0f481.embedWrapper_b7e1cb.attachmentContentContainer_e65e75.attachmentContentItem__47a25');
		if (parent) {
			parent.appendChild(image);
		}
		} else if (images.length > 1) {
				images.forEach((image) => {
					image.style.display = 'none';
				});
		}
	});

	let imagesSingle = document.querySelectorAll('.container_b7e1cb .lazyImg_f4758a.processed-image.processed-single-layout');
	imagesSingle.forEach((image) => {
		image.addEventListener('load', function () {
		const classElement = image.closest('.imageWrapper__178ee.imageZoom__9528e.clickable__2869d.lazyImgContainer_f4758a.processed-single-layout');
		if (classElement && image.naturalWidth > image.naturalHeight) {
			classElement.classList.add('auto-width-single');
		}		
		});
	});

	let imagesGrid = document.querySelectorAll('.container_b7e1cb .lazyImg_f4758a.processed-image.processed-grid-layout');
	imagesGrid.forEach((image) => {
		image.addEventListener('load', function () {
		const classElement = image.closest('.imageWrapper__178ee.imageZoom__9528e.clickable__2869d.lazyImgContainer_f4758a.processed-grid-layout');
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
		const messages = document.querySelectorAll('.container_b7e1cb');
		messages.forEach((message) => {
			const elements = message.querySelectorAll('.lazyImg_f4758a, .imageContainer__0f481, .lazyImgContainer_f4758a, .imageWrapper__178ee, .imageContent__0f481');
			const imageElements = message.querySelectorAll('.lazyImg_f4758a');
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

		.imageWrapper__178ee.imageZoom__9528e.clickable__2869d.lazyImgContainer_f4758a.processed-single-layout {
			
		}
		
		.carouselModal_d2b9a1.zoomedCarouselModalRoot_f74404.root__49fc1.fullscreenOnMobile__49fc1 {
			display: flex !important;
			justify-content: center !important;
			align-items: center !important;
		}

		.imageWrapper__178ee.imageZoom__9528e.clickable__2869d.lazyImgContainer_f4758a.processed-grid-layout {
			display: -webkit-box !important;
		}
		
		.imageContent__0f481.embedWrapper_b7e1cb.attachmentContentContainer_e65e75.attachmentContentItem__47a25.processed-single-layout {
			height: auto !important;
			width: auto !important;
			max-width: 550px !important;		
		}

		.imageWrapper__178ee.embedWrapper_b7e1cb.lazyImg_f4758a.attachmentContentItem__47a25.processed-single-layout {
			
		}

		.imageDetailsAdded_sda9Fa .imageWrapper__178ee {
			height: 100% !important;
		}

		.imageDetails_1t6Zms {
			margin: 0.15rem 0 0rem !important;
		}

		.lazyImg_f4758a.processed-image.processed-grid-layout {
			aspect-ratio: unset !important;
			display: grid !important;
			object-fit: cover !important;
		}
		
		.lazyImg_f4758a.processed-image.processed-single-layout {

		}	

		.imageWrapper__178ee.imageZoom__9528e.clickable__2869d.lazyImgContainer_f4758a.processed-grid-layout {
			max-width: 100% !important;
		}
		
		.imageWrapper__178ee.imageZoom__9528e.clickable__2869d.lazyImgContainer_f4758a.processed-single-layout {
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

		.oneByTwoGrid_f4758a .attachmentContentContainer_e65e75, .oneByTwoGrid_f4758a .lazyImg_f4758a {
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
* Copyright (Boost Software License 1.0) 2023-2025 Knew
* Support server: https://discord.gg/NqqqzajfK4
*/
