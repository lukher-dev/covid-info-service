import statsData from '../data/statsData.json'

export function newOrOld(field) {
    return statsData['today'][field] ? statsData['today'][field] : statsData['yesterday'][field]
}

export function percentageDifference(field) {
    const value = Math.floor(((statsData['today'][field] / statsData['yesterday'][field]) - 1) * 100)
    if (value > 0)
        return <div className='adnotation text-danger'>{value}%↗</div>
    if (value === 0)
        return <div className='adnotation text-secondary'>-%</div>
    return <div className='adnotation text-success'>{value}%↘</div>
}