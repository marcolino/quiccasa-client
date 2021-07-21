import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../components/App';

test('renders Home screen', async () => {
  const { container } = render(<App />);
  await waitForElementToBeRemoved(await container.querySelector("circle")); // wait for the spinner to be removed from DOM  
  expect(screen.getAllByText(/Home/i)[0]).toBeInTheDocument(); // check the presence of text "Home" in the DOM
});

// TODO: learn toMatchSnapshot() ...
