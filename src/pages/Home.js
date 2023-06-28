import { useContext, useEffect, useState } from "react";

import PortfolioUpdateForm from "../components/PortfolioUpdateForm";
import Graph from "../components/Graph";
import PieChart from "../components/PieChart";

import Positions from "../components/Positions";

import { AuthContext } from "../contexts/AuthContext";
import { DataContext } from "../contexts/DataContext";

import './Home.css'
import DisplayTypeSelector from "../components/DisplayTypeSelector";



const Home = () => {

    const { user, setUser } = useContext(AuthContext);
    const { portfolioData, setPortfolioData } = useContext(DataContext);    

    const [currentlyDisplayedData, setCurrentlyDisplayedData] = useState('portfolioPct'); 
    const [showPortfolioUpdateForm, setShowPortfolioUpdateForm] = useState(false);



    const [isHovered, setIsHovered] = useState(false);

    const switchshowPortfolioUpdateForm = () => {
        setShowPortfolioUpdateForm(!showPortfolioUpdateForm);
    }
    

    useEffect(() => {

        const getPortfolioData = async () => {
            const response = await fetch('https://port-0-portfolio-webapp-backend-vpkwa2blihcxw1n.sel4.cloudtype.app/data/getportfoliodata', {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            
            const json = await response.json();

            
            
            if (response.ok) {
                if (json === 'No currently open positions') {
                    setPortfolioData(json);
                    return;
                }

                setPortfolioData(json)                
            } else {
                alert('Something went wrong. Please contact creator if error persists(contact info in About page');
            }
        }

        if (user) {
            getPortfolioData();
        }
    }, []);    

    return (
        <div className="home">

            {portfolioData && <DisplayTypeSelector setCurrentlyDisplayedData={setCurrentlyDisplayedData} />}

            <div className="graph-container">   
                {!portfolioData && <p> ... LOADING DATA ... </p>}
                {portfolioData && (currentlyDisplayedData === 'portfolioPctWeightings' ? <PieChart portfolioData={portfolioData} /> : <Graph portfolioData={portfolioData} currentlyDisplayedData={currentlyDisplayedData} />)}     
            </div>

            {portfolioData &&

            <div className="portfolio-status-container">
    
                <div className="portfolio-performance-p-container">
                    <p className="portfolio-performance-p">Portfolio Performance</p>
                </div>



                {!showPortfolioUpdateForm &&

                <div className="portfolio-status-div">

                   {(typeof portfolioData) !== 'string' && 
                        (portfolioData[1][portfolioData[1].length - 1].pct > 0 ? 
                            <p className="pos-pct">+{portfolioData[1][portfolioData[1].length - 1].pct.toFixed(2)}%</p> : 
                            <p className="neg-pct">{portfolioData[1][portfolioData[1].length - 1].pct.toFixed(2)}%</p>)}

                    <button className='add-position-button' onClick={switchshowPortfolioUpdateForm}>Add Position</button>

                </div>}



                {showPortfolioUpdateForm &&
                
                <div className="portfolio-update-form-container">

                    <div className="instructions-modal-container">
                        <p className="instructions-modal" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>?</p>
                   
                        {isHovered && 
                        
                        <div className="instructions">
                            <p>- Ticker symbols may be entered in as either lower/upper case. Whether an input ticker symbol is valid will be checked.</p>
                            <p>- The earliest input date possible is roughly 20 days before the current date. (This is because this service assumes/is meant for simulating a long-term held investment portfolio)</p>
                            <p>- Click the check button or hit enter to add a new position.</p>
                            <p>(if an existing position's date is added, the existing position's number of shares will simply be updated)</p>
                        </div>}

                    </div>

                    



                    <PortfolioUpdateForm switchshowPortfolioUpdateForm={switchshowPortfolioUpdateForm} />

                    <div className="close-form-button-container">
                        <button className='material-symbols-rounded close-form-button' onClick={switchshowPortfolioUpdateForm}>close</button>
                    </div>
                    
                </div>}

            </div>}



            <div className="positions-container">
                <p className="positions-p">Positions</p>
                {portfolioData && (typeof portfolioData) !== 'string' && <Positions portfolioData={portfolioData} />}
            </div>

        </div>
      );
}
 
export default Home;