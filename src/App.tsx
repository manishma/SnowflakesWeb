import React from 'react';
import { Snowflakes } from './features/snowflakes/Snowflakes';
import { Stage } from './features/stage/Stage';

function App() {
  return (
    <Stage>
      <Snowflakes />
    </Stage>
  );
}

export default App;
