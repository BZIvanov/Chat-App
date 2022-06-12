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

  test('Render chat button for logged in user', () => {
    const copiedState = {
      ...initialState,
      user: { ...initialState.user, token: 'usertoken' },
    };
    store = mockStore(copiedState);
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </BrowserRouter>
    );

    const chatButton = screen.getByRole('link', {
      name: /chat/i,
    });
    expect(chatButton).toBeInTheDocument();
  });
});
