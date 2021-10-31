import React from 'react'
import { Jumbotron, Container, Row, Col, ProgressBar } from 'react-bootstrap'
import { doomCounterValue } from '../helpers'
import { FaTwitterSquare } from 'react-icons/fa'
import { updateWarning, newOrOld, percentageDifference } from '../helpers'
import { useTranslation } from 'react-i18next'

function DoomBar() {
  const { t } = useTranslation()
  const [steps, stepsProcessed, max, doomCounterValues, doomCounterlabels] = doomCounterValue()
  return (
    <Jumbotron className='p-0 m-2' >
      <div className='text-center'>
        <h2>{t('colourfulRealmsRules')}</h2>
      </div>
      <Container className='text-center pt-2' >
        <Row>
          <Col>
            <p className='font-weight-light'>
              {t('averageNewCasesOverSevenDays')}
              <b> {Math.round(newOrOld('the_average'))} {percentageDifference('the_average')}
                {updateWarning('the_average')}
              </b>
            </p>
            <ProgressBar className='bar'>
              <ProgressBar className='color-green' now={doomCounterValues[0]} />
              <ProgressBar className='color-yellow' now={doomCounterValues[1]} />
              <ProgressBar className='color-red' now={doomCounterValues[2]} />
              <ProgressBar className='color-purple' now={doomCounterValues[3]} />
              <ProgressBar className='color-black' now={doomCounterValues[4]} />
            </ProgressBar>
            <ProgressBar className='light-bar'>
              <ProgressBar className='color-light-green' now={stepsProcessed[0] / max} label={doomCounterlabels[0]} />
              <div>
                <span className='tooltiptext'>{steps[0]}</span>
              </div>
              <ProgressBar className='color-light-yellow' now={stepsProcessed[1] / max} label={doomCounterlabels[1]} />
              <div>
                <span className='tooltiptext'>{steps[1]}</span>
              </div>
              <ProgressBar className='color-light-red' now={stepsProcessed[2] / max} label={doomCounterlabels[2]} />
              <div>
                <span className='tooltiptext'>{steps[2]}</span>
              </div>
              <ProgressBar className='color-light-purple' now={stepsProcessed[3] / max} label={doomCounterlabels[3]} />
              <div>
                <span className='tooltiptext'>{steps[3]}</span>
              </div>
              <ProgressBar className='color-light-black' now={stepsProcessed[4] / max} label={doomCounterlabels[4]} />
            </ProgressBar>
            <Row className='m-0'>
              <div className='bar-label d-md-inline d-lg-inline d-none' style={{ width: (stepsProcessed[0] / max).toString() + '%', 'borderLeftStyle': 'dashed' }}>
                <small>{t('greenRealmRules')}</small>
              </div>
              <div className='bar-label d-md-inline d-lg-inline d-none' style={{ width: (stepsProcessed[1] / max).toString() + '%' }}>
                <small>{t('yellowRealmRules')}</small>
              </div>
              <div className='bar-label d-md-inline d-lg-inline d-none' style={{ width: (stepsProcessed[2] / max).toString() + '%' }}>
                <small>{t('redRealmRules')}</small>
              </div>
              <div className='bar-label d-md-inline d-lg-inline d-none' style={{ width: (stepsProcessed[3] / max).toString() + '%' }}>
                <small>{t('violetRealmRules')}</small>
              </div>
              <div className='bar-label d-md-inline d-lg-inline d-none' style={{ width: (stepsProcessed[4] / max).toString() + '%' }}>
                <small>{t('blackRealmRules')}</small>
              </div>
            </Row>
            <hr className='m-2' />
            <small>{t('moreInfoAboutRealms')}</small>
            <p><a href='https://twitter.com/PremierRP/status/1330078274987450369/photo/1'>{<FaTwitterSquare size={20} />}{t('PMChancellery')}</a></p>
          </Col>
        </Row>
      </Container>
    </Jumbotron >
  )
}

export default DoomBar
