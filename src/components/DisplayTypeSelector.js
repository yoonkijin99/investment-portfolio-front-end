import { useState } from 'react';
import './DisplayTypeSelector.css'

const DisplayTypeSelector = ({ setCurrentlyDisplayedData }) => {

    const [isHovered, setIsHovered] = useState(false);


    return (  
        <div className="display-selector-container">

                <div className="instructions-modal-container">
                    
                    <p className="instructions-modal" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>?</p>

                    {isHovered && 
    
                    <div className="instructions">
                        <p>- Visualize how your investment portfolio performed until now.</p>
                        <p>(the entire portfolio as well as each of the individual positions that compose the portfolio)</p>
                        <p>- You can also visualize each position's percent weighting in the portfolio's composition.</p>
                    </div>}

                </div>


                
                <p>Display:</p>
            
                <select className="display-selector" onChange={(eventObj) => setCurrentlyDisplayedData(eventObj.target.value)}>
                    <option value={'portfolioPct'}>Portfolio Performance (%)</option>
                    <option value={'portfolioPctWeightings'}>Positions Weightings (%) </option>
                    <option value={'positionsPct'}>Positions (%)</option>
                    <option value={'positionsDollar'}>Positions ($)</option>
                </select>

        </div>
    );
}
 
export default DisplayTypeSelector;