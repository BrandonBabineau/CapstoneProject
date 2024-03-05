import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  const mockFetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message: 'Login successful' }),
    })
  );
  global.fetch = mockFetch;

  beforeEach(() => {
    localStorage.clear();
  });

  it('renders login form when not logged in', () => {
    const { getByLabelText, getByText } = render(<LoginForm />);
    const usernameInput = getByLabelText('Username:');
    const passwordInput = getByLabelText('Password:');
    const loginButton = getByText('Login');

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('submits login form and logs in successfully', async () => {
    const { getByLabelText, getByText } = render(<LoginForm />);
    const usernameInput = getByLabelText('Username:');
    const passwordInput = getByLabelText('Password:');
    const loginButton = getByText('Login');

    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    expect(localStorage.getItem('loggedIn')).toBe('true');
  });

  it('displays error message on login failure', async () => {
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Invalid credentials' }),
      })
    );

    const { getByLabelText, getByText } = render(<LoginForm />);
    const usernameInput = getByLabelText('Username:');
    const passwordInput = getByLabelText('Password:');
    const loginButton = getByText('Login');

    fireEvent.change(usernameInput, { target: { value: 'invalidUser' } });
    fireEvent.change(passwordInput, { target: { value: 'invalidPassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    expect(localStorage.getItem('loggedIn')).toBeNull();
    expect(getByText('Invalid credentials')).toBeInTheDocument();
  });
});


  
