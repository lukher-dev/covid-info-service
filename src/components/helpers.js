import statsData from '../data/statsData.json'

export function newOrOld(field) {
    return statsData['today'][field] ? statsData['today'][field] : statsData['yesterday'][field]
}

export function updateWarning(field) {
    if (!statsData['today'][field]) {
        return <span className='adnotation text-danger m-0'>(Wczorajsza wartość)</span>
    }
}

export function percentageDifference(field) {
    if (!statsData['today'][field]) {
        return null
    }
    const value = Math.ceil(((statsData['today'][field] / statsData['yesterday'][field]) - 1) * 10000) / 100
    if (value > 0)
        return <span className='adnotation text-danger'>({value}%↗)</span>
    if (value === 0)
        return <span className='adnotation text-secondary'>(-%)</span>
    return <span className='adnotation text-success'>({value}%↘)</span>
}

function labelCreator(value, max) {
    if (max)
        return <div>{Math.floor(Math.min(value, max)).toString() + '/' + max.toString()}</div>
    return <div>{value.toString()}</div>
}

export function doomCounterValue() {
    var avg = newOrOld('the_average')
    const max = 80 / 100
    const doomCounterValues = []
    const doomCounterlabels = []
    if (avg < 10) {
        doomCounterValues.push(avg / max)
        doomCounterValues.push(0)
        doomCounterValues.push(0)
        doomCounterValues.push(0)
        doomCounterValues.push(0)

        doomCounterlabels.push(labelCreator(avg, 10))
        doomCounterlabels.push('')
        doomCounterlabels.push('')
        doomCounterlabels.push('')
        doomCounterlabels.push('')
    } else if (avg < 25) {
        doomCounterValues.push(10 / max)
        doomCounterValues.push((avg - 10) / max)
        doomCounterValues.push(0)
        doomCounterValues.push(0)
        doomCounterValues.push(0)

        doomCounterlabels.push('')
        doomCounterlabels.push(labelCreator(avg, 25))
        doomCounterlabels.push('')
        doomCounterlabels.push('')
        doomCounterlabels.push('')
    } else if (avg < 50) {
        doomCounterValues.push(10 / max)
        doomCounterValues.push(15 / max)
        doomCounterValues.push((avg - 25) / max)
        doomCounterValues.push(0)
        doomCounterValues.push(0)

        doomCounterlabels.push('')
        doomCounterlabels.push('')
        doomCounterlabels.push(labelCreator(avg, 50))
        doomCounterlabels.push('')
        doomCounterlabels.push('')
    } else if (avg < 70) {
        doomCounterValues.push(10 / max)
        doomCounterValues.push(15 / max)
        doomCounterValues.push(25 / max)
        doomCounterValues.push((avg - 50) / max)
        doomCounterValues.push(0)

        doomCounterlabels.push('')
        doomCounterlabels.push('')
        doomCounterlabels.push('')
        doomCounterlabels.push(labelCreator(avg, 70))
        doomCounterlabels.push('')
    } else {
        doomCounterValues.push(10 / max)
        doomCounterValues.push(15 / max)
        doomCounterValues.push(25 / max)
        doomCounterValues.push(20 / max)
        doomCounterValues.push((avg - 70) / max)

        doomCounterlabels.push('')
        doomCounterlabels.push('')
        doomCounterlabels.push('')
        doomCounterlabels.push('')
        doomCounterlabels.push(labelCreator(avg))
    }
    return [doomCounterValues, doomCounterlabels, avg]
}

export function insertThinSpace(number) {
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, "\u2009");
}