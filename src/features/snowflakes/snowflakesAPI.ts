import { v4 } from "uuid";
import { Snowflake, SnowflakeCore } from "./snowflakesSlice";

export const MAX_SNOWFLAKES_COUN = 20;

export function createSnowflake(timestamp: number, stageWidth: number): Snowflake {
  const size = Math.random() * 60 + 20
  return calculateSnowflakePosition({
    id: v4(),
    size,
    hSpeed: (0.5 - Math.random()) * 50, // px per sec
    vSpeed: Math.random() * 40 + 10, // px per sec
    rSpeed: (0.5 - Math.random()) * 90, // deg per sec
    startLeft: Math.random() * stageWidth,
    createTimestamp: timestamp,
    imgDataUrl: createSnowflakeDataURL(size),
  }, timestamp);
}

export function calculateSnowflakePosition(snowflake: SnowflakeCore, timestamp: number): Snowflake {
  const duration = (timestamp - snowflake.createTimestamp)/1000; // sec
  return {
    ...snowflake,
    top: duration * snowflake.vSpeed - snowflake.size,
    left: snowflake.startLeft + duration * snowflake.hSpeed - snowflake.size/2,
    rotation: duration * snowflake.rSpeed,
  };
}

function createSnowflakeDataURL(size: number) {
  const canvas = document.createElement("canvas");
  // Make sure to set the size, otherwise its zero
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d");
  if(!context) {
    return;
  }

  // context.fillStyle = "#FFFFFF";
  // context.strokeStyle = "#FFFFFF";
  // context.strokeRect
  // context.strokeRect(0,0,canvas.height-1, canvas.width-1);

  const segmentImageData = createSnowflakeSegment(size);
  if(segmentImageData) {
    for (let i = 0; i < 6; i++) {
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.translate(size/2, size/2);
      context.rotate (60 * i * Math.PI / 180)
      context.translate(-size/2, -size/2);
      context.drawImage(segmentImageData, 0, 0);


      context.setTransform(-1, 0, 0, 1, size, 0);
      context.translate(size/2, size/2);
      context.rotate (60 * i * Math.PI / 180)
      context.translate(-size/2, -size/2);
      context.drawImage(segmentImageData, 0, 0);
    }
  }

  return canvas.toDataURL();
}

function createSnowflakeSegment(size: number) {
  const canvas = document.createElement("canvas");
  // Make sure to set the size, otherwise its zero
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d");
  if(!context) {
    return;
  }

  // // context.fillStyle = "#FFFFFF";
  context.strokeStyle = "#FFFFFF";
  // // context.strokeRect
  // context.strokeRect(0,0,canvas.height-1, canvas.width-1);

  context.beginPath();
  context.lineWidth = 1;
  context.moveTo(size / 2, size / 2);
  context.lineTo(0.933 * size, size / 4);
  context.lineTo(size, size / 2);
  context.lineTo(size / 2, size / 2);
  context.clip()

  // context.fill()

  context.beginPath();
  context.lineWidth = 2;
  context.moveTo(size / 2, size / 2);
  context.lineTo(size, size / 2);
  context.stroke(); // Draw it

  context.lineWidth = 2;
  for (let i = 0; i < 5; i++) {
      context.beginPath();
      context.moveTo((1 + Math.random()) * size / 2, size / 2);
      context.lineTo((1 + Math.random()) * size / 2, (Math.random()) * size / 2);
      context.stroke(); // Draw it
  }

  return canvas;
  // return context.getImageData(0, 0, size, size);
}