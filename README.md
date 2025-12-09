# 'Uncompressed Images' V4 by Knewest:
<img align="right" src="https://betterdiscord.app/resources/thumbnails/1284.png" width="450"> 

### What is it?:
This version hijacks the client cache & alters the low quality thumbnail image shown by default to the lossless version that was uploaded. V4 boasts a completely new approach that performs more similarly to native Discord, unlike V1-V3, which all infamously lagged due to excessive DOM manipulation. This version is a lot more compatible with themes, and other plugins. Primarily due to the lack of DOM manipulation (miricale I figured that out).<br>
<a href="https://github.com/Knewest/uncompressed-discord-images/releases"><img src="https://cdn.discordapp.com/attachments/753561208073879642/1110739988712271873/DownloadButtonFromGithub.webp" alt="Release Log" style="cursor:pointer;"/></a>
<a href="https://betterdiscord.app/Download?id=936"><img src="https://cdn.discordapp.com/attachments/753561208073879642/1110738604780691616/DownloadButtonLatestVersion.webp" alt="Latest Version" style="cursor:pointer;"/></a>
<a href="https://github.com/Knewest/uncompressed-discord-images/blob/main/UncompressedImagesUserScript.js"><img src="https://cdn.discordapp.com/attachments/753561208073879642/1110742637771772024/ClickToUseConsoleVersionButton.webp" alt="UserScript Version" style="cursor:pointer;"/></a>
<a href="https://discord.gg/NqqqzajfK4"><img src="https://cdn.discordapp.com/attachments/753561208073879642/1110742637771772024/ClickToUseConsoleVersionButton.webp" alt="Discord Server" style="cursor:pointer;"/></a>
<br>
<br>
## Comparisons:
|<sub>**Format:**</sub>|**Default:**|**Plugin:**| 
|:---:|:---:|:---:|
|**WebP**|![WebPComparisonLQ3](https://user-images.githubusercontent.com/94736474/224316809-f7af7946-d7b7-42ce-a408-8789c9b87a1d.png)|![WebPComparisonHQ3](https://user-images.githubusercontent.com/94736474/224316830-f02e485f-8330-435e-b953-cf527fc4f17c.png)|
|**PNG**|![PNGComparisonLQ1](https://cdn.discordapp.com/attachments/753561208073879642/1101597065953431652/wVUDsCCrsD_LQ_PNG.webp)|![PNGComparisonHQ1](https://cdn.discordapp.com/attachments/753561208073879642/1101597074463674449/wVUDsCCrsD_HQ_PNG.webp)|
|**JPEG**|![JPGComparisonLQ1](https://user-images.githubusercontent.com/94736474/224312885-cb26264e-e2d0-404f-ae50-395bf81a54f1.png)|![JPGComparisonHQ1](https://user-images.githubusercontent.com/94736474/224315183-e5e5dc8b-16f7-4072-8fae-45a4ed904a21.png)|
|**JPEG**|![JPGComparisonLQ2](https://user-images.githubusercontent.com/94736474/224315861-7ce2defa-ecaa-47be-8a14-a678aa71cc03.png)|![JPGComparisonHQ2](https://user-images.githubusercontent.com/94736474/224315883-0b9c87fa-7144-4916-ba07-67a0f5dc4c80.png)|
|**WebP**|![WebPComparisonLQ1](https://user-images.githubusercontent.com/94736474/224316202-2410e3c6-8b3d-4784-aea8-7dee2ea36edd.png)|![WebPComparisonHQ1](https://user-images.githubusercontent.com/94736474/224316220-cb74424b-1ee3-4de7-85c4-444fa6703327.png)|
|**WebP**|![WebPComparisonLQ2](https://user-images.githubusercontent.com/94736474/224316543-be26756c-320c-4212-b911-e6caba186644.png)|![WebPComparisonHQ2](https://user-images.githubusercontent.com/94736474/224316584-d61ca0af-5f3e-480b-a357-ffce329267b8.png)|

<sub>To see the best comparison, open a before/after in a new tab and flip between the two (they are lined up for you).</sub><br><br>

## Information:
Discord is _not_ consistent with how it embeds content on the platform. When dictating how to handle an image, it will look at the header encoded in the image, so there is no real way to trick the thumbnailer into providing a higher quality output globally. However, we can dicate how it will handle our images for others without the plugin by using different image codecs.
### PNG:
- It's lossless (in most cases), but because of the file size, it takes longer to send. 
- Worth noting that APNG data is stripped from all uploaded PNGs (search 'aCropalypse').
- Near instant hardware encoding.
- The thumbnail is acceptable quality, but is resized. Pixel data is lost like this. Pure scaling is more accurate.
- Data retention score: ⭐⭐⭐
### JPEG 1:
- Just don't use it. It has a "good" file size only if you destroy the quality, & has no lossless option.
- Near instant hardware encoding.
- The thumbnail looks blurry it alters colour information.
- Data retention score: ⭐
### WebP:
- It supports lossless, & even ICC profiles. Limited to 8-BPC.
- Smaller file size than PNG, despite the identical rendered output.
- Slow software encoding speed, but it's not very notable. I never need to wait for it.
- The thumbnail suffers from the same issues as JPEG 1, but WebP has a better compression algorithm.
- `-mt -lossless -q 100 -z 7 %input -o %output`
- Data retention score: ⭐⭐
### AVIF:
- Supports lossless, ICC profiles, & up to 12-BPC.
- Smaller file size than PNG, despite the identical rendered output. Particularly when tiling.
- Lossless file sizes are notably higher than WebP lossless. Still better than PNG.
- Slower software encoding speeds. I often need to wait for it with +2K resolution images.
- The thumbnails are rendered identically to the lossless ones. Not sure why Discord chooses to not process AVIF images at all.
- `--lossless --depth 8 --yuv 444 --range full --jobs 14 --speed 5 --grid 2x4 "$input" "$output"`
- Data retention score: ⭐⭐⭐⭐⭐
## Installation:
### BetterDiscord:
- [ ` WINDOWS KEY ` + ` R ` ] on your keyboard.
- Enter `%USERPROFIEL%\AppData\Roaming\BetterDiscord\plugins` & press 'OK'.
- Drop `UncomrpessedImages.pluging.js` into it.<br><br>

### UserScript:
- You're likely already an advanced user, & instructions aren't streamlined.
- Just be sure to use `UncompressedImagesUserScript.js`.
- I recommend using a network based UserScript. 'AdGuard' makes it pretty easy with their 'Extensions' feature.<br><br>

### Notes:
- Currently, V4.0 only processes embedded images. It will have togglable settings, the ability to process things such as avatars, banners, & other assets, along with the option to have a compact grid lay-out in V4.1.
- Meow, meow, meow, meow.<br>

### Links
- [GitHub Releases](https://github.com/Knewest/uncompressed-discord-images/releases)
- [BetterDiscord Plugin](https://betterdiscord.app/Download?id=936)
- [UserScript Version](https://github.com/Knewest/uncompressed-discord-images/blob/main/UncompressedImagesUserScript.js)
- [Support Server](https://discord.gg/NqqqzajfK4)
