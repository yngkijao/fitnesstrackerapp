import { useState, useEffect, useContext } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import WorkoutCard from '../components/WorkoutCard';
import UserContext from '../UserContext';
import { Notyf } from 'notyf';

export default function Workouts() {
  const notyf = new Notyf();
  const { user } = useContext(UserContext);
  const [workouts, setWorkouts] = useState([]);
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    fetch('https://fitnessapp-api-ln8u.onrender.com/workouts/getMyWorkouts', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => setWorkouts(data.workouts || []))
    .catch(error => {
      console.error("Error fetching workouts:", error);
      notyf.error("Failed to fetch workouts");
    });
  }, []);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleAddWorkout = (e) => {
    e.preventDefault();
    fetch('https://fitnessapp-api-ln8u.onrender.com/workouts/addWorkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ name, duration })
    })
    .then(res => res.json())
    .then(data => {
      if (data._id) { // Check for the ID of the newly created workout
        setWorkouts([...workouts, data]);
        notyf.success('Workout added successfully');
      } else {
        notyf.error('Failed to add workout');
      }
      handleClose();
    })
    .catch(error => {
      console.error("Error adding workout:", error);
      notyf.error('Failed to add workout');
    });
  };

  const handleDelete = (id) => {
    fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/deleteWorkout/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => {
      console.log("Delete response status:", res.status); // Add log
      return res.json();
    })
    .then(data => {
      console.log("Delete response data:", data); // Add log
      if (data.success || data.message === "Workout deleted successfully") { // Check for success
        setWorkouts(workouts.filter(workout => workout._id !== id));
        notyf.success('Workout deleted successfully');
      } else {
        notyf.error('Failed to delete workout');
      }
    })
    .catch(error => {
      console.error("Error deleting workout:", error);
      notyf.error('Failed to delete workout');
    });
  };

  const handleComplete = (id) => {
    fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/completeWorkoutStatus/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setWorkouts(workouts.map(workout => workout._id === id ? { ...workout, status: true } : workout));
        notyf.success('Workout marked as complete');
      } else {
        notyf.error('Failed to mark workout as complete');
      }
    })
    .catch(error => {
      console.error("Error marking workout as complete:", error);
      notyf.error('Failed to mark workout as complete');
    });
  };

  return (
    <div>
      <h1 className="my-5 text-center">Your Workouts</h1>
      <Button variant="primary" id="addWorkout" onClick={handleShow}>Add Workout</Button>
      {workouts.length > 0 ? (
        workouts.map(workout => (
          <WorkoutCard
            key={workout._id}
            workout={workout}
            handleDelete={handleDelete}
            handleComplete={handleComplete}
          />
        ))
      ) : (
        <p>No workouts to display. Click "Add Workout" to create one.</p>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddWorkout}>
            <Form.Group controlId="workoutName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter workout name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="workoutDuration">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter workout duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Workout
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
