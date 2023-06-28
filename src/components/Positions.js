import Position from "./Position";
import './Positions.css'



const Positions = ({ portfolioData }) => {

    const positionsPctMvts = portfolioData[0];
    const positionsInfo = portfolioData[2];

    return (  
        <div className="positions-div">
            {positionsInfo.map((position, index) => (
                <Position symbol={position.symbol} shares={position.shares} date={position.date} positionPctMvt={positionsPctMvts[index]} key={index} />
            ))}
        </div>
    );   
}
 
export default Positions;