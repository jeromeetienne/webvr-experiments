var THREEx = THREEx || {}

/**
 * - possible to make the ReticleDisplay.js elsewhere
 * - thus the logic is separated from the style
 *
 * @class
 */
THREEx.Reticle = function(app){
	var _this = this;
	
	this.signals = {
		click : new Signals.Signal()
	}
	
	var hoverDuration = 0.5;
	var hoverStartedAt = null

	//////////////////////////////////////////////////////////////////////////////
	//		init object3d
	//////////////////////////////////////////////////////////////////////////////
	var texture = new THREE.TextureLoader().load( "images/sprite0.png" );
	var material = new THREE.SpriteMaterial( {
		map: texture, 
		color: 0xffffff, 
		opacity: 0.2,
		depthTest: false
	} );
	var reticle = new THREE.Sprite( material )
	reticle.scale.multiplyScalar(0.5)
	reticle.position.z = -2
	this.object3d = reticle
	
	// make the reticle in front of the camera
	app.signals.update.add(function(){
		reticle.position.set(0,0,-2)
		camera.updateMatrixWorld(true)
		camera.localToWorld(reticle.position)
	})
	
	
	//////////////////////////////////////////////////////////////////////////////
	//		Handle hover/click state automata
	//////////////////////////////////////////////////////////////////////////////
	app.signals.update.add(function(){
		var mouse = new THREE.Vector2(0,0)
		// find intersections
		var raycaster = new THREE.Raycaster();
		raycaster.setFromCamera( mouse, camera );
		var intersects = raycaster.intersectObjects( app.enemiesObject3D );
		var intersecting = intersects.length > 0 ? true : false
		var intersectingMesh = intersects.length > 0 ? intersects[0].object : null
		// console.log('intersecting', intersecting)
		
		
		// start hovering if needed
		if( intersecting === true ){
			if( hoverStartedAt === null ){
				hoverStartedAt = Date.now()/1000;
		// console.log('intersecting', intersects[0])
			}
		}

		// stop hovering if needed
		if( intersecting === false ){
		 	if( hoverStartedAt !== null ){
				hoverStartedAt = null
			}
		}

		if( hoverStartedAt !== null ){
			var hoverSince = Date.now()/1000 - hoverStartedAt;
			
			if( hoverSince >= hoverDuration ){
				hoverStartedAt = null
				_this.signals.click.dispatch(intersectingMesh)
			}
		}
		
		
		if( hoverStartedAt !== null ){
			var hoverSince = Date.now()/1000 - hoverStartedAt;
			var angle = - hoverSince/hoverDuration * Math.PI * 2
			reticle.material.rotation = angle
			reticle.material.opacity = 0.6
		}else{
			reticle.material.rotation = 0	
			reticle.material.opacity = 0.2	
		}
	})
}
