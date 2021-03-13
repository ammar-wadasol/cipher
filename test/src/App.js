import React, {useEffect, useState} from "react";
import axios from "./axios";

function App() {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    axios.get("/photos").then(resp => {
      setPictures(resp.data);
    });
  }, []);

  const maxId = arr => { 
    const max = arr.sort((a, b) => b.albumId-a.albumId)
    return max
  };
  const totalArray = maxId(pictures)
 
let filteredList = [...new Set(totalArray
  .reduce((a, c) => {
  !a.find(v => v.albumId === c.albumId) && a.push(c.albumId);
  return a }, 
  []))
];

  const finalData = {
    one: [],
    two: [],
    three: []
  }
  
  totalArray.forEach(item => {
    if(item.albumId <= filteredList[0] && item.albumId > filteredList[3])
      if (item.albumId === filteredList[0])
        finalData.one.push(item)
      else if (item.albumId === filteredList[1])
        finalData.two.push(item)
      else
        finalData.three.push(item)
  })

  const items = []

  for (const prop in finalData) {
    finalData[prop] = maxId(finalData[prop]).slice(0,2)
  }

  console.log('maxId', finalData)

  return (
    <div className="bg-gray-400 flex flex-col w-screen items-center h-screen">
     
      {/* {
        finalData.
        map((item, i) => {
          return (i < 3 ) 
            && <div className="bg-green-400 w-40 h-40 py-4">
                  
                  
              </div>
        })
      } */}
    </div>
  );
}

export default App;
