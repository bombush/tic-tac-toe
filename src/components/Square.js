import React from 'react';

export default function Square(props) {
  let styleClass = 'square';
  if (props.isWinning) {
    styleClass += ' square--winning';
  }

    return (
      <button className={styleClass} onClick={props.onClick}>
        {props.value}
      </button>
    );
}