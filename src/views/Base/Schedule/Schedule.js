import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import axios from 'axios'

class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: true,
      timeout: 300
    };
  }

  async componentDidMount() {
    const { data: { data: { medicos } } } = await axios({
      url: 'http://localhost:1337/graphql',
      method: 'post',
      data: {
        query: `
          query{
            medicos{
              id
              nome
            }
          }
          `
      }
    })
    this.setState({ medicos });
  }

  formSubmit() {
    console.log(this.state.selectedMedicoId)
  }

  handleChange(event) {
    this.setState({ selectedMedicoId: event.target.value });
  }

  render() {
    return (
      <div className="animated">
        <Row>
          <Col xs="12" sm="6">
            <Card>
              <CardHeader>
                <strong>Basic Form</strong> Elements
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="selectLg">Select Large</Label>
                    </Col>
                    <Col xs="12" md="9" size="lg">
                      {this.state.medicos ?
                        (
                          <Input
                            onChange={(e) => this.handleChange(e)}
                            type="select"
                            name="selectLg"
                            id="selectLg"
                            bsSize="lg">
                            <option value="">Selecione</option>
                            {this.state.medicos && this.state.medicos.map(medico =>
                              (<option key={medico.id} value={medico.id}>{medico.nome}</option>))
                            }
                          </Input>
                        )
                        :
                        (
                          <i className="fa fa-circle-o-notch fa-lg fa-spin mt-4"></i>
                        )
                      }
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button onClick={() => this.formSubmit()} size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Schedule;
