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

Added some keyboard functionality, now you can move the cube around your screen :smile:

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

###Ex 5: Model Cube
*Codepen: http://codepen.io/Nigh7Sh4de/pen/ZYQBmJ note that you cannot see anything since the model isn't referenced correctly. The code DOES work if you download it.*

Paul is now a beautiful Leonardo da Vinci flying machine flying

**Features**
+ Loading model in JSON format

###Ex 6: Flying Cube
*Codepen: http://codepen.io/Nigh7Sh4de/pen/pvgNYP note that you cannot see anything since the model isn't referenced correctly. The code DOES work if you download it.*

Paul the beautiful flying machine now has proper 3D movement and rotation controls and flies through a space skybox

**Features**
+ Nothing in particular :stuck_out_tongue_closed_eyes: (it's more of a cumulative experiment I guess)

###Ex 7: Camera Chase Cube
*Codepen: No Code Pen since each script must be inside of it's own file*

Same as FlyingCube except now you are one with Paul. Or maybe you can think of it as being inside Paul, experiencing an intimate moement as you fly through space. Whichever seems to appeal to you more ;)

**Features**
+ Scripts
+ Referencing other Entities inside scripts
