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
    let steps = [3800, 9400, 19000, 27000]
    let stepsProcessed = steps.map(x => x)
    for (let i = 1; i < steps.length; i++) {
        stepsProcessed[i] = steps[i] - steps[i - 1]
    }
    stepsProcessed.push(4000)
    const max = 31000 / 100

    var avg = newOrOld('the_average')
    const doomCounterValues = []
    const doomCounterlabels = []
    for (let i = 0; i < 5; i++) {
        if (avg < steps[i] || i >= steps.length) {
            for (let j = 0; j < 5; j++) {
                if (j < i) {
                    doomCounterValues.push(stepsProcessed[j] / max)
                    doomCounterlabels.push('')
                }
                if (j == i) {
                    if (i >= steps.length) {
                        doomCounterValues.push((avg - steps[i - 1]) / max)
                        doomCounterlabels.push(labelCreator(avg))
                        break
                    }
                    if (i == 0) {
                        doomCounterValues.push(avg / max)
                        doomCounterlabels.push(labelCreator(avg))
                        break
                    }
                    doomCounterValues.push((avg - steps[j - 1]) / max)
                    doomCounterlabels.push(labelCreator(avg, steps[j]))
                }
                if (j > i) {
                    doomCounterValues.push(0)
                    doomCounterlabels.push('')
                }
            }
            break
        }
    }
    return [steps, stepsProcessed, max, doomCounterValues, doomCounterlabels, avg]
}

export function insertThinSpace(number) {
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, "\u2009");
}