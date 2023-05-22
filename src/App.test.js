import { fireEvent, render, screen, act } from '@testing-library/react';
import App from './App';

test('Verify App component renders without crashing', () => {
  render(<App />);
});
test('Verify scenario a', async () => {
  render(<App />);
  const field = screen.getByTestId('input_f')
  expect(field).toBeInTheDocument()
  fireEvent.change(field, { target: { value: 'a' } });
  expect(field.value).toBe('a');
  await act(async () => {
    const btn = screen.getByTestId("btn")
    fireEvent.click(btn)
  })
  const v = screen.getByTestId("op")
  expect(v.textContent).toBe("OUTPUT : 5")
})
test('Verify scenario aA1', async () => {
  render(<App />);
  const field = screen.getByTestId('input_f')
  expect(field).toBeInTheDocument()
  fireEvent.change(field, { target: { value: 'aA1' } });
  expect(field.value).toBe('aA1');
  await act(async () => {
    const btn = screen.getByTestId("btn")
    fireEvent.click(btn)
  })
  const v = screen.getByTestId("op")
  expect(v.textContent).toBe("OUTPUT : 3")
})
test('Verify scenario 1337C0d3', async () => {
  render(<App />);
  const field = screen.getByTestId('input_f')
  expect(field).toBeInTheDocument()
  fireEvent.change(field, { target: { value: '1337C0d3' } });
  expect(field.value).toBe('1337C0d3');
  await act(async () => {
    const btn = screen.getByTestId("btn")
    fireEvent.click(btn)
  })
  const v = screen.getByTestId("op")
  expect(v.textContent).toBe("OUTPUT : 0")
})