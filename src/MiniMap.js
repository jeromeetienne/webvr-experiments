var Appx = Appx || {}


/**
 * handle the MiniMap
 * @class
 * 
 * @param  {Appx.App} app [description]
 */
Appx.MiniMap = function(app){
	var _this = this;
	

	var canvas = document.createElement( 'canvas' );
	canvas.width = canvas.height = 128;
	var texture = new THREE.CanvasTexture( canvas );
	var context = canvas.getContext( '2d' );

	function updateDrawing(){
		// draw a circle
		context.save()
		context.clearRect(0,0, canvas.width, canvas.height)
		context.fillStyle	= "rgba(0,127,0,0.5)";
		context.beginPath();
		context.arc(canvas.width/2, canvas.height/2, canvas.width/2, 0, Math.PI*2, true); 
		context.closePath();
		context.fill();
		context.restore()

		// draw the player
		context.save()
		context.fillStyle	= "rgba(255,255,255,1.0)"			
		context.translate(canvas.width/2, canvas.height/2)
		context.fillRect(-5,-5, 5, 5)
		context.restore()

		// draw each enemy
		var mapRadius		= 10
		app.enemies.forEach(function(enemy){
			var position	= enemy.object3d.position.clone()
			app.camera.updateMatrixWorld(true)
			app.camera.worldToLocal(position)
			var canvasX	= (-position.x / mapRadius) * (0.9*canvas.width/2)
			var canvasY	= (-position.z / mapRadius) * (0.9*canvas.height/2)
			
			context.save()
			context.fillStyle = "rgba(127,127,127,1.0)"			
			context.translate(canvas.width/2, canvas.height/2)
			context.translate(-canvasX, -canvasY)
			context.fillRect(-5,-5, 5, 5)
			context.restore()
		})
		
		// update the texture
		texture.needsUpdate = true;
	}

	// var textureLoader = new THREE.TextureLoader();
	// var texture = textureLoader.load( "images/sprite0.png" );
	var material = new THREE.SpriteMaterial( {
		map: texture, 
		color: 0xffffff, 
		// opacity: 0.2,
		depthTest: false
	} );
	var sprite = new THREE.Sprite( material )
	// scene.add(sprite)
	this.object3d	= sprite
	
	this.update = function(){
		updateDrawing()
		
		
		// compute the plane
		var coplanarPoint = new THREE.Vector3(0,0,-5)
		var normal = new THREE.Vector3(0,0,-1)
		var plane = new THREE.Plane()
		plane.setFromNormalAndCoplanarPoint(normal, coplanarPoint)
		plane.applyMatrix4(app.camera.matrixWorld)
		// compute the ray
		var isStereo = vrDisplay.isPresenting === true ? true : false
		var mouse = new THREE.Vector2(-0.9/(isStereo ? 2 : 1),0.8)
		var raycaster = new THREE.Raycaster()
		raycaster.setFromCamera(mouse, app.camera)
		// compute intersection
		var intersectionPoint = raycaster.ray.intersectPlane(plane)
		console.assert( intersectionPoint !== null )
		sprite.position.copy(intersectionPoint)
	}
}
