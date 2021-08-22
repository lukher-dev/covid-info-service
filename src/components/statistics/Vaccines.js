import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Jumbotron, Container, Row, Col, ProgressBar } from 'react-bootstrap'
import { insertThinSpace } from '../helpers'

const adultPopulation = 32_495_000

function Vaccines() {
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get('https://services-eu1.arcgis.com/zk7YlClTgerl62BY/arcgis/rest/services/global_szczepienia_actual_widok/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&resultOffset=0&resultRecordCount=1&resultType=standard&cacheHint=true', {
    }).then(response => {
      if(response.data && response.data.features && response.data.features[0].attributes)
        setData(response.data.features[0].attributes)
    })
  }, [])

  if(!data)
    return null
  const percentageToday = Math.ceil((data.DAWKA_2_SUMA / adultPopulation) * 10000) / 100
  const percentageFuture = Math.ceil(((data.SZCZEPIENIA_SUMA - data.DAWKA_2_SUMA) / adultPopulation) * 10000) / 100
  return (
    <div>
      <Jumbotron className='p-0 m-2' >
        <div className='text-center'>
          <h2>Szczepienia</h2>
        </div>
        <Container className='text-center pt-2' >
          <Row>
            <Col>
              <p className='m-0'>Ostatnia aktualizacja: {data.DATA_SHOW}</p>
              <hr className='m-2' />
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 4, order: 1 }} xs={{ span: 6, order: 1 }} className='mb-3'>
              <h6>Szczepienia ogółem:</h6>
              <h4 className='m-0'>{insertThinSpace(data.SZCZEPIENIA_SUMA.toString())}</h4>
            </Col>
            <Col md={{ span: 4, order: 2 }} xs={{ span: 12, order: 3 }} className='mb-3'>
              <h6>Drugie dawki ogółem:</h6>
              <h4 className='m-0'>{insertThinSpace(data.DAWKA_2_SUMA.toString())}</h4>
            </Col>
            <Col md={{ span: 4, order: 3 }} xs={{ span: 6, order: 2 }} className='mb-3'>
              <h6>Szczepienia w ciągu ostatniej doby:</h6>
              <h4 className='m-0'>{insertThinSpace(data.SZCZEPIENIA_DZIENNIE.toString())}</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <hr className='m-2' />
              <h5 className='m-0'>Poziom zaszczepienia populacji Polski</h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <ProgressBar className='bar mt-2'>
                <ProgressBar className='color-green' animated now={data.DAWKA_2_SUMA/adultPopulation * 100} />
                <ProgressBar className='color-yellow' now={(data.SZCZEPIENIA_SUMA-(2*data.DAWKA_2_SUMA))/adultPopulation * 100} />
              </ProgressBar>
              <ProgressBar className='light-bar black-font'>
                <ProgressBar className='color-light percentage-label' now={100} label={`${percentageToday}% (za 21 dni przewidujemy około ${percentageFuture}%)`} />
              </ProgressBar>
            </Col>
          </Row>
          <Row>
            <Col>
              <small><span className='color-green'>Kolor zielony</span> - część populacji zaszczepiona pierwszą oraz drugą dawką (tej wartości dotyczy procent)</small>
            </Col>
            <Col>
              <small><span className='color-yellow'>Kolor żółty</span> - część populacji, która otrzymała tylko pierwszą dawkę</small>
            </Col>
          </Row>
          <Row>
            <Col>
              <hr />
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    </div >
  )
}

export default Vaccines
