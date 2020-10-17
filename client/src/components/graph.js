import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';


const Graph = ({data,type}) => {
  const [chartData, setChartData] = useState({});
  
  useEffect(()=>{
    let labels= data.map(d=> d.time);
    let calorie = data.map(d=>d.calorie);
    let backgroundColor = data.map(d=>{
      let background = "80ffdb";
      if(d.calorie <2500 && d.calorie>1500)background = "80ffdb";
      else background="#e63946";
      return background;
    })

    const cd = {
      labels:labels,
      datasets:[
        {
          label:'calorie',
          data:calorie,
          backgroundColor:backgroundColor,
          fill:false,
          borderColor:"green",
          borderWidth:1
        }
      ],
    }
    setChartData(cd);
  },[data])
  
  return (
    <div className="graph-div" >
      <Line 
        data={chartData}
      />
    </div>

  );
}
 
export default Graph;