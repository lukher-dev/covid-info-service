import React from 'react'
import { Jumbotron, Container, Row, Col } from 'react-bootstrap'
import dayjs from 'dayjs'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import historicData from '../../data/historicData.json'

import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)


function Charts() {
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
        data: historicData.map((day) => [
          dayjs(day.DATA_SHOW, 'DD.MM.YYYY HH:mm').valueOf(),
          day.ZAKAZENIA_DZIENNE,
        ]),
      },
    ],
  }

  return (
    <Jumbotron className="p-0 m-2">
      <div className='text-center'>
        <h2>Wykres nowych zakażeń</h2>
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
