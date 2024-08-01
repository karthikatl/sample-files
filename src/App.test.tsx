// src/App.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';

describe('App', () => {
  it('renders the File Explorer header', () => {
    render(<Provider store={store}><App /></Provider>);
    const headerElement = screen.getByText(/File Explorer/i);
    expect(headerElement).toBeInTheDocument();
  });

  it('renders the FileExplorer component', () => {
    render(<Provider store={store}><App /></Provider>);
    const fileExplorerElement = screen.getByTestId('file-explorer');
    expect(fileExplorerElement).toBeInTheDocument();
  });
});
