import React, { Component } from 'react';
import './App.css'
class App extends Component {
    constructor(props) {
        super(props);
    }
   
    render() {
        
        return (
            <div className="root" style={{width:"100%",height:"100%"}}>
               <section style={{width:"100%",height:"100%"}}>   
                    {this.props.children}
                </section>
            </div>
        ) 
    }
   
}

export default App;
