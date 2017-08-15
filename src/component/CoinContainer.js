import React from 'react';

const CoinContainer = (props) => (
  <div className="four columns">
    <div className="coin-container">
        <h1>{props.name}</h1>
        <h3> {props.price_usd}</h3>
        <div className="coin-change">
          <p>01H:<span className={props.classes.hour}> {props.percent.hour}%</span></p>
          <p>24H:<span className={props.classes.day}> {props.percent.day}%</span></p>
          <p>01W:<span className={props.classes.day7}> {props.percent.day7}%</span></p>
        </div>
        {props.children}
    </div>
  </div>
);


export default CoinContainer;
