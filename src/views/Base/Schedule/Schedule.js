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
  Badge,
  Pagination,
  PaginationItem,
  PaginationLink,
  FormText,
  Table
} from 'reactstrap';
import axios from 'axios'
// import ReactQuill from 'react-quill'
// import 'react-quill/dist/quill.snow.css';

import ReactMarkdown from 'react-markdown'

class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: true,
      timeout: 300,
      subscriptionEmail: '',
      subscriptionName: '',
    };

    this.handleChangeSubscriptionEmail = this.handleChangeSubscriptionEmail.bind(this);
    this.handleChangeSubscriptionName = this.handleChangeSubscriptionName.bind(this);
    this.handleSubmitSubscription = this.handleSubmitSubscription.bind(this);
  }
  handleChangeSubscriptionEmail(event) {
    this.setState({ subscriptionEmail: event.target.value });
  }

  handleChangeSubscriptionName(event) {
    this.setState({ subscriptionName: event.target.value });
  }

  async handleSubmitSubscription(event) {
    const { subscriptionEmail, subscriptionName } = this.state

    const result = await axios({
      url: '/subscribers',
      method: 'post',
      data: {
        name: subscriptionName,
        email: subscriptionEmail,
      }
    })

    console.log({ result })
    event.preventDefault();
  }

  async componentDidMount() {
    const { data: { data: { medicos } } } = await axios({
      url: '/graphql',
      method: 'post',
      data: {
        query: `
          query{
            medicos{
              id
              nome
              crm
              createdAt
              updatedAt
            }
          }
          `
      }
    })
    this.setState({ medicos });
    const { data: { data: { jobs } } } = await axios({
      url: '/graphql',
      method: 'post',
      data: {
        query: `
          query{
            jobs{
              id
              title
              salary
              enabled
              description
            }
          }
          `
      }
    })
    this.setState({ jobs });
  }

  handleChange(event) {
    this.setState({ selectedMedicoId: event.target.value });
  }

  render() {
    return (
      <div className="animated">
        <Row>
          <Col xs="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Striped Table
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Crm</th>
                      <th>Created</th>
                      <th>Updated</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.medicos && this.state.medicos.map(medico =>
                      (
                        <tr key={medico.id}>
                          <td>{medico.nome}</td>
                          <td>{medico.crm}</td>
                          <td>{medico.createdAt}</td>
                          <td>{medico.updatedAt}</td>
                          <td>
                            <Badge color="success">Active</Badge>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>
                {/* <Pagination>
                  <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination> */}
              </CardBody>
            </Card>
          </Col>
          <Col xs="6">
            <Row>
              <Col xs="12">
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
                    <Button size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                    <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <Card>
                  <CardHeader>
                    <strong>Subscription</strong> Form
                  </CardHeader>
                  <CardBody>
                    <Form action="" method="post" className="form-horizontal">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="hf-email">Nome</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input
                            type="text"
                            placeholder="Insira seu nome..."
                            value={this.state.subscriptionName}
                            onChange={this.handleChangeSubscriptionName}
                          />
                          <FormText className="help-block">Adicionar o seu nome</FormText>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="hf-email">Email</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input
                            type="email"
                            id="hf-email"
                            name="hf-email"
                            placeholder="Insira seu email..."
                            autoComplete="email"
                            value={this.state.subscriptionEmail}
                            onChange={this.handleChangeSubscriptionEmail}
                          />
                          <FormText className="help-block">Adicione o seu email</FormText>
                        </Col>
                      </FormGroup>
                    </Form>
                  </CardBody>
                  <CardFooter>
                    <Button onClick={this.handleSubmitSubscription} size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                    <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Col>
          <Row>
            {this.state.jobs && this.state.jobs.map(jobs =>
              (
                <Col xs="4" key={jobs.id}>
                  <Card >
                    <CardHeader>
                      <span className="h3">{jobs.title}</span>
                    </CardHeader>
                    <CardBody>
                      <ReactMarkdown source={jobs.description} />
                    </CardBody>
                    <CardFooter><h3><Badge color="primary">R$ {jobs.salary}</Badge></h3></CardFooter>
                  </Card>
                </Col>
              )
            )}
          </Row>
        </Row>
      </div >
    );
  }
}

export default Schedule;
