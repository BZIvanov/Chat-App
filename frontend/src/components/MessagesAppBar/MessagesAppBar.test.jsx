import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import MessagesAppBar from './MessagesAppBar';

const initialState = { user: { token: null } };
const mockStore = configureStore();
let store;

describe('MessagesAppBar Component', () => {
  test('Renders text for no user selected', () => {
    store = mockStore(initialState);

    const selectedUser = false;
    const handleDrawerToggle = jest.fn();

    render(
      <BrowserRouter>
        <Provider store={store}>
          <MessagesAppBar
            selectedUser={selectedUser}
            handleDrawerToggle={handleDrawerToggle}
          />
        </Provider>
      </BrowserRouter>
    );

    const textElement = screen.getByText(/select an user to chat with/i);
    // screen.debug();
    expect(textElement).toBeInTheDocument();
  });

  test('Renders text for selected user', () => {
    store = mockStore(initialState);

    const selectedUser = {
      id: '12345',
      firstName: 'Iva',
      lastName: 'Ivanova',
    };
    const handleDrawerToggle = jest.fn();

    render(
      <BrowserRouter>
        <Provider store={store}>
          <MessagesAppBar
            selectedUser={selectedUser}
            handleDrawerToggle={handleDrawerToggle}
          />
        </Provider>
      </BrowserRouter>
    );

    const textElement = screen.getByText(/Chat with Iva Ivanova/);
    expect(textElement).toBeInTheDocument();
  });

  test('Open drawer is clickable button', () => {
    store = mockStore(initialState);

    const selectedUser = false;
    const handleDrawerToggle = jest.fn();

    render(
      <BrowserRouter>
        <Provider store={store}>
          <MessagesAppBar
            selectedUser={selectedUser}
            handleDrawerToggle={handleDrawerToggle}
          />
        </Provider>
      </BrowserRouter>
    );

    const drawerButton = screen.getByRole('button', {
      name: /open drawer/i,
    });
    fireEvent.click(drawerButton);
    // screen.debug();

    expect(handleDrawerToggle).toBeCalledTimes(1);
  });
});
