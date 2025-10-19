import { useEffect, useRef } from 'react';
import Vara from 'vara';

function VaraText({ text, fontURL, options }) {

    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;
        if (!containerRef.current.id) containerRef.current.id = 'vara-container';
        const vara = new Vara(
            `#${containerRef.current.id}`,
            fontURL,
            [{ text, ...options}],
            { color: options.color, fontSize: options.fontSize, strokeWidth: options.strokeWidth, textAlign: 'center' }
        );
        return () => {
            const el = document.getElementById('vara-container')
            if (el) el.innerHTML = '';
        }
    }, [text, fontURL, options])

    return (
        <div ref={containerRef}/>
    )
}

export default VaraText;