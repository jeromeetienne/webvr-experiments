var Appx = Appx || {}


Appx.TargetLocator = function(app){
	var _this = this;

	var texture = new THREE.TextureLoader().load( THREEx.ReticleUI.baseURL+"images/sprite0.png" );
	var material = new THREE.SpriteMaterial({
		map: texture, 
		color: 0xffffff, 
		depthTest: false
	})
	var sprite = new THREE.Sprite( material )
	
	this.object3d = sprite
	
	this.update = function(targetObject3d){
		updateTargetLocation(targetObject3d)

		updateSpritePosition(app.camera)		
	}
	return

	function updateTargetLocation(targetObject3d){
		// compute the near camera plane as THREE.Plane
		var coplanarPoint = new THREE.Vector3(0,0,app.camera.near)
		var normal = new THREE.Vector3(0,0,-1)
		var plane = new THREE.Plane()
		plane.setFromNormalAndCoplanarPoint(normal, coplanarPoint)

		// compute targetObject3d position in camera coordinate
		var position = targetObject3d.position.clone()
		position.applyMatrix4(app.camera.matrixWorldInverse)

		// project targetObject3d on near camera plane
		var projectedPoint = plane.projectPoint(position)
		// console.log(projectedPoint)

		// compute the angle toward the target from the center of the camera plane
		var angle = Math.atan2(projectedPoint.y, projectedPoint.x)
		angle -= Math.PI/2
		
		// set the sprite to this angle
		sprite.material.rotation = angle
	}
	
	function updateSpritePosition(camera){
		camera.updateMatrixWorld();
		// camera.updateProjectionMatrix();
		// compute the plane
		var coplanarPoint = new THREE.Vector3(0,0,-5)
		var normal = new THREE.Vector3(0,0,-1)
		var plane = new THREE.Plane()
		plane.setFromNormalAndCoplanarPoint(normal, coplanarPoint)
		plane.applyMatrix4(camera.matrixWorld)
		// compute the ray
		var isStereo = vrDisplay.isPresenting === true ? true : false
		var mouse = new THREE.Vector2(0/(isStereo ? 2 : 1),0.8)
		var raycaster = new THREE.Raycaster()
		raycaster.setFromCamera(mouse, camera)
		// compute intersection
		var intersectionPoint = raycaster.ray.intersectPlane(plane)
		console.assert( intersectionPoint !== null )
		sprite.position.copy(intersectionPoint)		
	}

}
