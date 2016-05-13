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
	sprite.scale.multiplyScalar(0.5)
	sprite.position.x = -1
	sprite.position.z = -2
	// scene.add(sprite)
	this.object3d	= sprite
	
	this.update = function(){
		updateDrawing()
		
		// make the reticle in front of the app.camera
		var position = sprite.position
		position.set(-1,0,-2)
		app.camera.updateMatrixWorld(true)
		app.camera.localToWorld(position)
	}
}
