import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export default function AddTaskModal(props) {
  const [users, setUsers] = useState([]);
  var today = new Date();

  useEffect(() => {
    fetch(process.env.REACT_APP_API + 'users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      });
  }, [users]);

  const handleSubmit = event => {
    event.preventDefault();
    if (event.target.EndDate.value < event.target.StartDate.value) {
      return alert('The End date should higher than the Start Date');
    } else {
      fetch(process.env.REACT_APP_API + 'tasks', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          TaskDesc: event.target.TaskDesc.value,
          StartDate: event.target.StartDate.value,
          EndDate: event.target.EndDate.value,
          AssignedUserEmail: event.target.Email.value,
          Category: event.target.Category.value,
          Priority: event.target.Priority.value,
          Status: event.target.Status.value,
        }),
      })
        .then(res => res.json())
        .then(
          result => {
            alert(result);
          },
          error => {
            console.log(error);
            alert('Failed');
          }
        );
    }
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
          <Modal.Title id='contained-modal-title-vcenter'>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId='TaskDesc'>
                  <Form.Label>Task</Form.Label>
                  <Form.Control
                    type='text'
                    name='TaskDesc'
                    required
                    placeholder='Task'
                  />
                </Form.Group>
                <Form.Group controlId='StartDate'>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type='date'
                    name='StartDate'
                    min={
                      today.getFullYear() +
                      '-' +
                      (today.getMonth() + 1) +
                      '-' +
                      today.getDate()
                    }
                    required
                    placeholder='Start Date'
                  />
                </Form.Group>
                <Form.Group controlId='EndDate'>
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type='date'
                    name='EndDate'
                    min={
                      today.getFullYear() +
                      '-' +
                      (today.getMonth() + 1) +
                      '-' +
                      today.getDate()
                    }
                    required
                    placeholder='End Date'
                  />
                </Form.Group>
                <Form.Group controlId='Email'>
                  <Form.Label>User Email </Form.Label>
                  <Form.Control as='select'>
                    {users.map(user => (
                      <option key={user.UserId}>{user.UserEmail}</option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId='Category'>
                  <Form.Label>Category</Form.Label>
                  <Form.Control as='select' name='Category'>
                    <option value='Incidence'>Incidence</option>
                    <option value='Issues'>Issues</option>
                    <option value='Routines'>Routines</option>
                    <option value='Project'>Project</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId='Priority'>
                  <Form.Label>Priority</Form.Label>
                  <Form.Control as='select' name='Priority'>
                    <option value='Low'>Low</option>
                    <option value='Normal'>Normal</option>
                    <option value='High'>High</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId='Status'>
                  <Form.Label>Status</Form.Label>
                  <Form.Control as='select' name='Status'>
                    <option value='Pending'>Pending</option>
                    <option value='Work In Progress'>Work In Progress</option>
                    <option value='Done'>Done</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Button variant='primary' type='submit' className='mt-2'>
                    Add Task
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
