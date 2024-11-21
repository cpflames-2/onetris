import React, { useState } from 'react';

export default function RowEffect() {

  const dummyData = [
    {
      id: 1,
      Name: 'FirstName1',
      LastName: 'LastName1'
    },
    {
      id: 2,
      Name: 'FirstName2',
      LastName: 'LastName2'
    }
  ]

  const formatData = (items) => {
    return items.map((item) => ({...item, isActive: false}))
  }
    
  const [myRecords, setMyRecords] = useState(formatData(dummyData))
    
  const handleColorChange = (id) => {
    setMyRecords((prevState) => {
      return prevState.map((item) => {
        if(item.id === id) {
          return {...item, isActive: !item.isActive}
        }else {
          return item;
        }
      })
    })
  }
    
  
  return (
    <div class="basic">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>LastName</th>
          </tr>
        </thead>
        <tbody>
          {myRecords.map((current) => (
            <tr key={current.id} 
                onClick={() => handleColorChange(current.id)} 
                style={{
                   backgroundColor: current.isActive ? 'crimson' : '',
                }}
                >
              <td>{current.Name}</td>
              <td>{current.LastName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};