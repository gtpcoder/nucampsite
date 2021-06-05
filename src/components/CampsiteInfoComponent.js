import React, { Component } from 'react';
import {
    Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Button,
    Col, Row, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { Control, LocalForm, Errors } from 'react-redux-form';



const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);


//
class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            rating: '',
            author: '',
            text: '',
            touched: {
                rating: false,
                author: false,
                recommendThis: false,
                comment: false
            }
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleBlur = (field) => () => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }
    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            [name]: value
        });
    }
    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.campsiteId, values.rating,
            values.author, values.text);
        //console.log("Current state is: " + JSON.stringify(values));
        //alert("Current state is: " + JSON.stringify(values));
    }
    render() {
        return (
            <React.Fragment>
                <div>
                    <Button type="submit" color="primary" outline onClick={this.toggleModal}>
                        <i className="fa fa-pencil fa-lg" /> Submit Comment
                </Button>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Rate this Campsite</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <div className="form-group">
                                <Label htmlFor="rating" >Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating"
                                    placeholder=""
                                    className="form-control">
                                    <option value="">Pick a rating</option>
                                    <option value="5">5 🌟🌟🌟🌟🌟</option>
                                    <option value="4">4 🌟🌟🌟🌟</option>
                                    <option value="3">3 🌟🌟🌟</option>
                                    <option value="2">2 🌟🌟</option>
                                    <option value="1">1 🌟</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required,
                                        minLength: minLength(2),
                                        maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <div className="form-check">
                                    <Label check>
                                        <Control.checkbox
                                            model=".recommendThis"
                                            name="recommendThis"
                                            className="form-check-input"
                                        /> {' '}
                                        <strong>Would you recommend this Campsite?</strong>
                                    </Label>
                                </div>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="text">Your Comments</Label>
                                <Control.textarea model=".text" id="text" name="text"
                                    rows="12"
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                            </div>

                        </LocalForm>

                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}

function RenderCampsite({ campsite }) {
    if (campsite) {
        return (
            <div className="col-md-5 m-1">
                <Card >
                    <CardImg role="button" top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardTitle>{campsite.name}</CardTitle>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>

        );
    }
    return <div />;

}

function RenderComments({ comments, addComment, campsiteId }) {
    if (comments) {
        return (
            <div className="col-md-5 m-1">
                <CommentForm
                    campsiteId={campsiteId} addComment={addComment}
                />
                <h4>Comments</h4>
                {comments.sort((a, b) => (a.date < b.date) ? 1 : -1).map(comment => {
                    return (
                        <div key={comment.id}>
                            <p>{comment.text} <br/> {comment.rating}
                                {(() => {
                                    switch (comment.rating) {
                                        case 5:
                                            return " 🌟🌟🌟🌟🌟 stars";
                                        case 4:
                                            return " 🌟🌟🌟🌟 stars";
                                        case 3:
                                            return " 🌟🌟🌟 stars";
                                        case 2:
                                            return " 🌟🌟 stars";
                                        default:
                                            return " 🌟 star";
                                    };
                                })()}
                            </p>
                            <p>
                                -- {comment.author} | {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
                            </p>
                        </div>
                    );
                }
                )
                }
            </div>
        );
    }
    return <div />;

}


function CampsiteInfo(props) {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments
                        comments={props.comments}
                        addComment={props.addComment}
                        campsiteId={props.campsite.id}
                    />
                </div>
            </div>
        );
    }
    return <div />;
}


export default CampsiteInfo;