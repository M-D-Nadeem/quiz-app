// // PerformanceChart.jsx
// import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,

//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { getInfoGrouped } from '../../../apicalls/reports';

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const PerformanceChart = ({ userId }) => {
//     const [performanceData, setPerformanceData] = useState(null);
  
//     useEffect(() => {
//       const fetchPerformanceData = async () => {
//         try {
//           const response = await getInfoGrouped()
//           setPerformanceData(response.Nodejs);
//         } catch (error) {
//           console.error('Error fetching performance data', error);
//         }
//       };
  
//       fetchPerformanceData();
//     }, []);
//     console.log(performanceData);
//     const generateChartData = () => {
//       if (!performanceData) {return null}
      
  
//       const categories = Object.keys(performanceData).filter(key => key !== 'totalMarks' && key !== 'obtainedMarks');
//       console.log(categories);
//       const datasets = categories.map((category, index) => {
//         const exams = performanceData.exams;
//         console.log(exams);
//         return {
//           label: category,
//           data: exams.map((exam) => ({
//             x: new Date(exam.date).toLocaleDateString(),
//             y: (exam.obtainedMarks / exam.totalMarks) * 100
//           })),
//           borderColor: `hsl(${index * 60}, 100%, 50%)`,
//           backgroundColor: `hsla(${index * 60}, 100%, 50%, 0.5)`,
//           fill: false
//         };
//       });
  
//     //   return {
//     //     labels: performanceData.exams.map((exam) => new Date(exam.date).toLocaleDateString()),
//     //     datasets
//     //   };
//     };
  
//     return (
//       <div className="p-4 bg-gray-800 rounded-lg">
//         <h2 className="text-2xl font-bold text-white">Performance Chart</h2>
//         {performanceData ? (
//           <Line data={generateChartData()} options={{
//             responsive: true,
//             scales: {
//               x: {
//                 type: 'time',
//                 time: {
//                   unit: 'day'
//                 },
//                 title: {
//                   display: true,
//                   text: 'Date',
//                   color: '#fff'
//                 }
//               },
//               y: {
//                 beginAtZero: true,
//                 title: {
//                   display: true,
//                   text: 'Percentage',
//                   color: '#fff'
//                 }
//               }
//             }
//           }} />
//         ) : (
//           <p className="text-white">Loading...</p>
//         )}
//       </div>
//     );
//   };

//   export default PerformanceChart