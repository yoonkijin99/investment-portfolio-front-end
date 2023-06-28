import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, plugins } from "chart.js/auto";



const getRandomHexColor = () => {
  
  const characters = "0123456789ABCDEF";
      
  let color = '#';
    
  for (let i = 0; i < 6; i++) {
    color += characters[(Math.floor(Math.random() * 16))];  
  }

  const r = getRandomNumber(50, 255);
  const g = getRandomNumber(50, 255);
  const b = getRandomNumber(50, 255);

  return 'rgba(' + r + ',' +  g + ',' + b + ',1)';
}

const getRandomNumber = (min, max) => { // min max both inclusive
  
  const range = max - min + 1;

  const randomNumber = Math.floor(Math.random() * range) + min;
  
  return randomNumber;

}

const getDataSets = (positionsPctMvts, portfolioPctMvt, currentlyDisplayedData) => {
  const datasets = [];  

  if (currentlyDisplayedData === 'portfolioPct') {
  
    const currPortfolioReturnPct = portfolioPctMvt[portfolioPctMvt.length - 1].pct;

    const color = currPortfolioReturnPct > 0 ? 'rgb(37,201,155)' : 'rgb(195,61,35)';
  
    datasets.push(
          {
            label: 'Portfolio Performance (%)',
            data: portfolioPctMvt.map((data) => ({x: (data.Timestamp).split('T')[0], y: data.pct})),
            backgroundColor: color,
            borderColor: color,
            borderWidth: 0.5,
            pointRadius: 2,
          }
    );

    return datasets;
  
  } else if (currentlyDisplayedData === 'positionsPct') {

    for (let i = 0; i < positionsPctMvts.length; i++) {

      const color = getRandomHexColor();
  
      datasets.push(
        {
          label: positionsPctMvts[i][0].symbol,
          data: positionsPctMvts[i].map((data) => ({x: (data.Timestamp).split('T')[0], y: data.pct})),
          backgroundColor: color,
          borderColor: color,
          borderWidth: 0.5,
          pointRadius: 2,
        }
      );
      
    }
    
    return datasets;

  } else if (currentlyDisplayedData === 'positionsDollar') {

    for (let i = 0; i < positionsPctMvts.length; i++) {
  
      const color = getRandomHexColor();

      datasets.push(
            {
              label: positionsPctMvts[i][0].symbol,
              data: positionsPctMvts[i].map((data) => ({x: (data.Timestamp).split('T')[0], y: (data.OpenPrice)})),
              backgroundColor: color,
              borderColor: color,
              borderWidth: 0.5,
            }
      );

    }
    
    return datasets;

  } 

}





const Graph = ({ portfolioData, currentlyDisplayedData }) => {

  let graphTitle;

  if (currentlyDisplayedData == 'portfolioPct') {
    graphTitle = 'Portfolio Performance (%)';
  } else if (currentlyDisplayedData == 'positionsPct') {
    graphTitle = 'Holdings Performance (%)';
  } else if (currentlyDisplayedData == 'positionsDollar') {
    graphTitle = 'Holdings Performance ($)';
  }
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        color: 'white'
      },
      title: {
        display: true,
        text: graphTitle,
        color: 'white'
      },
    },
    scales: {
            x: {
              ticks: {
                color: 'white'
              },
              grid: {
                color: 'white',
                lineWidth: 0.1
              },
              border: {
                color: 'white'
              }
            },
            y: {
              ticks: {
                color: 'white'
              },
              grid: {
                color: 'white',
                lineWidth: 0.1
              },
              border: {
                color: 'white'
              }
            }
          }
  };











  if ((typeof portfolioData) === 'string') {
    return (
      <Line data={{
        datasets: []
      }} options={options} />
    );
  }







  
  const portfolioPctMvt = portfolioData[1];
  const positionsPctMvts = portfolioData[0];

  const dataSets = getDataSets(positionsPctMvts, portfolioPctMvt, currentlyDisplayedData);




  const specificData = {
    labels: portfolioPctMvt.map((data) => (data.Timestamp).split('T')[0]),
    datasets: dataSets,
  };




  

  return (
    <Line data={specificData} options={options} />
  );
}

export default Graph;