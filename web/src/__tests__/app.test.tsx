import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../app';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Kraaft/i);
  expect(linkElement).toBeInTheDocument();
});

test('sends message', async () => {
  render(<App />);
  userEvent.type(screen.getByRole('textbox'), 'Hello World');
  expect(screen.getByRole('textbox')).toHaveValue('Hello World');
  expect(screen.getByText('Envoyer')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Envoyer'));
  expect(screen.getByRole('textbox')).toHaveValue('');
  expect(screen.getByText('Hello World')).toBeInTheDocument();
});

test('sends message with mention', async () => {
  render(<App />);
  userEvent.type(screen.getByRole('textbox'), 'Hello @Maxime');
  const mentions = screen.getAllByText('@Maxime', { exact: false });
  expect(mentions[0]).toHaveStyle('color: #ff7675');

  expect(screen.getByText('Envoyer')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Envoyer'));
  expect(screen.getByRole('textbox')).toHaveValue('');
  expect(
    screen.getAllByText('@Maxime', { exact: false }).length,
  ).toBeGreaterThan(mentions.length);
});
