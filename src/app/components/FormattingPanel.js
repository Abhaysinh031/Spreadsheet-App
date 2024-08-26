"use client";

import React, { useState, useEffect  } from 'react';
import { useStore } from '../store';
import style from './FormatingPanel.css';
const FormattingPanel = () => {
  const [alignment, setAlignment] = useState('left');
  const [fontSize, setFontSize] = useState('text-base');


  // Access Zustand store functions
  const { setSearchQuery, updateCellFormatting, undo, redo, hasChanges, cells  } = useStore(state => ({
    setSearchQuery: state.setSearchQuery,
    updateCellFormatting: state.updateCellFormatting,
    undo: state.undo,
    redo: state.redo,
    hasChanges: state.hasChanges,
    cells: state.cells,
  }));



  const applyFormatting = () => {
    updateCellFormatting(alignment, fontSize);
  };
  return (
    <div id='container' className="p-4 space-y-4">
      <div id='alignment-size-apply' className="flex flex-col sm:flex-row sm:space-x-1 space-y-1 sm:space-y-0">
        <select 
          value={alignment} 
          onChange={(e) => setAlignment(e.target.value)} 
          className="p-2 border" style={{ backgroundColor: '#fff', color: '#000' }}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
        <select 
          value={fontSize} 
          onChange={(e) => setFontSize(e.target.value)} 
          className="p-2 border" style={{ backgroundColor: '#fff', color: '#000' }}
        >
          <option value="text-base">Normal</option>
          <option value="text-lg">Large</option>
          <option value="text-sm">Small</option>
        </select>
        <button 
          onClick={applyFormatting} 
          className="p-2 border"
        >
          Apply
        </button>
      </div>
      
      <div id='undo-redo' className={`flex ${hasChanges ? 'flex-row' : 'flex-col'} space-x-2`}>
        {hasChanges && (
          <>
            <button 
              onClick={undo} 
              className="p-2 border"
            >
              Undo
            </button>
            <button 
              onClick={redo} 
              className="p-2 border"
            >
              Redo
            </button>
          </>
        )}
      </div>
      <div className='search'>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 border mt-2"
        style={{ backgroundColor: '#fff', color: '#000' }}
      />
      </div>
    </div>
  );
};

export default FormattingPanel;
