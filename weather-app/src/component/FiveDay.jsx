import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { ApiKey } from "../helper/api";

const FiveDay = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const convertToCelsius = (temperature) => {
    const celsius = temperature - 273.15;
    return Math.round(celsius * 10) / 10;
  };

  const getWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${ApiKey}&lang=it`
      );

      if (!response.ok) {
        throw new Error("Errore nel recupero dei dati meteorologici");
      }

      const data = await response.json();

      const extractedData = {
        city: data.city.name,
        list: data.list.map((item) => ({
          date: item.dt_txt,
          description: item.weather[0].description,
          temperature: convertToCelsius(item.main.temp),
          minTemperature: convertToCelsius(item.main.temp_min),
          maxTemperature: convertToCelsius(item.main.temp_max),
          pressure: item.main.pressure,
          windSpeed: item.wind.speed,
          icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        })),
      };

      setWeatherData(extractedData);
    } catch (error) {
      console.error("Errore nel recupero dei dati meteorologici:", error.message);
    }
  };

  return (
    <Container className="container text-white">
      <Row>
        <Col xs={3} md={2}></Col>
        <Col xs={6} md={8}>
          <p className="display-6">Controlla il Meteo per i prossimi 5 giorni</p>
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
            <Col>
              <h3>Ecco le previsioni Meteo previste per oggi a </h3>
              <h2 className="display-3">{weatherData.city}:</h2>
              <Row className="my-5">
                {weatherData.list.map((item, index) => (
                  <Col xs={12} md={6} lg={2}>
                    <div key={index} className="my-4">
                      <Card>
                        <Card.Img className="img-fluid" variant="top" src={item.icon} />
                        <Card.Body>
                          <Card.Title>
                            <h2 className="display-3 my-3">{weatherData.name}</h2>
                          </Card.Title>
                          <Card.Text>
                            <h4>{item.date}</h4>
                            <p>
                              Condizioni del cielo: <strong>{item.description}</strong>
                            </p>
                            <p>
                              Temperatura: <strong>{item.temperature}°C</strong>
                            </p>
                            <p>
                              MIN: <strong>{item.minTemperature}°C</strong>
                            </p>
                            <p>
                              MAX: <strong>{item.maxTemperature}°C</strong>
                            </p>
                            <p>
                              Pressione: <strong>{item.pressure}</strong>
                            </p>
                            <p>
                              Vento: <strong>{item.windSpeed} km/h</strong>
                            </p>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default FiveDay;
