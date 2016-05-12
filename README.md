# webvr-experiment
experimenting with webvr. 

Thanks to @borismus and his fantastic work on
[webvr-polyfill](https://github.com/borismus/webvr-polyfill)

### Show, Don't tell
- [demo](http://jeromeetienne.github.io/webvr-experiment/demo.html)
- [boilerplate](http://jeromeetienne.github.io/webvr-experiment/boilerplate.html)


### TODO
- BUG switch to google cardboard doesn't work on my demo, but work on webvr-polyfill
  - it was a bug in VREffect.js three.js r76 on github. npm version and dev branch got it right
- make game.html playable
  - aka able to shoot at enemy, die if enemy touch
  - thor hammer as enemy
  - stop sound when reseting enemy position
  - handle state via Promise
  - minimap
  - make score
- TODO find a good way to position minimap+score
- pointerlock while on desktop - https://github.com/mrdoob/three.js/blob/master/examples/misc_controls_pointerlock.html
- TODO what is the state automata for player/enemies/game
- game state automata
  - instruction screen -> wait for use to start
  - startGame (loading resource) -> gameStarted()
  - 

### Changelog
- added toggle mute function
- added icons with font awesome - not too nice icons - but easy and free
- cloned webvr-polyfill example - https://github.com/borismus/webvr-polyfill
