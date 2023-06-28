import { createContext, useState } from "react";



export const DataContext = createContext();

const DataContextProvider = ({ children }) => {

    const [portfolioData, setPortfolioData] = useState(null);

    return ( 
        <DataContext.Provider value={{ portfolioData, setPortfolioData }}>
            { children }
        </DataContext.Provider>
    );
}
 
export default DataContextProvider;