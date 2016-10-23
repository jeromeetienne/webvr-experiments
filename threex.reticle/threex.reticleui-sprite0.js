var THREEx = THREEx || {}

/**
 *
 * @class
 * @param {Appx.Reticle} reticle - the reticle 
 */
THREEx.ReticleUI = function(reticle){
	var _this = this;
	
	
	var texture = new THREE.TextureLoader().load( THREEx.ReticleUI.baseURL+"images/sprite0.png" );
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
	
	var targetOpacity = sprite.material.opacity
	var currentPosition = new THREE.Vector3(0,0,-2)
	var targetPosition = new THREE.Vector3(0,0,-2)
	
	// make the mesh in front of the camera
	this.update = function(camera){
		// compute current position with tweening
		var tweenStrengh = 0.15
		currentPosition.multiplyScalar(1-tweenStrengh).add(targetPosition.clone().multiplyScalar(tweenStrengh))

		// constant size nomatter the distance from the camera - to avoid focus issue
		var scale = currentPosition.length() * Math.sin(THREE.Math.degToRad(camera.fov/2))
		sprite.scale.set(1,1).multiplyScalar(0.5 * scale)

		// set sprite position in 3d world
		sprite.position.copy(currentPosition)
		camera.updateMatrixWorld(true)
		camera.localToWorld(sprite.position)
		
		// tween opacity material
		var tweenStrengh = 0.2
		sprite.material.opacity = sprite.material.opacity*(1-tweenStrengh)+ targetOpacity*tweenStrengh
	}
	
	//////////////////////////////////////////////////////////////////////////////
	//              Handle reticle signals
	//////////////////////////////////////////////////////////////////////////////
	
	reticle.signals.hoverProgress.add(function(object3d, progress){
		var angle = progress * Math.PI * 2
		sprite.material.rotation = - angle
	})

	reticle.signals.hoverStart.add(function(object3d){
		targetOpacity = 0.8
	})
	
	reticle.signals.hoverStop.add(function(){
		sprite.material.rotation = 0
		targetOpacity = 0.5
	})
	
	reticle.signals.inRangeStart.add(function(object3d){
		targetOpacity = 0.5
		targetPosition.z = -(object3d.position.length() - object3d.geometry.boundingSphere.radius - 0.1)	
	})
	
	reticle.signals.inRangeStop.add(function(){
		targetOpacity = 0.2
		targetPosition.z = -2
	})
}

THREEx.ReticleUI.baseURL = '../'
