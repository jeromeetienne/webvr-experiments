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
	var scoreObject3D = new THREE.Sprite( material )
	scoreObject3D.scale.set(2,1,1).multiplyScalar(0.5)
	// scoreObject3D.position.x = 1
	// scoreObject3D.position.y = 1
	// scoreObject3D.position.z = -2
	
	
	this.object3d = scoreObject3D
	
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

	// make the reticle in front of the camera
	app.signals.update.add(function(){
		var position = scoreObject3D.position
		position.set(1,0,-2)
		camera.updateMatrixWorld(true)
		camera.localToWorld(position)
	})
	
	app.signals.enemyKilled.add(function(){
		score += 1
		updateDrawing()
	})

	// function rePosition(){
	// 	var mouse = new THREE.Vector2(1,1-0.15)
	// 	// find intersections
	// 	var raycaster = new THREE.Raycaster();
	// 	raycaster.setFromCamera( mouse, camera );
	// 	var intersects = raycaster.intersectObject( uiPlaneObject3D );
	// 	console.log(intersects)
	// 	
	// 	if( intersects.length > 0 ){
	// 		scoreObject3D.position.copy(intersects[0].point)
	// 	}
	// }
	// onRenderFcts.push(function(){
	// 	rePosition()
	// })

}
