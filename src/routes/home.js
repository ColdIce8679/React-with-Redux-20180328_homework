import React, { Component } from 'react'
import { connect } from 'react-redux';
import logo from '../assets/logo.svg';
import Message from '../components/Message';
import './home.css';
import { Form, FormGroup, InputGroup, InputGroupAddon, Input, Button, Progress } from 'reactstrap';
import { getapidata } from '../actions/message';
import { sendMessage } from '../actions/message';
import { updatemessage } from '../actions/message';
import { deletemessage } from '../actions/message';
import _ from 'lodash';
import moment from 'moment';

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      now: 0,
      apidata: '',
      data: []
    };
    this.settime = this.settime.bind(this);
    this.apicomponent = this.apicomponent.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.editmessage = this.editmessage.bind(this);
    this.removemessage = this.removemessage.bind(this);
  }

  settime() {
    this.setState({ now: this.state.now + 1 });
    console.log(this.state.now);
  }

  componentDidMount() {
    this.interval = setInterval(this.settime.bind(this), 1000);
  }

  componentWillMount() {
    this.props.getdata();
  }

  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps)
    if (nextProps.apidata !== this.state.apidata) {
      this.setState({ apidata: nextProps.apidata })
    } else if ((nextProps.data.length !== this.state.data.length) || (!_.isEqual(nextProps.data, this.state.data))) {
      this.setState({ data: nextProps.data })
    }
  }

  apicomponent() {
    var x = this.state.now;
    switch (true) {
      case x < 11:
        return (
          <div id="card" className="mx-auto mt-5">
            <div className="text-center">{this.state.now * 10}%</div>
            <Progress value={this.state.now * 10} />
          </div>
        );
      default:
        clearInterval(this.interval);
        return (<div id="card" className="mx-auto mt-5">
          {JSON.stringify(this.props.apidata)}
        </div>
        );
    }
  }

  sendMessage(event) {
    event.preventDefault();
    this.props.sendmessage({ name: event.target.username.value, content: event.target.content.value, time: moment().format('LLL') })
  }

  editmessage(newdata, k) {
    this.props.updatemessage(newdata, k);
  }

  removemessage(key) {
    this.props.deletemessage(key)
  }

  render() {
    return (
      <div className="home">
        <header className="home-header">
          <img src={logo} className="home-logo" alt="logo" />
          <h1 className="home-title">Welcome to React</h1>
        </header>
        <div className="container">
          <div id="card" className="mx-auto mt-5">
            <Form onSubmit={this.sendMessage}>
              <FormGroup><InputGroup>
                <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                <Input placeholder="username" name="username" />
              </InputGroup></FormGroup>
              <FormGroup><InputGroup>
                <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                <Input placeholder="content" name="content" />
              </InputGroup></FormGroup>
              <Button className="btn-info">Submit</Button>
              {_.map(this.props.data, (value, index) =>
                <Message key={index} index={index} name={value.name} time={value.time} content={value.content} editmessage={this.editmessage} removemessage={this.removemessage}/>
              )
              }
            </Form>
          </div>
        </div>
        {this.apicomponent()}
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    apidata: state.apidata,
    data: state.data
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    getdata: () => {
      dispatch(getapidata());
    },
    sendmessage: (data) => {
      dispatch(sendMessage(data));
    },
    updatemessage: (newdata, k) => {
      dispatch(updatemessage(newdata, k))
    },
    deletemessage: (key) => {
      dispatch(deletemessage(key))
    }
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(home);