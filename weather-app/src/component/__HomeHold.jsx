import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { ApiKey } from "../helper/api";

const Home = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState("");

  const convertToCelsius = (temperature) => {
    const celsius = temperature - 273.15;
    return Math.round(celsius * 10) / 10;
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };

    const formattedDateTime = now.toLocaleDateString("it-IT", options);
    setCurrentDateTime(formattedDateTime);
  };

  useEffect(() => {
    getCurrentDateTime();
  }, []); // Esegui solo al montaggio

  const getWeather = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&lang=it`);

      if (!response.ok) {
        throw new Error("Errore nel recupero dei dati meteorologici");
      }

      const data = await response.json();

      const temperatureCelsius = convertToCelsius(data.main.temp);
      const minTemperatureCelsius = convertToCelsius(data.main.temp_min);
      const maxTemperatureCelsius = convertToCelsius(data.main.temp_max);

      setWeatherData({
        ...data,
        main: {
          ...data.main,
          temp: temperatureCelsius,
          temp_min: minTemperatureCelsius,
          temp_max: maxTemperatureCelsius,
        },
      });
    } catch (error) {
      console.error("Errore nel recupero dei dati meteorologici:", error.message);
    }
  };

  return (
    <Container className="container text-white">
      <Row>
        <Col xs={3} md={2}></Col>
        <Col xs={6} md={8}>
          <Form.Group controlId="formCity">
            <Form.Label className="display-6 my-5">Inserisci la città</Form.Label>
            <Form.Control type="text" placeholder="Città" value={city} onChange={(e) => setCity(e.target.value)} />
          </Form.Group>
          <Button className="border-white text-white mt-5" variant="trasparent" onClick={getWeather}>
            Ottieni informazioni Meteo
          </Button>
        </Col>
        <Col xs={3} md={2}></Col>
      </Row>

      {weatherData && (
        <Container>
          <Row className="my-5">
            <h3>Ecco le previsioni Meteo previste per oggi a:</h3>
            <h2 className="display-3 my-3">{weatherData.name}</h2>
            <Col xs={{ span: 6, offset: 3 }}>
              <Card className="my-5">
                <Card.Img
                  className="img-fluid"
                  variant="top"
                  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                />
                <Card.Body>
                  <Card.Title>
                    <h2 className="display-3 my-3">{weatherData.name}</h2>
                  </Card.Title>
                  <Card.Text>
                    <p>
                      Condizioni del cielo: <strong>{weatherData.weather[0].description}</strong>
                    </p>
                    <p>
                      Temperatura: <strong>{weatherData.main.temp}°C</strong>
                    </p>
                    <p>
                      MIN: <strong>{weatherData.main.temp_min}°C</strong>
                    </p>
                    <p>
                      MAX: <strong>{weatherData.main.temp_max}°C</strong>
                    </p>
                    <p>
                      Pressione: <strong>{weatherData.main.pressure}</strong>
                    </p>
                    <p>
                      Vento: <strong>{weatherData.wind.speed} km/h</strong>
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default Home;
