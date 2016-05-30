var Appx = Appx || {}

Appx.Audio = function(app){
        var _this = this
        
        this.listener = new THREE.AudioListener();
        app.camera.add( this.listener );

        this.audioLoader = new THREE.AudioLoader();
        this.toggleMute = function(){
        	// debugger
        	var isMuted = _this.listener.getMasterVolume() === 0.0 ? true : false 
        	if( isMuted ){
        		_this.listener.setMasterVolume(1.0)
        	}else{
        		_this.listener.setMasterVolume(0.0)
        	}
        	
        	updateMuteButton()
        }
        
        function updateMuteButton(){
        	var isMuted = _this.listener.getMasterVolume() === 0.0 ? true : false 
        	if( isMuted ){
        		document.querySelector('#unmuteButton').style.display = 'initial'				
        		document.querySelector('#muteButton').style.display = 'none'
        	}else{
        		document.querySelector('#unmuteButton').style.display = 'none'
        		document.querySelector('#muteButton').style.display = 'initial'		
        	}
        }

        _this.listener.setMasterVolume(0.0)	// to start muted
        // listener.setMasterVolume(1.0)	// to start with sound on
        updateMuteButton()
}
