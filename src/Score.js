var Appx = Appx || {}


Appx.Score = function(app){
	var _this = this;

	var score = 0

	var canvas = document.createElement( 'canvas' );
	canvas.width = 256;
	canvas.height = 128;
	var texture = new THREE.CanvasTexture( canvas );
	var context = canvas.getContext( '2d' );

	var material = new THREE.SpriteMaterial( {
		map: texture, 
		color: 0xffffff, 
		depthTest: false
	} );
	var sprite = new THREE.Sprite( material )
	sprite.scale.set(2,1,1)
	
	
	this.object3d = sprite
	
	function updateDrawing(){
		context.save()
		context.clearRect(0,0, canvas.width, canvas.height)
		context.fillStyle = "rgba(255,255,255,0.5)"			
		context.font = "160px monospace";
		var scoreString = score
		context.fillText(scoreString, 10, canvas.height*(1-0.1));
		context.restore()
		
		// update the texture
		texture.needsUpdate = true;
	}
	updateDrawing()

	
	app.signals.enemyKilled.add(function(){
		score += 1
		updateDrawing()
	})
	
	this.resetScore = function(){
		score = 0;
		updateDrawing()
	}

	this.update = function(){
		app.camera.updateMatrixWorld();
		// camera.updateProjectionMatrix();
		// compute the plane
		var coplanarPoint = new THREE.Vector3(0,0,-5)
		var normal = new THREE.Vector3(0,0,-1)
		var plane = new THREE.Plane()
		plane.setFromNormalAndCoplanarPoint(normal, coplanarPoint)
		plane.applyMatrix4(app.camera.matrixWorld)
		// compute the ray
		var isStereo = vrDisplay.isPresenting === true ? true : false
		var mouse = new THREE.Vector2(0.9/(isStereo ? 2 : 1),0.8)
		var raycaster = new THREE.Raycaster()
		raycaster.setFromCamera(mouse, app.camera)
		// compute intersection
		var intersectionPoint = raycaster.ray.intersectPlane(plane)
		console.assert( intersectionPoint !== null )
		sprite.position.copy(intersectionPoint)
	}

}
