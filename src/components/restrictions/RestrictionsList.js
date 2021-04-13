import React from 'react'
import { Card, Container } from 'react-bootstrap'
import SingleRestriction from './SingleRestriction'

function RestrictionsList(props) {
  return (
    <Container className='p-0'>
      {
        props.restrictions.map(category => {
          return (
            <Card key={category.title} border='light'>
              <Card.Header>
                <Card.Title className='m-0'><h6 className='m-0'>{category.title}</h6></Card.Title>
              </Card.Header>
              <Card.Body className='p-1'>
                <ul className='pl-4'>
                  {category.restrictions.map(restriction => {
                    return <SingleRestriction key={restriction.content} content={restriction.content} details={restriction.details} />
                  })}
                </ul>
              </Card.Body>
            </Card>
          )
        })
      }
    </Container>
  )
}

export default RestrictionsList
