import './About.css'

const About = () => {
    return (  
        <div className="introduction-container">

            <p className="concept-p">
            <p>Create a portfolio of various stocks and ETFs to visualize how a long-term holding investment 
                portfolio has/would have performed over time to better gain insight into the portfolio's risk and actual 
                performance(i.e. information other than simply the net return) </p>
            </p>

            <p className="instructions-p">
                <p>Instructions:</p>
                <p>- Add positions to your portfolio by specifying a stock ticker as well as the shares and date purchased. </p>
                <p>- Postions "opened" can be deleted from the portfolio, or the shares bought can be edited.</p>
                <p>(The earliest date of purchase that can be set is roughly 20 days before the current date)</p>
                <p>(The latest date of purchase that can be set is roughly 7 years before the current date)</p>         
                <p>- Choose from 3 modes of viewing the portfolio's performance over time(portfolio as percentage, individual postions as percentage, and individual postions as dollars).</p>       
            </p>

            <p className='info-p'>
                <p>- Because this simulation assumes a long-term holding period, daily open prices are used to make calculations(e.g. portfolio return percentage). As such, exact purchase prices cannot be specified.</p>
            </p>

            <p className="disclaimer-p">
                <p>Disclaimer</p>
                The creator of this website is not an attorney, accountant, or financial advisor, nor are they holding themself out to be, and the information contained on this website is not a substitute for financial advice from a professional who is aware of the facts and circumstances of the user's individual situation.
                <p>Creator contact: ykjin5715@gmail.com</p>
            </p>
            
        </div>
    );
}
 
export default About;