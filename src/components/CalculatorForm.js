import React from 'react';

const standardRebarLength = 12;

class CalculatorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leftoverRebar: [],
            setOne: {
                length: '',
                quantity: ''
            },
            setTwo: {
                length: '',
                quantity: ''
            },
            totalRebar: 0,
            showAlert: false,
            alertType: 'alert-info',
            alertMessage: ''
        };
        this.handleCalculate = this.handleCalculate.bind(this);
        this.inputLengthChange = this.inputLengthChange.bind(this);
        this.inputQuantityChange = this.inputQuantityChange.bind(this);
    }

    checkInput() {
        if (
            this.state.setOne.length !== '' &&
            this.state.setOne.quantity !== '' &&
            this.state.setTwo.length !== '' &&
            this.state.setTwo.quantity !== ''
        ) {
            return true;
        }
        else {
            return false;
        }
    }

    handleCalculate(event) {
        if (this.checkInput()) {                
            this.calculate();
            this.setState((state, props) => ({
                alertType: 'alert-info',
                alertMessage: `Minimum rebar needed: ${state.totalRebar}`,
                showAlert: true
            }));
        }
        else {
            this.setState({
                alertType: 'alert-danger',
                alertMessage: 'Input the required info',
                showAlert: true
            });
        }
    }

    calculate() {
        this.setState({ totalRebar: 0 });
        if(this.state.setOne.length >= this.state.setTwo.length) {
            this.calculateRebarSet(this.state.setOne);
            this.calculateRebarSet(this.state.setTwo);
        }
        else{
            this.calculateRebarSet(this.state.setTwo);
            this.calculateRebarSet(this.state.setOne);
        }
    }

    calculateRebarSet(rebarSet) {
        let rebarLength = standardRebarLength;
        for (let i = rebarSet.quantity; i > 0; i--) {
            if (!this.availableFromLeftOverRebar(rebarSet.length)) {    
                if (i === rebarSet.quantity) {
                    this.setState((state, props) => ({ totalRebar: state.totalRebar + 1 }));
                }
                if (rebarLength >= rebarSet.length) {
                    rebarLength -= rebarSet.length;
                }
                else {
                    this.setState((state, props) => ({ totalRebar: state.totalRebar + 1 }));
                    if(rebarLength) {
                        this.state.leftoverRebar.push(rebarLength);
                    }
                    rebarLength = standardRebarLength;
                    rebarLength -= rebarSet.length;
                }
            }
        }
        if (rebarLength) {
            this.state.leftoverRebar.push(rebarLength);
        }
    }

    availableFromLeftOverRebar(lengthNeeded) {
        this.state.leftoverRebar.some(
            (rebar, index) => {
                if (rebar >= lengthNeeded) {
                    let recutRebar = rebar - lengthNeeded;
                    this.state.leftoverRebar[index] = recutRebar;
                    if (!recutRebar) {
                        this.state.leftoverRebar.splice(index, 1);
                    }
                    return true;
                }
                return false;
            }
        );
    }

    inputLengthChange(event) {
        const target = event.target;
        const id = target.id;
        const value = target.value;
        this.setState({
            [id]: {
                length: value,
                quantity: this.state[id]['quantity']
            }
        });
    }

    inputQuantityChange(event) {
        const target = event.target;
        const id = target.id;
        const value = target.value;
        this.setState({
            [id]: {
                length: this.state[id]['length'],
                quantity: value,
            }
        });
    }

    render() {
        return (
            <div className="container">
                <input type="number" value={ this.state.setOne.length } onChange={ this.inputLengthChange } id="setOne" className="form-control my-2" placeholder="Length one" />
                <input type="number" value={ this.state.setOne.quantity } onChange={ this.inputQuantityChange } id="setOne" className="form-control my-2" placeholder="Quantity one" />
                <input type="number" value={ this.state.setTwo.length } onChange={ this.inputLengthChange } id="setTwo" className="form-control my-2" placeholder="Length two" />
                <input type="number" value={ this.state.setTwo.quantity } onChange={ this.inputQuantityChange } id="setTwo" className="form-control my-2" placeholder="Quantity two" />
                <button type="button" className="btn btn-primary" onClick={ this.handleCalculate }>
                    Calculate
                </button>
                <div className="my-2">                        
                    {
                        this.state.showAlert &&                     
                        <div className={`alert ${this.state.alertType}`} role="alert">
                            { this.state.alertMessage }
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default CalculatorForm;