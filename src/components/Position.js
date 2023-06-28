import { useContext, useState } from 'react';

import PositionUpdateForm from './PositionUpdateForm';
import SmallGraph from './SmallGraph';

import { AuthContext } from '../contexts/AuthContext';
import { DataContext } from '../contexts/DataContext';

import './Position.css'



const Position = ({ symbol, shares, date, positionPctMvt }) => {

    const currPct = (positionPctMvt[(positionPctMvt.length - 1)]).pct;

    const { user, setUser } = useContext(AuthContext);
    const { portfolioData, setPortfolioData } = useContext(DataContext);

    const [showPositionUpdateForm, setShowPositionUpdateForm] = useState(false);

    const switchShowPositionUpdateForm = () => {
        setShowPositionUpdateForm(!showPositionUpdateForm);
    }



    const handleDelete = async (eventObj) => {
        eventObj.preventDefault();

        const requestBodyData = { email: user.email, symbol, date };

        const response = await fetch('https://port-0-portfolio-webapp-backend-vpkwa2blihcxw1n.sel4.cloudtype.app/data/deleteposition', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(requestBodyData)
        });

        if (response.ok) {
            getPortfolioData();
        } else {
            alert('Something went wrong during the deleting process. Please contact creator if error persists(contact info in About page');
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
            alert('Something went wrong during the deleting process. Please contact creator if error persists(contact info in About page');
        }
    }



    return (  
        <div className="position-div">

            <div className='position-info-div-1'>
                <p className='symbol'>{symbol}</p>
                <p className='shares'>{shares} SHARES</p>
                <p className='date'>{date.split('T')[0]}</p>   
            </div>

            <div className='in-position-graph-container'>
                <SmallGraph positionPctMvt={positionPctMvt} />
            </div>



            {!showPositionUpdateForm && 
            <div className='position-info-div-2'>

                {currPct > 0 ? <p className='pos-pct'>+{currPct.toFixed(2)}%</p> : <p className='neg-pct'>{currPct.toFixed(2)}%</p>}

                <div className='edit-delete-buttons-container'>
                    <button className='edit-button' onClick={switchShowPositionUpdateForm}>Edit Position</button>
                    <button className='material-symbols-rounded delete-button' onClick={handleDelete}>delete</button>        
                </div>

            </div>}

            {showPositionUpdateForm &&
            
            <div className='position-update-form-container'>

                <PositionUpdateForm symbol={symbol} date={date} switchShowPositionUpdateForm={switchShowPositionUpdateForm}/> 

                <div className="close-form-button-container">
                    <button className='material-symbols-rounded close-form-button' onClick={switchShowPositionUpdateForm}>close</button>
                </div>

            </div>}

        </div>
    );
}
 
export default Position;