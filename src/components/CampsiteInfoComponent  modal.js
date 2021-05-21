import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class CampsiteInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: true
        };
        
    this.toggle = this.toggle.bind(this);
        //this.campsite = campsite;
    }
    
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

    renderComments(comments){
        if(comments){
            return(
                <div className = "col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map(comment => {
                        return(
                            <div key={comment.id}>
                            <p>
                                {comment.text}
                            </p>
                            <p>
                               -- {comment.author} | {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                            </p>
                            </div>
                        );}
                        )
                        }
                </div>
            );
        }
        return <div />;

    }
    renderCampsite(campsite){
        if(campsite){
            return(
                <div className = "col-md-5 m-1">
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
render(){

    if(this.props.campsite){
            return(
                
                <div className="row">
                    <div className="col-md-5 m-1">
      <Modal isOpen={this.state.modal} toggle={this.toggle} className="comments" >
        <ModalHeader toggle={this.toggle}>Campsite Details</ModalHeader>
        <ModalBody>
    
        { this.renderCampsite(this.props.campsite) }
                    { this.renderComments(this.props.campsite.comments) }
                </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
      </div>
    </div>
            );
        }
        return <div />;
    }
}
export default CampsiteInfo;