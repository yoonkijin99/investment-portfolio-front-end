import { useContext, useState } from "react";

import { AuthContext } from "../contexts/AuthContext";
import { DataContext } from "../contexts/DataContext";

import './PortfolioUpdateForm.css'



const PortfolioUpdateForm = ({ switchshowPortfolioUpdateForm }) => {

    const { user, setUser } = useContext(AuthContext);
    const { portfolioData, setPortfolioData } = useContext(DataContext);

    const [symbol, setSymbol] = useState('');
    const [date, setDate] = useState('');
    const [shares, setShares] = useState('');



    const handleSubmit = async (eventObj) => {
        eventObj.preventDefault();
        
        if (!shares || !symbol || !date) {
            alert('Please provide values for all input fields');
            return;
        }

        if (isNaN(shares)) { 
            alert('Shares should be a numeric value');
            return;
        }

        if (!(parseInt(shares, 10) == shares)) {
            alert('Shares should not be a decimal number');
            return;
        }

        if (shares <= 0) {
            alert('Shares should be at least 1');
            return;
        }
        
        const requestBodyData = { email: user.email, symbol, date, shares };

        const response = await fetch('https://port-0-portfolio-webapp-backend-vpkwa2blihcxw1n.sel4.cloudtype.app/data/addposition', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(requestBodyData)
        });

        const json = await response.json();

        if (response.ok) {
            setSymbol('');
            setDate('');
            setShares('');

            switchshowPortfolioUpdateForm();
            getPortfolioData();
        } else {
            alert(json.error);
            // alert('Something went wrong during the adding process. Please contact creator if error persists(contact info in About page');
        }
    }

    const getPortfolioData = async () => {
        const response = await fetch('https://port-0-portfolio-webapp-backend-vpkwa2blihcxw1n.sel4.cloudtype.app/data/getportfoliodata', {
            headers: { 'Authorization': `Bearer ${user.token}` }
        });
        
        const json = await response.json();

        if (response.ok) {
            setPortfolioData(json);
        } else {
            alert('Something went wrong during the adding process. Please contact creator if error persists(contact info in About page');
        }
    }



    return ( 
            
            <form className="portfolio-update-form" onSubmit={handleSubmit}>

                <div>
                    <label>Ticker</label>
                    <input onChange={(eventObj) => setSymbol(eventObj.target.value)} value={symbol} placeholder='e.g. AAPL' />                    
                </div>

                <div>
                    <label>Shares</label>
                    <input onChange={(eventObj) => setShares(eventObj.target.value)} value={shares} placeholder='e.g. 3'/> 
                </div>

                <div>
                    <label>Date</label>
                    <input type='date' onChange={(eventObj) => setDate(eventObj.target.value)} value={date} data-testid='date-input'/>                     
                </div>



                <div>
                    <button className="material-symbols-rounded submit-button" onClick={handleSubmit}>done</button>                    
                </div>

            </form>
                     
    );
}
 
export default PortfolioUpdateForm;