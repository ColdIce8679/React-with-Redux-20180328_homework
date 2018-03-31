import React, { Component } from 'react'
import { Button, FormGroup, InputGroup, Input } from 'reactstrap';

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            editdata: ''
        }
        this.edit = this.edit.bind(this);
        this.remove = this.remove.bind(this);
        this.save = this.save.bind(this);
        this.editmessage = this.editmessage.bind(this);
        this.showmessage = this.showmessage.bind(this);
        this.handleedit = this.handleedit.bind(this);
    }
    edit() {
        this.setState({ editing: true });
    }
    remove() {
        this.props.removemessage(this.props.index)
    }
    save() {
        this.props.editmessage(this.state.editdata, this.props.index);
        this.setState({ editing: false });
    }
    handleedit(event) {
        this.setState({ editdata: event.target.value });
    }
    showmessage() {
        return (
            <div style={{ textAlign: 'left', padding: '10px', border: '5px dotted', margin: '10px' }}>
                <p>姓名：{this.props.name}</p>
                <p>留言時間：{this.props.time}</p>
                <p>留言內容：{this.props.content}</p>
                <p><Button className="btn-warning text-white mr-2 " onClick={this.edit}>修改</Button><Button className="btn-danger text-white" onClick={this.remove}>刪除</Button></p>
            </div>
        );
    }
    editmessage() {
        return (
            <div style={{ textAlign: 'left', padding: '10px', border: '5px dotted', margin: '10px' }}>
                <FormGroup><InputGroup>
                    <Input type="textarea" style={{height: '104px'}} placeholder="Edit" name="Edit" onChange={this.handleedit} />
                </InputGroup></FormGroup>
                <p><Button className="btn-warning text-white mr-2 " onClick={this.save}>送出</Button></p>
            </div>
        );
    }
    render() {
        if (this.state.editing) {
            return this.editmessage();
        } else {
            return this.showmessage();
        }

    }
}

export default Message;
