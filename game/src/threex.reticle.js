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
	this.near = 0.2
	this.hoverDuration = 2;
	var hoverStartedAt = null
	var hoveringObject = null
	var isNearing = false

	//////////////////////////////////////////////////////////////////////////////
	//		Handle hover/click state automata
	//////////////////////////////////////////////////////////////////////////////
	var mouse = new THREE.Vector2(0,0)
	var raycaster = new THREE.Raycaster();
	this.update = function(objects, camera){
		raycaster.setFromCamera( mouse, camera );
		
		var intersects = raycaster.intersectObjects( objects );
		var intersectedObject = intersects.length > 0 ? intersects[0].object : null
		var intersecting = intersects.length > 0 ? true : false

		var wasHovering = hoverStartedAt !== null ? true : false
		if( wasHovering )	console.assert( hoveringObject !== null )
		if( wasHovering )	console.assert( hoverStartedAt !== null )

		handleHovering()
		handleClick()

		function handleHovering(){
			// if was hovering, but not on the current intersectedObject. 
			// aka we switch from hovering on a object, directly to hovering on another object
			if( intersecting && wasHovering && hoveringObject !== intersectedObject ){
				// stop hovering on hoveringObject
				_this.signals.hoverProgress.dispatch(hoveringObject, 1.0)
				_this.signals.hoverStop.dispatch()
				wasHovering = false
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
		}
		function handleClick(){
			// if we arent hovering, we can't be in click
			if( hoverStartedAt === null )	return
			
			// compute how long we are hovering
			var hoveringAge = Date.now()/1000 - hoverStartedAt;
			// dispatch hoverProgress if 
			if( hoveringAge < _this.hoverDuration ){
				_this.signals.hoverProgress.dispatch( intersectedObject, hoveringAge / _this.hoverDuration )				
				return
			}
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
		objects.forEach(function(object){
			if( object.geometry === undefined )		return
			if( object.geometry.boundingSphere === null )	return
			
			var objectRadius = object.geometry.boundingSphere.radius
			var distance = raycaster.ray.distanceToPoint(object.position)

			var wasNearing = isNearing
			if( distance < objectRadius + _this.near ){
				isNearing = true
				if( wasNearing === false )	_this.signals.nearingStart.dispatch(object)
			}else{
				isNearing = false
				if( wasNearing === true )	_this.signals.nearingStop.dispatch()
			}
		})
	}
}
