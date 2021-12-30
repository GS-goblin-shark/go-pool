import React, { Component, useState, useEffect } from "react";
// import './style.css';

// class App extends Component{
//   render(){
//       return(
//           <div>
//               <h1>Go-Pool App Component</h1>
//           </div>
//       )
//   }
// }

function App() {
    const [state, updateState] = useState(
        {
            userId: '',
            status: false,
        }
    )

    return (
        <div>
              <h1>Go-Pool App Component</h1>
          </div>
    )
}

export default App;