import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap';

export default function AddResolveModal(props) {
  const [users, setUsers] = useState([]);

  const { taskid, taskdesc, startdate, enddate, aue, category, priority } =
    props;

  useEffect(() => {
    fetch(process.env.REACT_APP_API + 'users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      });
  }, [users]);

  const handleSubmit = event => {
    fetch(process.env.REACT_APP_API + 'tasks', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        TaskId: taskid,
        TaskDesc: taskdesc,
        StartDate: startdate,
        EndDate: enddate,
        AssignedUserEmail: aue,
        Category: category,
        Priority: priority,
        Status: 'Done',
        ResolvedDesc: event.target.ResolvedDesc.value,
      }),
    })
      .then(res => res.json())
      .then(
        result => {
          alert(result);
        },
        error => {
          alert('Failed');
        }
      );
  };

  return (
    <div className='container'>
      <Modal
        {...props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Submit Resolved Description
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId='ResolvedDesc'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type='text'
                    name='ResolvedDesc'
                    required
                    placeholder='Description'
                  />
                </Form.Group>

                <Form.Group>
                  <Button variant='primary' type='submit' className='mt-2'>
                    Submit
                  </Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='danger' onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
