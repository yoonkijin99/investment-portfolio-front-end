import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, plugins } from "chart.js/auto";



const SmallGraph = ({ positionPctMvt }) => {

    const currPct = (positionPctMvt[(positionPctMvt.length - 1)]).pct;

    const color = currPct > 0 ? 'rgb(37,201,155)' : 'rgb(195,61,35)';

    const dataset = 
    [
        {
            label: '(%)',
            data: positionPctMvt.map((data) => ({x: (data.Timestamp).split('T')[0], y: data.pct})),
            backgroundColor: color,
            borderColor: color,
            pointRadius: 0,
            borderWidth: 0.5,
        }
    ];

  const specificData = {
    labels: positionPctMvt.map((data) => (data.Timestamp).split('T')[0]),
    datasets: dataset,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      title: {
        display: true,
        text: '(%)',
        color: 'white'
      },
    },
    scales: {
            x: {
              ticks: {
                display: false,
                color: 'white'
              },
              grid: {
                display: false,
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

  return (
    <Line data={specificData} options={options} />
  );
}

export default SmallGraph;