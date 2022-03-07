import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
//import renderer from "react-test-renderer";
import App from "../components/App";

test("renders Home screen", async () => {
  const { container } = render(<App />);
  const spinner = await container.querySelector("svg"); // define the spinner selector
  if (spinner) await waitForElementToBeRemoved(spinner); // wait for the spinner to be removed from DOM  

  expect(screen.getAllByText(/Quiccasa/i)[0]).toBeInTheDocument(); // check the presence of text "Home" in the DOM

  //console.log('container:', container);

  expect(container).toMatchSnapshot();

  // jest.mock('react-i18next', () => ({
  //   useTranslation: () => ({t: key => key})
  // }));
});

// TODO: learn toMatchSnapshot() ...
