import React, { useState, useEffect } from "react";

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