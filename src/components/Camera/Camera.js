import React, { useState, useEffect, useRef } from "react";
import classnames from "classnames";
import { detectFaces, drawResults } from "../../helpers/faceApi";
import Button from "../Button/Button";
import Results from "../Results/Results";
import Webcam from "react-webcam";
import FoodList from "../FoodList/FoodList";
import "./Camera.css";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const firebaseConfig = {
  // Your Firebase config here
  apiKey: "your apiKey",
  authDomain: "Your authDomain",
  projectId: "your projectId",
  storageBucket: "your storageBucket",
  messagingSenderId: "your messagingSenderId",
  appId: "your appId",
  measurementId: "your measurementId",

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Camera = ({ photoMode }) => {
  const camera = useRef();
  const cameraCanvas = useRef();

  const [photo, setPhoto] = useState(undefined);
  const [results, setResults] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [expressionCaptured, setExpressionCaptured] = useState(false);
  const [isResponseSubmitted, setIsResponseSubmitted] = useState(false);
  const handleSelectedFoodsChange = (foods) => {
    setSelectedFoods(foods);
  };

  const getFaces = async () => {
    if (camera.current !== null) {
      const faces = await detectFaces(camera.current.video);
      await drawResults(
        camera.current.video,
        cameraCanvas.current,
        faces,
        "boxLandmarks"
      );
      setResults(faces);

      // If faces are detected, send labels to the backend
      // If faces are detected and detection is not complete, send labels to backend
      if (faces.length > 0 && !expressionCaptured) {
        sendLabelsToBackend(faces);
      }
    }
  };

  const sendLabelsToBackend = (faces) => {
    for (const face of faces) {
      if (face && face.emotions && face.emotions.length > 0) {
        const expression = face.expressions.asSortedArray()[0].expression;
        console.log("Expression detected:", expression);
        setExpressionCaptured(true); // Mark expression as captured
        break; // Stop processing further faces
      }
    }
  };

  const clearOverlay = (canvasRef) => {
    const ctx = canvasRef?.current?.getContext("2d");

    if (ctx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
  };
  useEffect(() => {
    if (!photoMode && camera !== null) {
      getFaces();
      const ticking = setInterval(async () => {
        getFaces();
      }, 80);

      return () => {
        clearOverlay(cameraCanvas);
        clearInterval(ticking);
      };
    } else {
      return clearOverlay(cameraCanvas);
    }
  }, [photoMode]);

  const capture = () => {
    if (isResponseSubmitted) {
      toast.error("You've already submitted a response!");
      return;
    }

    const imgSrc = camera.current.getScreenshot();
    setPhoto(imgSrc);
    handleSaveExpression();
    setIsResponseSubmitted(true);
  };

  const handleSaveExpression = async () => {
    if (results.length === 0) {
      toast.error("Emotion is not detected yet!");
      return;
    }

    if (selectedFoods.length === 0) {
      toast.error("Food is not selected!");
      return;
    }

    const selectedFoodsData = selectedFoods.map((food) => ({ food }));
    const expressionData = {
      expression:
        results[0]?.expressions.asSortedArray()[0]?.expression || "Unknown",
      foods: selectedFoodsData,
    };

    try {
      const docRef = await addDoc(
        collection(db, "expressions"),
        expressionData
      );
      console.log("Document written with ID: ", docRef.id);
      toast.success("Expression data saved successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="camera">
      <FoodList onSelectedFoodsChange={handleSelectedFoodsChange} />
      <div className="camera__wrapper">
        <Webcam audio={false} ref={camera} width="100%" height="auto" />
        <canvas
          className={classnames(
            "webcam-overlay",
            photoMode && "webcam-overlay--hidden"
          )}
          ref={cameraCanvas}
        />
      </div>
      <div className="results__container">
        <Results results={results} />
      </div>

      <Button
        onClick={capture}
        className="camera__button"
        disabled={isResponseSubmitted}
      >
        {isResponseSubmitted ? "Response Submitted" : "Submit Response"}
      </Button>
    </div>
  );
};

export default Camera;
