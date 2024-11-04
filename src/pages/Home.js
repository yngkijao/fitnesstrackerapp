import { Link } from 'react-router-dom';
import { Carousel, Card, Container, Row, Col } from 'react-bootstrap';

export default function Home() {
  return (
    <div>
      <Carousel fade interval={3000}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media.istockphoto.com/id/1391410249/photo/sports-and-gym-activities.jpg?s=612x612&w=0&k=20&c=1S-hAmT-CkRtdYV_hcKi1lZdQkXAN_mCy3ebIXlUEnE="
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Get Fit</h3>
            <p>Exercise boosts your energy levels.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Stay Healthy</h3>
            <p>Regular exercise improves your health.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://ayurvalley.com/wp-content/uploads/2018/04/happy-Yoga-1024x768.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Feel Great</h3>
            <p>Stay happy and stress-free.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Container className="mt-5">
        <h2 className="text-center mb-4">Benefits of Exercise</h2>
        <Row>
          <Col md={4}>
            <Card className="mb-4 card-equal-height">
              <Card.Img variant="top" src="https://bonavita.ph/wp-content/uploads/2022/02/8-Ways-to-Naturally-Boost-Energy.jpg" />
              <Card.Body>
                <Card.Title>Boost Energy</Card.Title>
                <Card.Text>
                  Regular physical activity can improve muscle strength and boost your endurance.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 card-equal-height">
              <Card.Img variant="top" src="https://publichealth.tulane.edu/wp-content/uploads/sites/3/2021/03/How-to-Improve-Cultural-Competence-in-Health-Care.jpg" />
              <Card.Body>
                <Card.Title>Improve Health</Card.Title>
                <Card.Text>
                  Exercise can help prevent or manage many health problems, including stroke, high blood pressure, and type 2 diabetes.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 card-equal-height">
              <Card.Img variant="top" src="https://cdn.prod.website-files.com/6604727c449878e5c7a36fe7/670dc63de62b5ca55f915aef_stress-free-ways.png" />
              <Card.Body>
                <Card.Title>Feel Better</Card.Title>
                <Card.Text>
                  Physical activity stimulates various brain chemicals that may leave you feeling happier and more relaxed.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
