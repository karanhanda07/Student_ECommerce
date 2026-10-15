import { render, screen } from '@testing-library/react';
import App from './App';


jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));


test('renders StudentEcom homepage', () => {
  render(<App />);

  expect(
    screen.getByRole('heading', {
      name: /Buy\. Sell\. Support\s+Your Campus\./i,
    })
  ).toBeInTheDocument();
});