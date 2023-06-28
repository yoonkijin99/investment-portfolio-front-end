import { useContext, useState } from "react";

import { AuthContext } from "../contexts/AuthContext";
import { DataContext } from "../contexts/DataContext";

import './PositionUpdateForm.css'



const PositionUpdateForm = ({ symbol, date, switchShowPositionUpdateForm }) => {

    const { user, setUser } = useContext(AuthContext);
    const { portfolioData, setPortfolioData } = useContext(DataContext);

    const [shares, setShares] = useState('');



    const handleSubmit = async (eventObj) => {
        eventObj.preventDefault();

        if (!shares) {
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

        const response = await fetch('https://port-0-portfolio-webapp-backend-vpkwa2blihcxw1n.sel4.cloudtype.app/data/editposition', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(requestBodyData)
        });

        const json = await response.json();

        if (response.ok) {
            setShares('');

            switchShowPositionUpdateForm();
            getPortfolioData();
        } else {
            alert('Something went wrong during the adding process. Please contact creator if error persists(contact info in About page');
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
            alert('Something went wrong during the updating process. Please contact creator if error persists(contact info in About page');
        }
    }



    return ( 
            
        <form className="position-update-form" onSubmit={handleSubmit}>

            <div>
                <label>Shares</label>
                <input onChange={(eventObj) => setShares(eventObj.target.value)} value={shares} placeholder='e.g. 3' />
            </div>

            <div className="button-div">
                <button className="material-symbols-rounded submit-button" onClick={handleSubmit}>done</button>                    
            </div>

        </form>
                     
    );
}
 
export default PositionUpdateForm;