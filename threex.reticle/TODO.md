- do a double camera to show the focus adaptations
- inRange should be notified to all object in range
- DONE demo effect for inRange should be a border around the image

- fix the inRange algo
  - standardization of the distance
  - notify all object in range
- find a better examples
- better looking reticle ala google vr
  - https://www.youtube.com/watch?v=_YTVsLnK-XU example of reticle
  - simply a canvas with a plane ? and me updating it... this is inefficient from a running pov, but do i have a better solution ?
  - or a wireframe for now.. issue with the Sprite facing camera, especially with stereo


# How to get a better example
- clear, interactive, educational
- what need to be explained
- more tutorials like
- fun and easy to understand

# InRange refactoring
- every object in range should display the inRange feedback
- it should notify simple, enterInRange, leaveInRange
- so it should keep a state for every object (to know if it entered or not)
- aka it should be handle by a different class
  - threex.reticle-rangecheck.js

# reticle with Google VR look
- canvas for a sprite
- redraw the canvas according to parameters
  - same as google vr reticle unity
- inefficient but simple
