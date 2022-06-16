import React, { useEffect, useRef, useState} from 'react'
import * as faceapi from 'face-api.js';



function MainPage() {

    const videoRef = useRef();

    const videoHeight = 380;
    const videoWidth = 360;
    
  const [initializing, setInitializing] = useState(false);

    useEffect(() => {
        const loadModels = async () => {
          const MODEL_URL = process.env.PUBLIC_URL + '/models';
          setInitializing(true);
          Promise.all([
       
            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
            faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
       
          ]).then(() => {
            startVideo();
            console.log(faceapi.nets);
          });
        }
        loadModels();
        }, []) 
    
        const startVideo = () =>{
            navigator.mediaDevices.getUserMedia({
                video: true
              }).then((stream) => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
              }).catch((err) => {
                console.error(err);
              });
            
        };
  
        const handleVideoOnPlay = () => {
          setInterval(async () => {
            if (initializing) {
              setInitializing(false);
            }
            const detection = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
            console.log(detection.descriptor); 
            
          }, 180)
        }

  return (
        <div>
        <span>{initializing ? 'Initializing' : 'Ready'}</span>
    
        <video ref={videoRef} autoPlay muted height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay}/>
       
        </div>
  
  )
}

export default MainPage;