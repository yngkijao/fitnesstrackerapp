import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function WorkoutCard({ workout, handleDelete, handleComplete }) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{workout.name}</Card.Title>
        <Card.Text>
          Duration: {workout.duration}<br />
          Date Added: {new Date(workout.dateAdded).toLocaleDateString()}<br />
          Status: {workout.status ? 'Completed' : 'Pending'}
        </Card.Text>
        <Button variant="danger" onClick={() => handleDelete(workout._id)}>Delete</Button>
        {' '}
        {!workout.status && (
          <Button variant="success" onClick={() => handleComplete(workout._id)}>Mark as Complete</Button>
        )}
      </Card.Body>
    </Card>
  );
}
