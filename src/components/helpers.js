import React from 'react'
import statsData from '../data/statsData.json'
import { useTranslation } from 'react-i18next'

export function newOrOld(field) {
  return statsData['today'][field] || statsData['yesterday'][field]
}

export function updateWarning(field) {
  const { t } = useTranslation()
  return !statsData['today'][field] ? <span className='adnotation text-danger m-0'>({t('outdatedValue')})</span> : <></>
}

export function percentageDifference(field) {
  if (statsData['today'][field]) {
    const value = Math.ceil((statsData['today'][field] / statsData['yesterday'][field] - 1) * 10000) / 100
    const { nameOfClass, content } =
      value > 0
        ? { nameOfClass: 'adnotation text-danger', content: `(${value}%↗)` }
        : value === 0
          ? { nameOfClass: 'adnotation text-secondary', content: '(-%)' }
          : { nameOfClass: 'adnotation text-success', content: `(${value}%↘)` }
    return <span className={nameOfClass}>{content}</span>
  } else {
    return <></>
  }
}

function labelCreator(value, max) {
  return (
    <div>
      {max
        ? Math.floor(Math.min(value, max)).toString() + '/' + max.toString()
        : (Math.ceil(value * 100) / 100).toString()}
    </div>
  )
}

export function doomCounterValue() {
  const steps = [3800, 9400, 19000, 27000]
  const stepsProcessed = [steps[0], ...[...Array(steps.length - 1).keys()].map((i) => steps[i + 1] - steps[i]), 4000]
  const max = 31000 / 100

  const avg = newOrOld('the_average')
  const indexOfLabeledPart = [...steps, Infinity].findIndex((x) => x > avg)
  const doomCounterValues = stepsProcessed.map(
    (x, i) =>
      (i < indexOfLabeledPart ? x : i === indexOfLabeledPart ? avg - (i > 0 ? steps[indexOfLabeledPart - 1] : 0) : 0) /
      max,
  )
  const doomCounterlabels = stepsProcessed.map((_, i) =>
    i === indexOfLabeledPart ? labelCreator(avg, i > 0 ? steps[i] : null) : '',
  )
  return [steps, stepsProcessed, max, doomCounterValues, doomCounterlabels, avg]
}

export function insertThinSpace(number) {
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, '\u2009')
}
