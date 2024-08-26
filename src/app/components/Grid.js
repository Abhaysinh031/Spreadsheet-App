"use client";

import React, {useEffect} from 'react';
import { useStore } from '../store';

const Grid = () => {
  const cells = useStore(state => state.paginateCells(state));
  const updateCell = useStore(state => state.updateCell);
  const currentPage = useStore(state => state.currentPage);
  const nextPage = useStore(state => state.nextPage);
  const prevPage = useStore(state => state.prevPage);


  const handleChange = (index, event) => {
    // Update cell content dynamically
    updateCell(index, event.target.value);
 
  };

  


  return (
    <div>
      <div className="grid grid-cols-20 gap-px bg-gray-200" >
        {cells.map((cell, index) => (
          <input
            key={index}
            type="text"
            value={cell.value}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleSelect(index)}
            className={`p-2 border border-gray-300 ${cell.alignment} ${cell.fontSize}`}
            style={{ backgroundColor: '#fff', color: '#000' }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={prevPage} className="p-2 border">Previous</button>
        <div className="mt-4 p-2 bg-black-100 text-center">
        <span>Page: {currentPage + 1}</span> 
      </div>

        <button onClick={nextPage} className="p-2 border">Next</button>
      </div>
    </div>
  );
};

export default Grid;
