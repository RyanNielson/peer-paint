import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { firestore } from '../firebase';

const Wrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
`;

const ColorPicker = styled.input.attrs({ type: 'color' })`
  margin: 15px 0;
  width: 95%;
`;

const Canvas = styled.canvas`
  width: 100%;
  image-rendering: crisp-edges;
  image-rendering: pixelated;
`;

const DrawingCanvas = () => {
  const [points, setPoints] = useState([]);
  const [drawingColor, setDrawingColor] = useState('#ff0000');
  const canvasRef = React.useRef(null);

  useEffect(() => {
    const unsubscribe = firestore
      .collection('points')
      .onSnapshot({ includeMetadataChanges: true }, snapshot => {
        const allPoints = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPoints(allPoints);
      });

    return unsubscribe;
  }, []);

  const updateCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.imageSmoothingEnabled = false;

    context.clearRect(0, 0, canvas.width, canvas.height);

    points.forEach(point => {
      context.fillStyle = point.color;
      context.fillRect(point.x, point.y, 1, 1);
    });
  };

  useEffect(updateCanvas, [points, updateCanvas]);

  const determineCoordinate = e => {
    const pixelWidth = e.currentTarget.clientWidth / e.currentTarget.width;
    const pixelHeight = e.currentTarget.clientHeight / e.currentTarget.height;

    const x = Math.floor((e.pageX - e.currentTarget.offsetLeft) / pixelWidth);
    const y = Math.floor((e.pageY - e.currentTarget.offsetTop) / pixelHeight);

    return { x, y };
  };

  const addPoint = e => {
    const { x, y } = determineCoordinate(e);

    firestore
      .collection('points')
      .doc(`${x},${y}`)
      .set({
        x,
        y,
        color: drawingColor,
      })
      .then(() => {
        console.log('added');
      })
      .catch(err => {
        console.log('Error', err);
      });
  };

  const deletePoint = e => {
    e.preventDefault();
    const { x, y } = determineCoordinate(e);

    firestore
      .collection('points')
      .doc(`${x},${y}`)
      .delete()
      .then(() => {
        console.log('deleted');
      })
      .catch(err => {
        console.log('Error', err);
      });
  };

  return (
    <Wrapper>
      <h1>Peer Paint</h1>
      <p>
        Use left click to draw, right click to delete, and use the color picker below to change your
        drawing color.
      </p>
      <ColorPicker value={drawingColor} onChange={e => setDrawingColor(e.target.value)} />
      <Canvas
        width={25}
        height={25}
        ref={canvasRef}
        onClick={addPoint}
        onContextMenu={deletePoint}
      />
    </Wrapper>
  );
};

export default DrawingCanvas;
