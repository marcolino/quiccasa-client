import { render, screen, act } from '@testing-library/react';
import App from '../components/App';

test('renders Home screen', () => {
  act(() => {
    render(<App />);
  });
  const linkElement = screen.getAllByText(/Home/i)[0];
  expect(linkElement).toBeInTheDocument();
});

// TODO: learn toMatchSnapshot() ...
