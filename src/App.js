import React, { Component } from 'react';
import logo from './logo.svg';
import hotdog from './hotdog.svg';
import './App.css';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const promise = loadStripe("pk_test_51HuWrOK9N9A5Y7jvCeNnrxsPAqumPgnpzL9teNLIeV2HcCGyqBLGDsOv4sstOJGxgdXsDXK8C08hM88n92OR2Xbo00eNoa3UOJ");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

      amountdue:0,
      dognum: '1'
    };

  }
  componentDidMount() {
    fetch(`/api/amountdue?dognum=${encodeURIComponent(this.state.dognum)}`)
      .then(response => response.json())
      .then(state => this.setState(state));

  }




  render() {
   return (
     <div className="App">
       <header className="App-header">
         <img src={hotdog} className="App-logo" alt="logo" />
         <p>
           Uma's Hotdog Shop
         </p>
         <form onSubmit={this.handleSubmit}>
           <label htmlFor="name">Buy a hotdog </label>

         </form>
         <p>Amount Due: ${this.state.amountdue}</p>


         <Elements stripe={promise}>
            <CheckoutForm amountdue={this.state.amountdue} />
        </Elements>


       </header>
     </div>
   );
 }
}
export default App;
