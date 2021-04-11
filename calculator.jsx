import React from 'react';
import './Calculator.css';
import ButtonOfCalculator from './buttonsOfCalculator';


class Calculator extends React.Component{
    render(){
        return <React.Fragment>
            <div id='gg' align='center'>
              <ButtonOfCalculator ></ButtonOfCalculator>  
            </div>
        </React.Fragment>
    }
}
export default Calculator;