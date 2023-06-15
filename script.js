import { h, Component, render } from 'https://esm.sh/preact';
import { useEffect, useState, useRef, useCallback } from 'https://esm.sh/preact/hooks';
import htm from 'https://esm.sh/htm';
import 'https://esm.sh/preact/debug';

// Initialize htm with Preact
const html = htm.bind(h);

/**
 * 
 * @param  {...(string | [className: string, condition: boolean])} classNames 
 */
function classList(...classNames) {
    return classNames
        .map(e => typeof e === 'string' ? e : (e[1] ? e[0] : null))
        .filter(e => e !== null)
        .join(' ');
}

function App () {
    const mainRef = useRef(null);
    const [scale, setScale] = useState(1);

    const fixScale = useCallback(() => {
        const hscale = window.innerHeight / mainRef.current.offsetHeight;
        const wscale = window.innerWidth / mainRef.current.offsetWidth;
        setScale(Math.min(hscale, wscale));
    }, [mainRef, setScale]);

    useEffect(() => {
        fixScale();
        window.addEventListener('resize', fixScale);
        return () => window.removeEventListener('resize', fixScale);
    }, [fixScale]);

    const start = new Date('2023-06-08 00:00');
    const end = new Date('2023-08-13 00:00'); // TODO verify end date

    const [today, setToday] = useState(() => {const date = new Date(); date.setHours(0, 0, 0, 0); return date;});

    useEffect(() => {
        const update = () => {
            const newToday = new Date();
            newToday.setHours(0, 0, 0, 0);
            setToday(newToday);
            // setToday(new Date('2023-07-05 00:00')); // TESTING
        }
        setInterval(update, 5 * 60 * 1000);
    }, []);

    today?.setHours(0, 0, 0, 0); // Set to 00:00 for consistency
    
    let boxes = [];

    for (let i = 0; i < start.getDay(); i++) {
        boxes.push(html`<div className="spacer"></div>`)
    }

    for (let i = start; i <= end; i?.setDate(i?.getDate() + 1)) {
        const passed = i < today;
        boxes.push(html`<${CalendarDateBox} daynum=${i.getDate()} passed=${passed} />`);
    }
    
    return html`<main ref=${mainRef} style=${{transform: `scale(${scale})`}}>${boxes}</main>`;
}

/**
 * 
 * @param {Object} param0 
 * @param {number} param0.daynum
 * @param {boolean} param0.passed
 */
function CalendarDateBox({daynum, passed}) {
    const [animate, setAnimate] = useState(!passed);

    return html`<div className=${classList('date', ['passed', passed], ['animate', animate])}>${daynum}</div>`;
}

render(html`<${App} />`, document.getElementById('root'));
