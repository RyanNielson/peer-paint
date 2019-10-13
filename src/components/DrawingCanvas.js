import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setPoints } from '../actions';
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
  const points = useSelector(state => state.points.items);
  const [deletionMode, setDeletionMode] = useState(false);
  const [drawingColor, setDrawingColor] = useState('#ff0000');
  const dispatch = useDispatch();

  const keyDown = e => {
    if (e.keyCode === 68) {
      setDeletionMode(true);
    }
  };

  const keyUp = e => {
    if (e.keyCode === 68) {
      setDeletionMode(false);
    }
  };

  useEffect(() => {
    const unsubscribe = firestore
      .collection('points')
      .onSnapshot({ includeMetadataChanges: true }, snapshot => {
        const allPoints = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        dispatch(setPoints(allPoints));
      });

    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);

    return () => {
      document.removeEventListener('keydown', keyDown);
      document.removeEventListener('keyup', keyUp);
    };
  }, []);

  const addPoint = (x, y) => {
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

  const deletePoint = (x, y) => {
    const coordinate = `${x},${y}`;

    firestore
      .collection('points')
      .doc(coordinate)
      .delete()
      .then(() => {
        console.log('deleted');
      })
      .catch(err => {
        console.log('Error', err);
      });
  };

  const canvasRef = React.useRef(null);

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

  return (
    <Wrapper>
      <h1>Peer Paint</h1>
      <ColorPicker value={drawingColor} onChange={e => setDrawingColor(e.target.value)} />
      <Canvas
        width={25}
        height={25}
        ref={canvasRef}
        onClick={e => {
          const pixelWidth = e.currentTarget.clientWidth / e.currentTarget.width;
          const pixelHeight = e.currentTarget.clientHeight / e.currentTarget.height;

          const clickPointX = Math.floor((e.pageX - e.currentTarget.offsetLeft) / pixelWidth);
          const clickPointY = Math.floor((e.pageY - e.currentTarget.offsetTop) / pixelHeight);

          if (deletionMode) {
            deletePoint(clickPointX, clickPointY);
          } else {
            addPoint(clickPointX, clickPointY);
          }
        }}
      />
    </Wrapper>
  );
};

export default DrawingCanvas;
