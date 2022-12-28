import * as React from 'react';
import Countdown from 'react-countdown';

const App = ({trigger, setTrigger, handleAbsent}) => {
    console.warn("In timer")
    console.warn(trigger);

    return (
        <Countdown
            date={Date.now() + 5000}
            onComplete={() => {
                handleAbsent();
            }}
        />
    );
};

export default App;
