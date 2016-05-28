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
	}
	
	this.hoverDuration = 0.5;
	var hoverStartedAt = null

	//////////////////////////////////////////////////////////////////////////////
	//		Handle hover/click state automata
	//////////////////////////////////////////////////////////////////////////////
	var mouse = new THREE.Vector2(0,0)
	var raycaster = new THREE.Raycaster();
	this.update = function(objects, camera){
		raycaster.setFromCamera( mouse, camera );

		var intersects = raycaster.intersectObjects( objects );
		var intersecting = intersects.length > 0 ? true : false

		// start hovering if needed
		if( intersecting === true ){
			if( hoverStartedAt === null ){
				hoverStartedAt = Date.now()/1000;
				_this.signals.hoverStart.dispatch()
				_this.signals.hoverProgress.dispatch(0.0)
			}
		}

		// stop hovering if there is no interesection
		if( intersecting === false ){
		 	if( hoverStartedAt !== null ){
				hoverStartedAt = null
				_this.signals.hoverStop.dispatch()
			}
		}

		if( hoverStartedAt !== null ){
			var hoverSince = Date.now()/1000 - hoverStartedAt;

			if( hoverSince >= _this.hoverDuration ){
				hoverStartedAt = null
				_this.signals.hoverProgress.dispatch(1.0)
				_this.signals.hoverStop.dispatch()
				_this.signals.click.dispatch(intersects[0].object)
			}else{
				_this.signals.hoverProgress.dispatch( hoverSince / _this.hoverDuration )				
			}
		}
	}
}
