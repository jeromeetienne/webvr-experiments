var Appx = Appx || {}

/**
 * Provide the logic for a reticle. the display of the reticle in Appx.ReticleUI
 * @class
 */
Appx.Reticle = function(){
	var _this = this;
	
	this.signals = {
		click : new Signals.Signal(),
		hoverStart : new Signals.Signal(),
		hoverProgress : new Signals.Signal(),
		hoverStop : new Signals.Signal(),

		nearingStart : new Signals.Signal(),
		nearingStop : new Signals.Signal(),
	}
	this.near = 0.2
	this.hoverDuration = 0.5;
	var hoverStartedAt = null
	var isNearing = false

	//////////////////////////////////////////////////////////////////////////////
	//		Handle hover/click state automata
	//////////////////////////////////////////////////////////////////////////////
	var mouse = new THREE.Vector2(0,0)
	var raycaster = new THREE.Raycaster();
	this.update = function(objects, camera){
		raycaster.setFromCamera( mouse, camera );
		
		var intersects = raycaster.intersectObjects( objects );
		var object3d = intersects.length > 0 ? intersects[0].object : null
		var intersecting = intersects.length > 0 ? true : false

		// start hovering if needed
		if( intersecting === true ){
			if( hoverStartedAt === null ){
				hoverStartedAt = Date.now()/1000;
				_this.signals.hoverStart.dispatch(object3d)
				_this.signals.hoverProgress.dispatch(object3d, 0.0)
			}
		}

		// stop hovering if there is no interesection
		if( intersecting === false ){
		 	if( hoverStartedAt !== null ){
				hoverStartedAt = null
				_this.signals.hoverStop.dispatch(object3d)
			}
		}

		if( hoverStartedAt !== null ){
			var hoverSince = Date.now()/1000 - hoverStartedAt;

			if( hoverSince >= _this.hoverDuration ){
				hoverStartedAt = null
				_this.signals.hoverProgress.dispatch(object3d, 1.0)
				_this.signals.hoverStop.dispatch(object3d)
				_this.signals.click.dispatch(object3d)
			}else{
				_this.signals.hoverProgress.dispatch( object3d, hoverSince / _this.hoverDuration )				
			}
		}

		//////////////////////////////////////////////////////////////////////////////
		//		honor nearing signals
		//		FIXME it should only notify the closest
		//////////////////////////////////////////////////////////////////////////////
		objects.forEach(function(object){
			if( object.geometry === undefined )		return
			if( object.geometry.boundingSphere === null )	return
			
			var objectRadius = object.geometry.boundingSphere.radius
			var distance = raycaster.ray.distanceToPoint(object.position)

			var wasNearing = isNearing

			if( distance < objectRadius + _this.near ){
				isNearing = true
				if( wasNearing === false ){
					_this.signals.nearingStart.dispatch(object)
				}
			}else{
				isNearing = false
				if( wasNearing === true ){
					_this.signals.nearingStop.dispatch(object)
				}
			}
			// return true
		})
	}
}
