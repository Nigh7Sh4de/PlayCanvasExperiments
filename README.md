PlayCanvasExperiments
=====================

Just some small experiments with the PlayCanvas graphics engine 

###Ex 1: Spinning Cube
*Codepen: http://codepen.io/Nigh7Sh4de/pen/vEYzeP*

Fairly standard first thing to do in a 3D gaming change, it's a cube and it will rotate FOREVER

**Features**
+ Model - Type: Cube
+ Basic (Solid Color) Material
+ Camera
+ Directional Light
+ Rotation

###Ex 2: Moving Cube
*Codepen: http://codepen.io/Nigh7Sh4de/pen/PwodOY*

Added some keyboard functionality, now you can move the cube around your screen :D

**Features**
+ Keyboard Interactivity
+ Translation


###Ex 3: Travelling Cube
*Codepen: http://codepen.io/Nigh7Sh4de/pen/MYWqvm*

Added a textured floor for our cube (which I have now named Paul [in loving memory of the naggy lama from the YouTube mini-series, Lamas With Hats]) and the WASD keys will now move Paul in the X-Z plane (basically it can't jump up and down).

**Features**
+ Multiple entities with model::box components
+ Skybox


###Ex 4: Forward Cube
*Codepen: http://codepen.io/Nigh7Sh4de/pen/GgRPPR*

Added a skybox and the A/D keys will now rotate Paul (which is now a cone) and E/Q will pivot. This way, the W and S keys can now move Paul subjectively forward and backward.

**Features**
+ Cross origin image loading (not visible in the CodePen AND you HAVE TO use HTTP:// you cannot use file:/// even if the image is in the SAME directory as your other stuff)
+ Local translation and rotation (subjective to current orientation of Entity)

