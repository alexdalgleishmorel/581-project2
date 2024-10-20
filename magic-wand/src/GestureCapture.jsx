import { useEffect, useRef } from 'react';

const useGestureDetection = (onGestureDetected) => {
  const path = useRef([]); // Store the motion path
  const flickThreshold = 25;
  const shapeThreshold = 3;
  const minPathLength = 60;
  const squareCompletionLength = 100;
  const lShapeCompletionLength = 40;
  const triangleCompletionLength = 70;

  useEffect(() => {
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

    // Handle motion permissions for iOS 13+
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === 'granted') {
            window.addEventListener('devicemotion', handleMotion);
          }
        })
        .catch((err) => console.error(`Error: ${err.message}`));
    } else {
      // No permission required for Android or older iOS versions
      window.addEventListener('devicemotion', handleMotion);
    }

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [onGestureDetected]);

  // Check if the gesture is L-shape, square, or triangle
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
};

export default useGestureDetection;
