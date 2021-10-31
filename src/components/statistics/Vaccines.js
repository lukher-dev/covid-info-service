import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Jumbotron, Container, Row, Col, ProgressBar } from 'react-bootstrap'
import { insertThinSpace } from '../helpers'
import { useTranslation } from 'react-i18next'

const population = 37_672_367

function Vaccines() {
  const { t } = useTranslation()
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get('https://services-eu1.arcgis.com/zk7YlClTgerl62BY/arcgis/rest/services/widok_global_szczepienia_actual/FeatureServer/0/query?f=json&cacheHint=true&resultOffset=0&resultRecordCount=1&where=1%3D1&outFields=*&resultType=standard&returnGeometry=false&spatialRel=esriSpatialRelIntersects', {
    }).then(response => {
      if(response.data && response.data.features && response.data.features[0].attributes)
        setData(response.data.features[0].attributes)
    })
  }, [])

  if(!data)
    return null
  const vaccinated = Math.ceil((data.zaszczepieni_finalnie / population) * 10000) / 100
  const boosterDose = Math.ceil((data.dawka_przypominajaca / population) * 10000) / 100
  return (
    <div>
      <Jumbotron className='p-0 m-2' >
        <div className='text-center'>
          <h2>{t('vaccinations')}</h2>
        </div>
        <Container className='text-center pt-2' >
          <Row>
            <Col>
              <p className='m-0'>{t('lastUpdate')} {data.DATA_SHOW}</p>
              <hr className='m-2' />
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 4, order: 1 }} xs={{ span: 6, order: 1 }} className='mb-3'>
              <h6>{t('allVaxinations')}</h6>
              <h4 className='m-0'>{insertThinSpace(data.SZCZEPIENIA_SUMA.toString())}</h4>
            </Col>
            <Col md={{ span: 4, order: 2 }} xs={{ span: 12, order: 3 }} className='mb-3'>
              <h6>{t('vaccinated')}</h6>
              <h4 className='m-0'>{insertThinSpace(data.zaszczepieni_finalnie.toString())}</h4>
            </Col>
            <Col md={{ span: 4, order: 3 }} xs={{ span: 6, order: 2 }} className='mb-3'>
              <h6>{t('lastDayVaccinations')}</h6>
              <h4 className='m-0'>{insertThinSpace(data.SZCZEPIENIA_DZIENNIE.toString())}</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <hr className='m-2' />
              <h5 className='m-0'>{t('levelOfVaxxinationInPoland')}</h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <ProgressBar className='bar mt-2'>
                <ProgressBar className='color-purple' animated now={data.dawka_przypominajaca/population * 100} />
                <ProgressBar className='color-green' now={(data.zaszczepieni_finalnie-(2*data.dawka_przypominajaca))/population * 100} />
              </ProgressBar>
              <ProgressBar className='light-bar black-font'>
                <ProgressBar className='color-light percentage-label' now={100} label={t('boosterDose', { vaccinated: vaccinated, boosterDose: boosterDose })} />
              </ProgressBar>
            </Col>
          </Row>
          <Row>
            <Col>
              <small><span className='color-green text-white p-1'>{t('greenColour')}</span> - {t('greenColourExplanation')}</small>
            </Col>
            <Col>
              <small><span className='color-purple text-white p-1'>{t('purpleColour')}</span> - {t('purpleColourExplanation')}</small>
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
