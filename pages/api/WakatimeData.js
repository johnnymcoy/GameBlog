// import React, { useEffect, useState } from "react";
// import jsonp from "jsonp";

// const WakaTimeData = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     // Use JSONP to fetch WakaTime data
//     jsonp(
//       "https://wakatime.com/share/@Bucci/06259ac0-a533-4c42-a0a6-5d1559383068.json",
//       null,
//       (err, response) => {
//         if (err) {
//           console.error("Error fetching WakaTime data with JSONP:", err);
//           return;
//         }
//         console.log(response);
//         setData(response); // Store the data in state
//       }
//     );
//   }, []);

//   return (
//     <div>
//       <h1>WakaTime Data</h1>
//       {data ? (
//         <pre>{JSON.stringify(data, null, 2)}</pre>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default WakaTimeData;

// // import React, { useEffect, useState } from 'react'

// // const WakaTimeData = () => {
// //   const [data, setData] = useState(null)

// //   useEffect(() => {
// //       // Using the fetch API to get data
// //       fetch(
// //          'https://wakatime.com/share/@61dab172-08f9-4642-b8e2-a2302702f4f2/06259ac0-a533-4c42-a0a6-5d1559383068.json'
// //     )
// //       .then((response) => response.json())
// //       .then((data) => {
// //         console.log(data)
// //         setData(data) // Store the data in state
// //       })
// //       .catch((error) => console.error('Error fetching the WakaTime data:', error))
// //   }, []) // Empty dependency array to ensure it runs only on mount

// //   return (
// //     <div>
// //       <h1>WakaTime Data</h1>
// //       {data ? (
// //         <pre>{JSON.stringify(data, null, 2)}</pre> // Displaying the JSON data
// //       ) : (
// //         <p>Loading...</p>
// //       )}
// //     </div>
// //   )
// // }

// // export default WakaTimeData
