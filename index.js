import Peer from 'peerjs'

window.onload = function () {
  const webcam = document.getElementById("webcam");
  const myid = document.getElementById("myid");
  const callNow = document.getElementById("callNow");
 

  const peer = new Peer({
      host : "teqween-webrtc.herokuapp.com",
      secure: true,
      config : {
        iceServers: [
            { url: 'stun:stun.l.google.com:19302' },
            { url: 'turn:numb.viagenie.ca',username : "yagoubi.aek.2@gmail.com", credential: "yagoubi10" }
          ] 
      }
  });

  peer.on('open', (id)=>{

    myid.innerHTML = id
  })

  callNow.addEventListener("click", ()=>{
      const friendsId = prompt("Your friends id")

        navigator.getUserMedia(
    {
      video: true,
      audio: true,
    },
    function (stream) {
      const call =   peer.call(friendsId,stream)
      call.answer(stream)
            call.on('stream', function(stream){
                webcam.srcObject = stream;
                webcam.play();
            })
    },
    function (err) {}
  );
    
  })


  peer.on('call', function(call){
      
    navigator.getUserMedia(
        {
          video: true,
          audio: true,
        },
        function (stream) {
            call.answer(stream)
            call.on('stream', function(stream){
                webcam.srcObject = stream;
                webcam.play();
            })
        },
        function (err) {}
      );
  })

};
