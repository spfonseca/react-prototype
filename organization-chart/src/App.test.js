import { render, screen } from '@testing-library/react';
import App from './App';

test('renders organization chart title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Organization Chart/i);
  expect(linkElement).toBeInTheDocument();
}); 