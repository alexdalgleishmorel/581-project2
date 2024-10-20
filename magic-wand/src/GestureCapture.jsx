import React, { useEffect, useState, useRef } from 'react';
import './app.css';

function App() {
  const [status, setStatus] = useState("Waiting for a gesture...");
  const [permissionGranted, setPermissionGranted] = useState(false); // Track permission state
  const path = useRef([]); // Store the motion path
  const flickThreshold = 25;
  const shapeThreshold = 3;
  const minPathLength = 60;
  const squareCompletionLength = 100;
  const lShapeCompletionLength = 40;
  const triangleCompletionLength = 70;

  // Function to request motion permission
  const requestMotionPermission = () => {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === 'granted') {
            setPermissionGranted(true);
            window.addEventListener('devicemotion', handleMotion);
          } else {
            setStatus("Permission denied for motion access.");
          }
        })
        .catch((err) => setStatus(`Error: ${err.message}`));
    } else {
      // For Android and older iOS versions, no permission needed
      setPermissionGranted(true);
      window.addEventListener('devicemotion', handleMotion);
    }
  };

  const handleMotion = (event) => {
    const { x, y, z } = event.acceleration || { x: 0, y: 0, z: 0 };

    // Detect flick (sharp, fast movement)
    const flickMagnitude = Math.abs(x) + Math.abs(y) + Math.abs(z);
    if (flickMagnitude > flickThreshold) {
      setStatus("Flick detected!");
      path.current = []; // Reset path after flick detection
      return;
    }

    // Track smaller motions for shapes
    if (Math.abs(x) > shapeThreshold || Math.abs(y) > shapeThreshold) {
      path.current.push({ x, y });

      // Only check for shape after the path reaches a certain length
      if (path.current.length > minPathLength) {
        const gesture = detectGesture(path.current);
        if (gesture) {
          setStatus(`${gesture} detected!`);
          path.current = []; // Reset path after detection
        }
      }

      // Prevent path from getting too long
      if (path.current.length > squareCompletionLength) {
        path.current.shift(); // Remove the oldest points
      }
    }
  };

  // Check if the gesture is L-shape, square, or triangle
  const detectGesture = (path) => {
    if (path.length >= lShapeCompletionLength && isLShape(path)) return "L-shape";
    if (path.length >= squareCompletionLength && isSquare(path)) return "Square";
    if (path.length >= triangleCompletionLength && isTriangle(path)) return "Triangle";
    return null;
  };

  const isLShape = (path) => {
    let directionChanges = 0;
    let previousDirection = { x: 0, y: 0 };

    for (let i = 1; i < path.length - 1; i++) {
      const currentDirection = {
        x: path[i + 1].x - path[i].x,
        y: path[i + 1].y - path[i].y,
      };

      const dxChange = Math.sign(previousDirection.x) !== Math.sign(currentDirection.x);
      const dyChange = Math.sign(previousDirection.y) !== Math.sign(currentDirection.y);

      if ((dxChange && Math.abs(currentDirection.x) > shapeThreshold) ||
          (dyChange && Math.abs(currentDirection.y) > shapeThreshold)) {
        directionChanges++;
        previousDirection = currentDirection;
      }
    }

    return directionChanges === 1;
  };

  const isSquare = (path) => {
    let directionChanges = 0;
    let previousDirection = { x: 0, y: 0 };

    for (let i = 1; i < path.length - 1; i++) {
      const currentDirection = {
        x: path[i + 1].x - path[i].x,
        y: path[i + 1].y - path[i].y,
      };

      const dxChange = Math.sign(previousDirection.x) !== Math.sign(currentDirection.x);
      const dyChange = Math.sign(previousDirection.y) !== Math.sign(currentDirection.y);

      if ((dxChange && Math.abs(currentDirection.x) > shapeThreshold) ||
          (dyChange && Math.abs(currentDirection.y) > shapeThreshold)) {
        directionChanges++;
        previousDirection = currentDirection;
      }
    }

    return directionChanges >= 4;
  };

  const isTriangle = (path) => {
    let directionChanges = 0;
    let previousDirection = { x: 0, y: 0 };

    for (let i = 1; i < path.length - 1; i++) {
      const currentDirection = {
        x: path[i + 1].x - path[i].x,
        y: path[i + 1].y - path[i].y,
      };

      const dxChange = Math.sign(previousDirection.x) !== Math.sign(currentDirection.x);
      const dyChange = Math.sign(previousDirection.y) !== Math.sign(currentDirection.y);

      if ((dxChange && Math.abs(currentDirection.x) > shapeThreshold) ||
          (dyChange && Math.abs(currentDirection.y) > shapeThreshold)) {
        directionChanges++;
        previousDirection = currentDirection;
      }
    }

    return directionChanges >= 3;
  };

  return (
    <div className="App">
      <h1>Magic Wand Unlock</h1>
      <p>Flick, draw an L-shape, square, or triangle to unlock!</p>
      {!permissionGranted ? (
        <button onClick={requestMotionPermission}>
          Grant Motion Access
        </button>
      ) : (
        <div className="status">{status}</div>
      )}
    </div>
  );
}

export default App;
