# webvr-experiment
experimenting with webvr. 

Thanks to @borismus and his fantastic work on
[webvr-polyfill](https://github.com/borismus/webvr-polyfill)

### Show, Don't tell
- [demo](http://jeromeetienne.github.io/webvr-experiment/demo.html)
- [boilerplate](http://jeromeetienne.github.io/webvr-experiment/boilerplate.html)


### TODO
- make game.html playable
  - aka able to shoot at enemy, die if enemy touch
  - thor hammer as enemy
  - stop sound when reseting enemy position
  - handle state via Promise
  - minimap
  - make score
- DONE find a good way to position minimap+score 
  - RayCaster to compute the ray from the camera position and mouse position
    - https://github.com/mrdoob/three.js/blob/master/src/core/Raycaster.js
  - Ray.IntersectPlane https://github.com/mrdoob/three.js/blob/master/src/math/Ray.js#L310
  - make a THREE.Plane with .setFromNormalAndCoplanarPoint http://threejs.org/docs/index.html#Reference/Math/Plane
  - normal+coplanarPoint obtained from camera
  - normal (0,0,1) is from camera.worldToLocal
  - coplanarPoint camera.worldToLocal(0,0,cameraToUiDistance)

- pointerlock while on desktop - https://github.com/mrdoob/three.js/blob/master/examples/misc_controls_pointerlock.html
- TODO what is the state automata for player/enemies/game
- game state automata
  - instruction screen -> wait for use to start
  - startGame (loading resource) -> gameStarted()
- THREE.Reticle could be useful in three.js
  - API similar to raycaster
  - signals mouseEnter/mouseLeave/click
- ipad issues
  - cant go fullscreen
  - cant come back from stereo

### Changelog
- added toggle mute function
- added icons with font awesome - not too nice icons - but easy and free
- cloned webvr-polyfill example - https://github.com/borismus/webvr-polyfill
