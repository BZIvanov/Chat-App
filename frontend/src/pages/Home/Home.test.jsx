import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Home from './Home';

const initialState = { user: { token: null } };
const mockStore = configureStore();
let store;

describe('Home Component', () => {
  test('Renders welcome text', () => {
    store = mockStore(initialState);
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </BrowserRouter>
    );

    const textElement = screen.getByText(/welcome/i);
    expect(textElement).toBeInTheDocument();
  });
});
