import React, { useState } from 'react'
import { Jumbotron, Container, Row, Col } from 'react-bootstrap'
import dayjs from 'dayjs'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import historicData from '../../data/historicData.json'

import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

function Charts() {
  const [shownLimit, setShownLimit] = useState(null)
  const today = dayjs()
  const shownData = !shownLimit ? historicData : historicData.filter(
    (day) => today.diff(dayjs(day.DATA_SHOW, 'DD.MM.YYYY HH:mm'), 'day') <= shownLimit
  )
  const options = {
    title: {
      text: '',
    },
    rangeSelector: {
      verticalAlign: 'top',
      x: 0,
      y: 0
    },
    yAxis: [{
      title: {
        text: 'Liczba zakażeń'
      },
    }],
    xAxis: {
      labels: {
        format: '{value:%b %e}'
      },
      type: 'datetime',
    },
    series: [
      {
        name: 'Liczba nowych zakażeń',
        data: shownData.map((day) => [
          dayjs(day.DATA_SHOW, 'DD.MM.YYYY HH:mm').valueOf(),
          day.ZAKAZENIA_DZIENNE,
        ]),
      },
      {
        name: 'Średnia liczba zakażeń z 7 dni',
        data: shownData.map((day, index) => [
          dayjs(day.DATA_SHOW, 'DD.MM.YYYY HH:mm').valueOf(),
          index < 7 ? 0 : (shownData.slice(index-7, index).map(x => x.ZAKAZENIA_DZIENNE).reduce((a, b) => a + b) / 7)
        ]),
      },
    ],
  }

  return (
    <Jumbotron className="p-0 m-2">
      <div className='text-center'>
        <h2>Wykres nowych zakażeń</h2>
      </div>
      <div className='text-center'>
        <h7>Zakres pokazywanych danych</h7>
        {
          [
            [null, 'Od zarania dziejów'],
            [365, 'Ostatni rok'],
            [31, 'Ostatni miesciąc'],  
            [7, 'Ostatni tydzień'],  
          ].map(([value, label]) => (
            <button
              key={value}
              className={shownLimit === value ? 'btn btn-primary' : 'btn btn-outline-primary'}
              onClick={() => {
                setShownLimit(value)
              }}
            >{label}</button>
          ))
        }
      </div>
      <Container className="text-center p-4">
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
