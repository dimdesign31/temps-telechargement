import React from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import useForm from "./useForm";

const App = () => {
  const { inputs, handleInputChange } = useForm();

  const secondsToHours = seconds => {
    if (!seconds) {
      return 0;
    }
    const date = new Date(null);
    date.setSeconds(seconds);

    return date.toISOString().substr(11, 8);
  };

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
              <Label for="ms">Vitesse de téléchargement (m/s)</Label>
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
                value={inputs.ms && inputs.mo / inputs.ms}
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
                value={inputs.ms && secondsToHours(inputs.mo / inputs.ms)}
              />
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default App;
