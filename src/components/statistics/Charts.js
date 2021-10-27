import React, { useState } from 'react'
import { Jumbotron, Container, Row, Col } from 'react-bootstrap'
import dayjs from 'dayjs'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import historicData from '../../data/historicData.json'
import { useTranslation } from 'react-i18next'

import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

function Charts() {
  const { t } = useTranslation()
  const [shownLimit, setShownLimit] = useState(null)
  const toDayJs = (x) => dayjs(x.DATA_SHOW, 'DD.MM.YYYY HH:mm')
  const today = dayjs()
  const { rollingAverage } = historicData.reduce(
    (acc, x, i) => {
      const sumPlusCurrentDay = acc.sumOfLastSeven + x.ZAKAZENIA_DZIENNE
      if (i < 7) {
        return {
          rollingAverage: { ...acc.rollingAverage, [x.DATA_SHOW]: sumPlusCurrentDay / (i + 1) },
          sumOfLastSeven: sumPlusCurrentDay,
        }
      } else {
        const sumOfLastSeven = sumPlusCurrentDay - historicData[i - 7].ZAKAZENIA_DZIENNE
        return {
          rollingAverage: { ...acc.rollingAverage, [x.DATA_SHOW]: sumOfLastSeven / 7 },
          sumOfLastSeven: sumOfLastSeven,
        }
      }
    },
    { rollingAverage: {}, sumOfLastSeven: 0 },
  )

  const shownData = !shownLimit
    ? historicData
    : historicData.filter((day) => today.diff(toDayJs(day), 'day') <= shownLimit)
    
  const options = {
    title: {
      text: '',
    },
    rangeSelector: {
      verticalAlign: 'top',
      x: 0,
      y: 0,
    },
    yAxis: [
      {
        title: {
          text: t('chartLabelNewCases'),
        },
      },
    ],
    xAxis: {
      labels: {
        format: '{value:%b %e}',
      },
      type: 'datetime',
    },
    series: [
      {
        name: t('chartLabelNewCases'),
        data: shownData.map((day) => [toDayJs(day).valueOf(), day.ZAKAZENIA_DZIENNE]),
      },
      {
        name: t('chartLabelRollingCases'),
        data: shownData.map((day) => [toDayJs(day).valueOf(), rollingAverage[day.DATA_SHOW]]),
      },
    ],
  }

  return (
    <Jumbotron className='p-0 m-2'>
      <div className='text-center'>
        <h2>{t('chartTitle')}</h2>
      </div>
      <Container className='text-center p-4'>
        <Row>
          <Col>
            <div className='text-center'>
              <h6>{t('dataRange')}</h6>
              <div className='timeline-controls'>
                <Container>
                  <Row>
                    {[
                      [null, t('allData')],
                      [365, t('lastYear')],
                      [93, t('lastThreeMonths')],
                      [31, t('lastMonth')],
                      [7, t('lastWeek')],
                    ].map(([value, label]) => (
                      <Col lg={{ span: 2 }} md={{ span: 4 }} xs={{ span: 6 }} key={value}>
                        <button
                          className={shownLimit === value ? 'btn btn-primary' : 'btn btn-outline-primary'}
                          onClick={() => {
                            setShownLimit(value)
                          }}
                        >
                          {label}
                        </button>
                      </Col>
                    ))}
                  </Row>
                </Container>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <HighchartsReact highcharts={Highcharts} options={options} />
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  )
}

export default Charts
