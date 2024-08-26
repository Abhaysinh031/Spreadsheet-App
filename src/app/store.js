
import { create } from 'zustand';

// Function to validate cell content
const validateCell = (value, index) => {
  if (index % 2 === 0 && isNaN(value)) return '';
  return value;
};

// Load initial state from local storage (only on client-side)
const loadCellsFromLocalStorage = () => {
  if (typeof window === 'undefined') {
    return Array(1000).fill({ value: '', alignment: 'left', fontSize: 'text-base' }); // Fallback for server-side rendering
  }
  const savedCells = localStorage.getItem('cells');
  if (savedCells) {
    return JSON.parse(savedCells);
  }
  // Default to 1000 blank cells if no data is found
  return Array(1000).fill({ value: '', alignment: 'left', fontSize: 'text-base' });
};

// Save state to local storage (only on client-side)
const saveCellsToLocalStorage = (cells) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cells', JSON.stringify(cells));
  }
};

// Zustand store definition
const useStore = create((set) => ({
  cells: loadCellsFromLocalStorage(),
  searchQuery:'',
  itemsPerPage: 100,
  currentPage: 0,
  history: [],
  historyIndex: -1,
  future: [],
  selectedCells: [], 
  // setSelectedCells: (selected) => set({ selectedCells: selected }),
  setSelectedCells: (selected) => set({ selectedCells: selected }), 
  hasChanges: false, 
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Function to update cell content with validation
  updateCell: (index, value) => {
    const start = state.currentPage * state.itemsPerPage;
    const end = start + state.itemsPerPage;

    const validatedValue = validateCell(value, index);
    set((state) => {
      const cells = [...state.cells];
      const prevCells = [...state.cells];
      cells[index] = { ...cells[index], value: validatedValue };
      saveCellsToLocalStorage(cells); // Save updated cells to local storage
      return {
        cells,
        history: [...state.history, prevCells],
        future: [],
        hasChanges: true, // Set hasChanges to true when a change is made
      };
    });
  },

  // Function to update cell formatting
  updateCellFormatting: (alignment, fontSize, selectedCells) => set((state) => {
    const cells = state.cells.map((cell ,index) => ({
      ...cell,
      alignment,
      fontSize,
    }));
    
    saveCellsToLocalStorage(cells); // Save updated cells to local storage
    return { 
      cells,
      hasChanges: true, // Set hasChanges to true when formatting is changed
    };
  }),

  // Undo functionality
  undo: () => set((state) => {
    if (state.history.length > 0) {
      const previousState = state.history[state.history.length - 1];
      return {
        cells: previousState,
        history: state.history.slice(0, -1),
        future: [state.cells, ...state.future],
        hasChanges: state.history.length > 1, // Set hasChanges to true when undo is performed
      };
    }
  }),

  // Redo functionality
  redo: () => set((state) => {
    if (state.future.length > 0) {
      const nextState = state.future[0];
      return {
        cells: nextState,
        future: state.future.slice(1),
        history: [...state.history, state.cells],
        hasChanges: true, // Set hasChanges to true when redo is performed
      };
    }
  }),

  // Function to set search query
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Filter cells based on search query
  filteredCells: (state) => state.cells.filter(cell =>
    cell.value.includes(state.searchQuery)),

  // Function to paginate cells
  paginateCells: (state) => {
    const start = state.currentPage * state.itemsPerPage;
    const end = start + state.itemsPerPage;
    return state.filteredCells(state).slice(start, end);
  },

  // Function to go to next page
  nextPage: () => set(state => ({ currentPage: state.currentPage + 1 })),

  // Function to go to previous page
  prevPage: () => set(state => ({ currentPage: Math.max(state.currentPage - 1, 0) })),
}));

export { useStore };
