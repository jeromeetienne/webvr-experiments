var THREEx = THREEx || {}

/**
 *
 * @class
 * @param {Appx.Reticle} reticle - the reticle 
 */
THREEx.ReticleUI = function(reticle){
	var _this = this;
	
	
	var texture = new THREE.TextureLoader().load( "../images/sprite0.png" );
	var material = new THREE.SpriteMaterial( {
		map: texture, 
		color: 0xffffff, 
		opacity: 0.1,
		depthTest: false
	});
	var sprite = new THREE.Sprite( material )
	sprite.scale.set(1,1).multiplyScalar(0.5)
	sprite.position.z = -2
	this.object3d = sprite
	
	var tweenOpacity = sprite.material.opacity
	var currentPosition = new THREE.Vector3(0,0,-2)
	var tweenPosition = new THREE.Vector3(0,0,-2)
	
	// make the mesh in front of the camera
	this.update = function(camera){
		// compute current position with tweening
		currentPosition.multiplyScalar(0.85).add(tweenPosition.clone().multiplyScalar(0.15))

		// constant size nomatter the distance from the camera
		var scale = currentPosition.length() * Math.sin(THREE.Math.degToRad(camera.fov/2))
		sprite.scale.set(1,1).multiplyScalar(0.5 * scale)

		// set sprite position in 3d world
		sprite.position.copy(currentPosition)
		camera.updateMatrixWorld(true)
		camera.localToWorld(sprite.position)
		
		// tween opacity material
		sprite.material.opacity = sprite.material.opacity*0.8 + tweenOpacity*0.2
	}
	
	//////////////////////////////////////////////////////////////////////////////
	//              Code Separator
	//////////////////////////////////////////////////////////////////////////////
	
	reticle.signals.hoverProgress.add(function(object3d, progress){
		var angle = progress * Math.PI * 2
		sprite.material.rotation = - angle
	})

	reticle.signals.hoverStart.add(function(object3d){
		tweenOpacity = 0.8
	})
	
	reticle.signals.hoverStop.add(function(){
		sprite.material.rotation = 0
		tweenOpacity = 0.5
	})
	
	reticle.signals.nearingStart.add(function(object3d){
		console.log('nearingStart', object3d.name)
		tweenOpacity = 0.5
		tweenPosition.z = -(object3d.position.length() - object3d.geometry.boundingSphere.radius - 0.1)	
	})
	
	reticle.signals.nearingStop.add(function(){
		console.log('nearingStop')
		tweenOpacity = 0.2
		tweenPosition.z = -2
	})
}
