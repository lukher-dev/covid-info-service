import statsData from '../data/statsData.json'

export function newOrOld(field) {
    return statsData['today'][field] ? statsData['today'][field] : statsData['yesterday'][field]
}

export function updateWarning(field) {
    if (!statsData['today'][field]) {
        return <p className='adnotation text-danger m-0'>(wartość wczorajsza)</p>
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