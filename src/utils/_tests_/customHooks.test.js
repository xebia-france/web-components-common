import React from 'react';
import  {useWindowSize, useWindowScroll} from "../customHooks";
import { render, fireEvent, screen } from '@testing-library/react'
import  { renderHook, act } from '@testing-library/react-hooks'

// useWindowSize

function fireResize(width, height) {
    window.innerWidth = width;
    window.innerHeight = height;
    window.dispatchEvent(new Event('resize'))
}

// Test component that uses the Hook
function EffecfulComponent() {
    //const windowsize = useWindowSize()
    const { result } = renderHook(() => useWindowSize())
    return <div>
        <span data-testid="span-window-width">{result.current.width}</span>
        <span data-testid="span-window-height">{result.current.height}</span>
    </div>
}

describe('custom Hook useWindowResize', () => {
    it('should update windowSize - width', () => {
        const {container, rerender} = render(<EffecfulComponent/>);
        const span = screen.getByTestId('span-window-width');

        act(() => {
            fireResize(320, 100);
        })

        // useEffect is triggered after rendering.
        // So we want to rerender the component to see the state change
        rerender(<EffecfulComponent/>)
        expect(span.textContent).toBe('320');
    });

    it('custom Hook useWindowResize - should update windowSize - height', () => {
        const {container, rerender} = render(<EffecfulComponent/>);
        const span = screen.getByTestId('span-window-height');

        act(() => {
            fireResize(320, 200);
        })

        // useEffect is triggered after rendering.
        // So we want to rerender the component to see the state change
        rerender(<EffecfulComponent/>)
        expect(span.textContent).toBe('200');
    });

});
// useWindowSize

function fireScroll(y) {
    window.scrollY = y;
    window.dispatchEvent(new Event('scroll'))
}

// Test component that uses the Hook
function EffecfulScrollComponent() {
    const { result } = renderHook(() => useWindowScroll())
    return <div>
        <span data-testid="span-window-scroll-y">{result.current.y}</span>
    </div>
}

describe('custom Hook useWindowScroll', () => {

    it('should update windowScroll - y', () => {
        const { container, rerender } = render(<EffecfulScrollComponent/>);
        const span =  screen.getByTestId('span-window-scroll-y');

        act(() => {
            fireScroll(100);
        })

        // useEffect is triggered after rendering.
        // So we want to rerender the component to see the state change
        rerender(<EffecfulScrollComponent/>)
        expect(span.textContent).toBe('100');
    });
});

