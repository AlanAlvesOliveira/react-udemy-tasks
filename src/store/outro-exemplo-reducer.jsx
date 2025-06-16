import { act, useReducer } from "react";


export function counterReducer(state, action) {
    switch (action.type) {
        case "INCREMENT":
            return { ...state, count: state.count + action.payload }; // count: state.count + 1
        case "DECREMENT":
            return { ...state, count: state.count - 1 };
        case "RESET":
            return { ...state, count: 0 };
        default:
            return { state };
    }
}

function OutroExemploReducer() {

    const [state, dispacher] =
        useReducer(counterReducer, { count: 0 });
    const handleIncrement = () => {
        // dispacher({ type: "INCREMENT" });
        dispacher({ type: "INCREMENT", payload: 1 });
    }
    const handleDecrement = () => {
        dispacher({ type: "DECREMENT" });
    }
    const handleReset = () => {
        dispacher({ type: "RESET" });
    }

    return (
        <div id="app">
            <h1>The (Final?) Counter</h1>
            <p id="actions">
                <button onClick={handleIncrement}>Increment</button>
                <button onClick={handleDecrement}>Decrement</button>
                <button onClick={handleReset}>Reset</button>
            </p>
            <p id="counter">{state.count}</p>
        </div>
    );
}

export default OutroExemploReducer;
