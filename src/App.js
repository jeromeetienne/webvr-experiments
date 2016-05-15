var Appx = Appx || {}

Appx.App = function(){
	this.signals = {
		update : new Signals.Signal(),
		enemyKilled : new Signals.Signal(),
	}
}
