var Appx = Appx || {}

Appx.App = function(){
	var _this = this
	
	this.signals = {
		update : new Signals.Signal(),
		enemyKilled : new Signals.Signal(),
		
		stateChange : new Signals.Signal(),
	}
	
	this.state = 'instructionScreen'
	
	this.gotoState = function(newState){
		var oldState = _this.state
		if( newState === 'playing' ){
			console.assert(_this.state === 'instructionScreen')
			_this.state = newState
		}else console.assert(false)

		_this.signals.stateChange.dispatch(newState, oldState)
	}
}
