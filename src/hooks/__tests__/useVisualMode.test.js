import { renderHook, act } from "@testing-library/react-hooks";
import useVisualMode from "hooks/useVisualMode";

const FIRST = "FIRST";
const SECOND = "SECOND";
const THIRD = "THIRD";

test("useVisualMode should initialize with default value", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));
  console.log('first test result', result)
  expect(result.current.mode).toBe(FIRST);
});

// test("useVisualMode should transition to another mode", () => {
//   const { result } = renderHook(() => useVisualMode(FIRST));
//   //console.log('second test result', result.current)
//   act(() => result.current.transition(SECOND));
//   //console.log('second test result transition', result.current)
//   expect(result.current.mode).toBe(SECOND);
// });

// test("useVisualMode should return to previous mode", () => {
//   const { result } = renderHook(() => useVisualMode(FIRST));

//   act(() => result.current.transition(SECOND));
//   console.log('mode 1', result.current.mode)
//   expect(result.current.mode).toBe(SECOND);

//   act(() => result.current.transition(THIRD));
//   console.log('mode 2', result.current.mode)
//   expect(result.current.mode).toBe(THIRD);

//   act(() => result.current.back());
//   console.log('mode 3', result.current.mode)
//   expect(result.current.mode).toBe(SECOND);

//   act(() => result.current.back());
//   console.log('mode 4', result.current.mode)
//   expect(result.current.mode).toBe(FIRST);
// });

// test("useVisualMode should not return to previous mode if already at initial", () => {
//   const { result } = renderHook(() => useVisualMode(FIRST));

//   act(() => result.current.back());
//   expect(result.current.mode).toBe(FIRST);
// });

// test("useVisualMode should replace the current mode", () => {
//   const { result } = renderHook(() => useVisualMode(FIRST));

//   act(() => result.current.transition(SECOND));
//   expect(result.current.mode).toBe(SECOND);

//   // Passing "true" to transition(THIRD, true) says "Transition to THIRD by REPLACING SECOND"
//   act(() => result.current.transition(THIRD, true));
//   expect(result.current.mode).toBe(THIRD);

//   act(() => result.current.back());
//   expect(result.current.mode).toBe(FIRST);
// });