import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import useForm from "./useForm";

const App = () => {
  const { inputs, handleInputChange } = useForm();
  const [isInProgress, setIsInProgress] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  let timer;

  const secondsToHours = seconds => {
    if (!seconds) {
      return 0;
    }
    const date = new Date(null);
    date.setSeconds(seconds);

    return date.toISOString().substr(11, 8);
  };

  const startTimer = () => {
    if (!remainingTime) {
      setRemainingTime(getDownloadTimeInSecond());
    }

    setIsInProgress(true);
  };

  const resetTimer = () => {
    clearInterval(timer);
    setRemainingTime(null);
  };

  const updateTimer = () => {
    setRemainingTime(remainingTime - 1);
    clearInterval(timer);
  };

  const startInterval = () => {
    timer = setInterval(updateTimer, 1000);
  };

  useEffect(() => {
    if (isInProgress && remainingTime && !timer) {
      startInterval();
    }
  });

  const getDownloadTimeInSecond = () => inputs.mo / inputs.ms;

  return (
    <Container>
      <Form>
        <Row>
          <Col>
            <FormGroup>
              <Label for="go">Taille du fichier (Go)</Label>
              <Input
                type="number"
                name="go"
                id="go"
                onChange={handleInputChange}
                value={inputs.go}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="mo">Taille du fichier (Mo)</Label>
              <Input
                type="number"
                name="mo"
                id="mo"
                onChange={handleInputChange}
                value={inputs.mo}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <FormGroup>
              <Label for="ms">Vitesse de téléchargement (Mo/s)</Label>
              <Input
                type="number"
                name="ms"
                id="ms"
                onChange={handleInputChange}
                value={inputs.ms}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <FormGroup>
              <Label for="ds">Temps de téléchargement (s)</Label>
              <Input
                type="number"
                name="ds"
                id="ds"
                disabled
                value={inputs.ms && getDownloadTimeInSecond()}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="dh">Temps de téléchargement (h)</Label>
              <Input
                type="text"
                name="dh"
                id="dh"
                disabled
                value={inputs.ms && secondsToHours(getDownloadTimeInSecond())}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            {!isInProgress && (
              <Button color="primary" onClick={() => startTimer()}>
                {!remainingTime ? "Démarrer" : "Reprendre"}
              </Button>
            )}
            {isInProgress && (
              <Button color="danger" onClick={() => setIsInProgress(false)}>
                Pause
              </Button>
            )}
            {remainingTime && !isInProgress && (
              <Button color="secondary" onClick={() => resetTimer()}>
                Réinitialiser
              </Button>
            )}
          </Col>
          <Col>
            {remainingTime && (
              <span>
                Temps restant : {remainingTime}s |{" "}
                {secondsToHours(remainingTime)}h
              </span>
            )}
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default App;
