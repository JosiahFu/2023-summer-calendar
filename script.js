import { h, Component, render, useEffect } from 'https://esm.sh/preact';
import htm from 'https://esm.sh/htm';

// Initialize htm with Preact
const html = htm.bind(h);

function App () {
    const start = new Date('2023-06-08 00:00');
    const end = new Date('2023-08-01 00:00'); // TODO find end date

    const [today, setToday] = useState();

    useEffect(() => {
        const update = () => {
            const newToday = new Date();
            newToday.setHours(0, 0, 0, 0);
        }
        setInterval()
    }, []);
    today.setHours(0, 0, 0, 0); // Set to 00:00 for consistency
    
    let boxes = [];

    for (let i = start; i <= end; i.setDate(i.getDate() + 1)) {
        const passed = i < today;
        boxes.push(html`<${CalendarDateBox} daynum=${i.getDate()} passed=${passed} />`);
    }
    
    return html`<main>${boxes}</main>`;
}

/**
 * 
 * @param {Object} param0 
 * @param {number} param0.daynum
 * @param {boolean} param0.passed
 */
function CalendarDateBox({daynum, passed}) {
    return html`<div className="date${passed ? ' passed' : ''}">${daynum}</div>`;
}

render(html`<${App} />`, document.getElementById('root'));
