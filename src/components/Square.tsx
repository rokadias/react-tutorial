import * as React from 'react';
import { useEffect, useState } from 'react';

import Player from '@/types/player';

export interface SquareProps {
    value: Player,
    onClick: Function
}

export default function Square(props: SquareProps): JSX.Element  {
    const [ squareValue, setSquareValue ] = useState<Player>(props.value);
    useEffect(() => {
        setSquareValue(props.value);
    }, [props.value]);

    return (
      <button className="square" onClick={() => props.onClick()}>
        {squareValue}
      </button>
    );
}
