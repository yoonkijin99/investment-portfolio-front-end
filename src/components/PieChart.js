import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, plugins } from "chart.js/auto";



const getRandomHexColor = () => {
  const characters = "0123456789ABCDEF";
      
  let color = '#';
    
  for (let i = 0; i < 6; i++) {
    color += characters[(Math.floor(Math.random() * 16))];  
  }

  const r = getRandomNumber(100, 255);
  const g = getRandomNumber(150, 255);
  const b = getRandomNumber(150, 255);

  return 'rgba(' + r + ',' +  g + ',' + b + ',1)';
}

const getRandomNumber = (min, max) => { // min max both inclusive
  const range = max - min + 1;

  const randomNumber = Math.floor(Math.random() * range) + min;
  
  return randomNumber;
  
}
  


const PieChart = ({ portfolioData }) => {

  const piechartTitle = 'Positions Weightings in Portfolio (%)';

  const options = {
    responsive: true,
    plugins: {
      legend: {
        onClick: null,
        position: 'top',
        color: 'white'
      },
      title: {
        display: true,
        text: piechartTitle,
        color: 'white'
      },
      

    },
  };



  if ((typeof portfolioData) === 'string') {
    return <div></div>
  }






  const weightingsData = portfolioData[1][portfolioData[1].length - 1].positionsWeightings;

  const chartData = {



    labels: weightingsData.map((data) => data.symbol),


    datasets: [
      {
        label: 'Position Weighting in Portfolio (%)',
        data: weightingsData.map((data) => data.weighting * 100),
        backgroundColor: weightingsData.map(() => getRandomHexColor()),
      },
    ],



  };













  return <Pie data={chartData} options={options} />;
}
 
export default PieChart;