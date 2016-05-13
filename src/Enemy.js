var THREEx = THREEx || {}

THREEx.Enemy = (function(){
	var geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
	var material = new THREE.MeshNormalMaterial();
	var monster = new THREE.Mesh(geometry, material);
	
	/**
	 * handle the enemy
	 *
	 * @class
	 */
	return function(){
		var _this = this;
		var velocity = new THREE.Vector3
		var speed = 0.05
		var direction = 0, distance = 1;
		
		
		var mesh = monster.clone()
		this.object3d = mesh
		this.object3d.userData.enemy = this
		
		// add sound
		var sound = new THREE.PositionalAudio( listener );
		mesh.add( sound );
		console.assert(THREEx.Enemy.assets.loaded === true )
		sound.setBuffer( THREEx.Enemy.assets.soundBuffer );
		sound.setLoop(true);
		sound.setVolume(0.2);
		sound.play()
		
		this.setInitialPosition = function(){
			// restart the sound
			sound.stop()
			sound.isPlaying = false
			sound.play()
			
			// direction = THREE.Math.randFloat(0, Math.PI*2)
			// distance = 8 + THREE.Math.randFloatSpread(4)
			direction = 3*Math.PI/2
			distance = 10
			mesh.position.x = distance * Math.cos(direction) 
			mesh.position.z = distance * Math.sin(direction)
			mesh.lookAt(scene.position)
			
			velocity.x = -speed * Math.cos(direction)
			velocity.z = -speed * Math.sin(direction)
		}
		
		var clock = new THREE.Clock
		this.update = function(){
			var deltaAngle = clock.getDelta() * Math.PI
			mesh.rotateX( deltaAngle )
			
			mesh.position.add(velocity)
			
			if( mesh.position.length() < 1 ){
				_this.setInitialPosition()
			}
		}

		//////////////////////////////////////////////////////////////////////////////
		//		Code Separator
		//////////////////////////////////////////////////////////////////////////////

		this.setInitialPosition()
	}
})()


//////////////////////////////////////////////////////////////////////////////
//		Assets system
//////////////////////////////////////////////////////////////////////////////

THREEx.Enemy.assets = {}
THREEx.Enemy.loadAssets = function(app){
	var promise = new Promise(function(resolve){
		audioLoader.load( 'sounds/179142__jaraxe__zombie-yell2.wav', function( buffer ) {			
			THREEx.Enemy.assets.soundBuffer = buffer
			resolve()
		});				
	}).then(function(){
		THREEx.Enemy.assets.loaded = true
	})
	
	return promise
}
