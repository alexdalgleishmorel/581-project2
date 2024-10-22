import { useEffect, useRef } from 'react';

const useGestureDetection = (isDetectingGesture, onGestureDetected) => {
  const path = useRef([]); // Store the motion path
  const flickThreshold = 25;
  const shapeThreshold = 3;
  const minPathLength = 60;
  const squareCompletionLength = 100;
  const lShapeCompletionLength = 40;
  const triangleCompletionLength = 70;

  // Function to request permission
  const requestPermission = async () => {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      try {
        const permissionState = await DeviceMotionEvent.requestPermission();
        if (permissionState === 'granted') {
          return true;
        } else {
          console.error("Permission denied for motion access.");
          return false;
        }
      } catch (err) {
        console.error(`Error: ${err.message}`);
        return false;
      }
    }
    return true; // No permission required for Android or older iOS versions
  };

  useEffect(() => {
    if (!isDetectingGesture) return;

    const handleMotion = (event) => {
      const { x, y, z } = event.acceleration || { x: 0, y: 0, z: 0 };

      // Detect flick (sharp, fast movement)
      const flickMagnitude = Math.abs(x) + Math.abs(y) + Math.abs(z);
      if (flickMagnitude > flickThreshold) {
        path.current = []; // Reset path after flick detection
        onGestureDetected("FLICK");
        return;
      }

      // Track smaller motions for shapes
      if (Math.abs(x) > shapeThreshold || Math.abs(y) > shapeThreshold) {
        path.current.push({ x, y });

        // Only check for shape after the path reaches a certain length
        if (path.current.length > minPathLength) {
          const gesture = detectGesture(path.current);
          if (gesture) {
            onGestureDetected(gesture);
            path.current = []; // Reset path after detection
          }
        }

        // Prevent path from getting too long
        if (path.current.length > squareCompletionLength) {
          path.current.shift(); // Remove the oldest points
        }
      }
    };

    window.addEventListener('devicemotion', handleMotion);

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [isDetectingGesture, onGestureDetected]);

  const detectGesture = (path) => {
    if (path.length >= lShapeCompletionLength && isLShape(path)) return "L";
    if (path.length >= squareCompletionLength && isSquare(path)) return "SQUARE";
    if (path.length >= triangleCompletionLength && isTriangle(path)) return "TRIANGLE";
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

  return {
    requestPermission
  };
};

export default useGestureDetection;
