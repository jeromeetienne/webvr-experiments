var THREEx = THREEx || {}

/**
 * Provide the logic for a reticle. the display of the reticle in Appx.ReticleUI
 * @class
 */
THREEx.Reticle = function(){
	var _this = this;
	
	this.signals = {
		click : new Signals.Signal(),

		hoverStart : new Signals.Signal(),
		hoverProgress : new Signals.Signal(),
		hoverStop : new Signals.Signal(),

		nearingStart : new Signals.Signal(),
		nearingStop : new Signals.Signal(),
	}

	// parameters and states for hover
	this.hoverDuration = 2;
	var hoverStartedAt = null
	var hoveringObject = null

	// parameters and states for nearing
	this.nearDistance = 0.2
	var nearingObject = null
	var isNearing = false

	//////////////////////////////////////////////////////////////////////////////
	//		Handle hover/click state automata
	//////////////////////////////////////////////////////////////////////////////
	var mouse = new THREE.Vector2(0,0)
	var raycaster = new THREE.Raycaster();
	this.update = function(objects, camera){
		raycaster.setFromCamera( mouse, camera );
		
		manageHoveringAndClick()
		manageNearing()
		return


		function manageHoveringAndClick(){
			var intersects = raycaster.intersectObjects( objects );
			var intersectedObject = intersects.length > 0 ? intersects[0].object : null
			var intersecting = intersects.length > 0 ? true : false

			var wasHovering = hoverStartedAt !== null ? true : false
			if( wasHovering )	console.assert( hoveringObject !== null )
			if( wasHovering )	console.assert( hoverStartedAt !== null )

			// if was hovering, but not on the current intersectedObject. 
			// aka we switch from hovering on a object, directly to hovering on another object
			if( intersecting && wasHovering && hoveringObject !== intersectedObject ){
				// stop hovering on hoveringObject
				_this.signals.hoverProgress.dispatch(hoveringObject, 1.0)
				_this.signals.hoverStop.dispatch()
				wasHovering = false	// to fall thru to 'start hovering on intersectedObject'
			}

			// if we are intersecting, and we were not hovering before
			if( intersecting && wasHovering === false ){
				// start hovering on intersectedObject
				hoveringObject = intersectedObject
				hoverStartedAt = Date.now()/1000;
				_this.signals.hoverStart.dispatch(hoveringObject)
				_this.signals.hoverProgress.dispatch(hoveringObject, 0.0)
			}

			// stop hovering if there is no interesection
			if( intersecting === false && wasHovering ){
				hoveringObject = null
				hoverStartedAt = null
				_this.signals.hoverProgress.dispatch(hoveringObject, 1.0)
				_this.signals.hoverStop.dispatch()
			}			

			// if we arent hovering, we dont need to go further
			if( hoverStartedAt === null )	return
			
			// compute how long we are hovering
			var hoveringAge = Date.now()/1000 - hoverStartedAt;
			// dispatch hoverProgress if hoverDuration isnt over
			if( hoveringAge < _this.hoverDuration ){
				_this.signals.hoverProgress.dispatch( intersectedObject, hoveringAge / _this.hoverDuration )				
				return
			}
			
			// now we are in a click
			
			// stop hovering
			hoveringObject = null
			hoverStartedAt = null
			_this.signals.hoverProgress.dispatch(intersectedObject, 1.0)
			_this.signals.hoverStop.dispatch()
			// dispatch click
			_this.signals.click.dispatch(intersectedObject)
		}

		//////////////////////////////////////////////////////////////////////////////
		//		honor nearing signals
		//		FIXME it should only notify the closest
		//////////////////////////////////////////////////////////////////////////////
		function manageNearing(){
			// find currentNearingObject
			var currentNearingObject = null
			var minDistance = Infinity;
			for(var i = 0; i < objects.length; i++){
				var object = objects[i]
				if( object.geometry === undefined )		continue
				if( object.geometry.boundingSphere === null )	continue
				
				var objectRadius = object.geometry.boundingSphere.radius
				var distance = raycaster.ray.distanceToPoint(object.position)

				if( distance > objectRadius + _this.nearDistance )	continue
				
				if( distance > minDistance )	continue
				
				currentNearingObject = object
				minDistance = distance
			}
			
			var wasNearing = isNearing
			
			if( wasNearing && currentNearingObject && currentNearingObject !== nearingObject ){
				nearingObject = currentNearingObject
				_this.signals.nearingStop.dispatch()
				_this.signals.nearingStart.dispatch(currentNearingObject)				
			}
			
			if( wasNearing === false && currentNearingObject ){
				nearingObject = currentNearingObject
				_this.signals.nearingStart.dispatch(currentNearingObject)
				isNearing = true
			}

			if( wasNearing && currentNearingObject === null ){
				nearingObject = null
				_this.signals.nearingStop.dispatch()
				isNearing = false
			}
		}
	}
}
