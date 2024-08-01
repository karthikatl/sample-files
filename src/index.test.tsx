// src/index.test.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

// Mock ReactDOM.render to intercept its call and assert on its arguments
jest.mock('react-dom', () => ({ render: jest.fn() }));

describe("Index", () => {
  it("renders without crashing", () => {
    require('./index.tsx');  // Load the index.tsx file which contains ReactDOM.render

    // Assert that ReactDOM.render was called with <App /> wrapped in <Provider>
    expect(ReactDOM.render).toHaveBeenCalledWith(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>,
      document.getElementById('root')
    );
  });
});
