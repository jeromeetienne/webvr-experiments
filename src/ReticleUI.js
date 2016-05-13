var THREEx = THREEx || {}

/**
 * - possible to make the ReticleDisplay.js elsewhere
 * - thus the logic is separated from the style
 *
 * @class
 */
THREEx.ReticleUI = function(reticle){
	var _this = this;
	
	var texture = new THREE.TextureLoader().load( "images/sprite0.png" );
	var material = new THREE.SpriteMaterial( {
		map: texture, 
		color: 0xffffff, 
		opacity: 0.2,
		depthTest: false
	} );
	var sprite = new THREE.Sprite( material )
	sprite.scale.multiplyScalar(0.5)
	sprite.position.z = -2
	this.object3d = sprite
	
	// make the mesh in front of the camera
	this.update = function(){
		sprite.position.set(0,0,-2)
		camera.updateMatrixWorld(true)
		camera.localToWorld(sprite.position)
	}
	
	reticle.signals.hoverProgress.add(function(progress){
		var angle = progress * Math.PI * 2
		sprite.material.rotation = - angle
	})

	reticle.signals.hoverStart.add(function(progress){
		sprite.material.opacity = 0.6
	})
	reticle.signals.hoverStop.add(function(progress){
		sprite.material.rotation = 0
		sprite.material.opacity = 0.2	
	})
}
