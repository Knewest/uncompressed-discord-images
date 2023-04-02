# Uncompressed Discord Images Fix:
 <img align="right" img src="https://user-images.githubusercontent.com/94736474/226493486-f1beeff2-8377-4670-a535-180d1c5176c2.png" width="450">
<p>Discord's solution to previewing images is awful so by changing 'media.discordapp.net' 
links to 'cdn.discordapp.com' links, we will no longer have blurry images (especially with JPEG and WebP).

<br><s><sub>Another feature of this plugin is that it makes animated PNGs uploaded to the Discord server playable within the client.</sub></s><br>
<sub>Discord has broken APNG support completely when they addressed the 'aCropalypse' vulnerbility.</sub></p>

This is compatible with BetterDiscord as a plugin and/or can be executed in the console of the client.<br> 


<br><br><br>

## Comparisons:

|**Image format:**|**Before fix:**|**After fix:**| 
|:---:|:---:|:---:|
|**JPEG**|![JPGComparisonLQ1](https://user-images.githubusercontent.com/94736474/224312885-cb26264e-e2d0-404f-ae50-395bf81a54f1.png)|![JPGComparisonHQ1](https://user-images.githubusercontent.com/94736474/224315183-e5e5dc8b-16f7-4072-8fae-45a4ed904a21.png)|
|**JPEG**|![JPGComparisonLQ2](https://user-images.githubusercontent.com/94736474/224315861-7ce2defa-ecaa-47be-8a14-a678aa71cc03.png)|![JPGComparisonHQ2](https://user-images.githubusercontent.com/94736474/224315883-0b9c87fa-7144-4916-ba07-67a0f5dc4c80.png)|
|**WebP**|![WebPComparisonLQ1](https://user-images.githubusercontent.com/94736474/224316202-2410e3c6-8b3d-4784-aea8-7dee2ea36edd.png)|![WebPComparisonHQ1](https://user-images.githubusercontent.com/94736474/224316220-cb74424b-1ee3-4de7-85c4-444fa6703327.png)|
|**WebP**|![WebPComparisonLQ2](https://user-images.githubusercontent.com/94736474/224316543-be26756c-320c-4212-b911-e6caba186644.png)|![WebPComparisonHQ2](https://user-images.githubusercontent.com/94736474/224316584-d61ca0af-5f3e-480b-a357-ffce329267b8.png)|
|**WebP**|![WebPComparisonLQ3](https://user-images.githubusercontent.com/94736474/224316809-f7af7946-d7b7-42ce-a408-8789c9b87a1d.png)|![WebPComparisonHQ3](https://user-images.githubusercontent.com/94736474/224316830-f02e485f-8330-435e-b953-cf527fc4f17c.png)|

<sub>To see the best comparison, open a before/after in a new tab and flip between the two (they are lined up for you).</sub>

<br>

### Final comments:
Something to note with these comparisons is that unless open the image in a browser, you will *never* see the original, uncompressed image; it is *always* a lightly or heavily compressed (depends on the format) version of the original. 

This means that if you click on the image, even though the quality is a bit better, it is still compressed and not what the person sent, this is most prevelant with JPEG and WebP-- hence the examples provided.

Some may ask why PNG was not provided, this is simply because I think it is a neglible difference, as it is the least effected by this problem (but still is). You are welcome to compare for yourself.
