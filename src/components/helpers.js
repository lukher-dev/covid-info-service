import statsData from '../data/statsData.json'

export function newOrOld(field) {
    return statsData['today'][field] ? statsData['today'][field] : statsData['yesterday'][field]
}

export function updateWarning(field) {
    if (!statsData['today'][field]) {
        return <p className='adnotation text-danger m-0'>(Wczorajsza wartość)</p>
    }
}

export function percentageDifference(field) {
    if (!statsData['today'][field]) {
        return null
    }
    const value = Math.floor(((statsData['today'][field] / statsData['yesterday'][field]) - 1) * 100)
    if (value > 0)
        return <div className='adnotation text-danger'>({value}%↗)</div>
    if (value === 0)
        return <div className='adnotation text-secondary'>(-%)</div>
    return <div className='adnotation text-success'>({value}%↘)</div>
}

export function doomCounterValue() {
    var sum = 0;
    for (var i = 0; i < statsData.casesHistory.length; i++) {
        sum += parseInt(statsData.casesHistory[i], 10);
    }
    var avg = (sum / statsData.casesHistory.length) / 37832148 * 100000;

    const max = 75 / 100
    const doomCounterValues = []
    const doomCounterActualValues = []
    if (avg < 10) {
        doomCounterValues.push(avg / max)
        doomCounterValues.push(0)
        doomCounterValues.push(0)
        doomCounterValues.push(0)
        doomCounterValues.push(0)

        doomCounterActualValues.push(avg)
        doomCounterActualValues.push(0)
        doomCounterActualValues.push(0)
        doomCounterActualValues.push(0)
        doomCounterActualValues.push(0)
    } else if (avg < 25) {
        doomCounterValues.push(10 / max)
        doomCounterValues.push((avg - 10) / max)
        doomCounterValues.push(0)
        doomCounterValues.push(0)
        doomCounterValues.push(0)

        doomCounterActualValues.push(10)
        doomCounterActualValues.push(avg)
        doomCounterActualValues.push(0)
        doomCounterActualValues.push(0)
        doomCounterActualValues.push(0)
    } else if (avg < 50) {
        doomCounterValues.push(10 / max)
        doomCounterValues.push(15 / max)
        doomCounterValues.push((avg - 25) / max)
        doomCounterValues.push(0)
        doomCounterValues.push(0)

        doomCounterActualValues.push(10)
        doomCounterActualValues.push(25)
        doomCounterActualValues.push(avg)
        doomCounterActualValues.push(0)
        doomCounterActualValues.push(0)
    } else if (avg < 70) {
        doomCounterValues.push(10 / max)
        doomCounterValues.push(15 / max)
        doomCounterValues.push(25 / max)
        doomCounterValues.push((avg - 50) / max)
        doomCounterValues.push(0)

        doomCounterActualValues.push(10)
        doomCounterActualValues.push(25)
        doomCounterActualValues.push(50)
        doomCounterActualValues.push(avg)
        doomCounterActualValues.push(0)
    } else {
        doomCounterValues.push(10 / max)
        doomCounterValues.push(15 / max)
        doomCounterValues.push(25 / max)
        doomCounterValues.push(20 / max)
        doomCounterValues.push((avg - 70) / max)

        doomCounterActualValues.push(10)
        doomCounterActualValues.push(25)
        doomCounterActualValues.push(50)
        doomCounterActualValues.push(70)
        doomCounterActualValues.push(avg)
    }

    return [doomCounterValues, doomCounterActualValues, avg]
}

export function insertThinSpace(number) {
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, "\u2009");
}