import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import SignUp from './SignUp';
import { register } from '../services/authService';

// Mock the register function
jest.mock('../services/authService', () => ({
  register: jest.fn(),
}));

describe('SignUp Component', () => {
  it('renders the form correctly', () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );

    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });

  it('submits the form successfully', async () => {
    (register as jest.Mock).mockResolvedValueOnce({});

    render(
      <Router>
        <SignUp />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    await waitFor(() => {
      expect(register).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(register).toHaveBeenCalledTimes(1);
    });

    // Assuming navigate is mocked, you can test for navigation behavior as well
    // To fully test navigation, you would need to mock `useNavigate` and check its calls
  });

  it('handles registration failure', async () => {
    (register as jest.Mock).mockRejectedValueOnce(new Error('Registration failed'));

    render(
      <Router>
        <SignUp />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    await waitFor(() => {
      expect(register).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(register).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/Registration failed/i)).toBeInTheDocument();
    });
  });
});
