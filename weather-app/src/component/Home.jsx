import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
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
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`);

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
    <Container className="container">
      <Row>
        <Col xs={3} md={2}></Col>
        <Col xs={6} md={8}>
          <h1 className="display-3 my-5">Weather EpicApp</h1>
          <Form.Group controlId="formCity">
            <Form.Label className="display-6 my-5">Inserisci la città</Form.Label>
            <Form.Control type="text" placeholder="Città" value={city} onChange={(e) => setCity(e.target.value)} />
          </Form.Group>
          <Button className="mt-5" variant="primary" onClick={getWeather}>
            Ottieni informazioni Meteo
          </Button>
        </Col>
        <Col xs={3} md={2}></Col>
      </Row>

      {weatherData && (
        <Container>
          <Row className="my-5">
            <Col>
              <h3>Ecco le previsioni Meteo previste per oggi a:</h3>
              <h2 className="display-3 my-3">{weatherData.name}</h2>
              <h3 className="my-3">{currentDateTime}</h3>
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
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default Home;
