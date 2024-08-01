
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, fireEvent, screen } from '@testing-library/react';
import FileExplorer from '../components/FileExplorer';
import filesReducer from '../files/filesSlice';
import { FilesState } from '../types/datatypes';
import {fileData} from '../data/fileData';


const renderWithStore = (component: React.ReactElement, initialState: FilesState) => {
  const store = configureStore({
    reducer: { files: filesReducer },
    preloadedState: { files: initialState }
  });

  return render(<Provider store={store}>{component}</Provider>);
};
let initialState: FilesState;

  beforeEach(() => {
    initialState = {
      files: fileData,
      visibleFiles: [...fileData]  
    };
  });
describe('FileExplorer', () => {
  it('renders with initial state', () => {
   

    const { getByText } = renderWithStore(<FileExplorer />, initialState);
    expect(getByText('Employee Handbook')).toBeInTheDocument();
  });
 
it('renders all files initially', () => {
    const { getByText } = renderWithStore(<FileExplorer />, initialState);
    expect(getByText('Employee Handbook')).toBeInTheDocument();
    expect(getByText('Public Holiday policy')).toBeInTheDocument();
    expect(getByText('Expenses')).toBeInTheDocument();
    expect(getByText('Salary')).toBeInTheDocument();
  });
 
  
  
  it('sorts files by date in ascending and then descending order', async () => {
    const { getByText, findAllByText } = renderWithStore(<FileExplorer />, initialState);
    
   
    const dateSortButton = getByText(/Date/);
  
    // First click - sort ascending
    fireEvent.click(dateSortButton);
    let files = await findAllByText(/Document|Public|Expenses|Salary/);
    expect(files[0]).toHaveTextContent('Public Holiday policy'); 
    expect(files[files.length - 1]).toHaveTextContent('Salary');
  
    // Second click - sort descending
    fireEvent.click(dateSortButton);
    files = await findAllByText(/Document|Public|Expenses|Salary/);
    expect(files[0]).toHaveTextContent('Expenses'); 
    expect(files[files.length - 1]).toHaveTextContent('Public Holiday policy'); 
  });
});
