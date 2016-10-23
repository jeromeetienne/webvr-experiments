var THREEx = THREEx || {}

/**
 *
 * @class
 * @param {Appx.Reticle} reticle - the reticle 
 */
THREEx.ReticleUI = function(reticle){
	var _this = this;

    	var group = new THREE.Group
	
	group.scale.multiplyScalar(0.2)
	this.object3d = group
	
	// Create a spherical reticle.
	var geometry = new THREE.SphereGeometry(0.04, 32, 32);
	var material = new THREE.MeshBasicMaterial({
		color: 0xffffff,
		transparent: true,
		opacity: 0.9
	});
	var mesh = new THREE.Mesh(geometry, material);
    	group.add(mesh)
	// Create a spherical reticle.
	var geometry = new THREE.SphereGeometry(0.08, 32, 32);
	var material = new THREE.MeshBasicMaterial({
		color: 0x333333,
		transparent: true,
		opacity: 0.3
	});
	var mesh = new THREE.Mesh(geometry, material);
    	group.add(mesh)
	
	// make the mesh in front of the camera
	this.update = function(camera){
		// compute current position with tweening
		// var tweenStrengh = 0.15
		// currentPosition.multiplyScalar(1-tweenStrengh).add(tweenPosition.clone().multiplyScalar(tweenStrengh))

		// set sprite position in 3d world
		group.position.copy(new THREE.Vector3(0,0,-1))
		camera.updateMatrixWorld(true)
		camera.localToWorld(group.position)
		
		// console.log(group.position)
	}
	
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
}

THREEx.ReticleUI.baseURL = '../'
