import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
    
class Directory extends Component {

    
    render() {
        const directory = this.props.campsites.map(campsite => {
        return(
            <div key={campsite.id} className="col-md-5 m1">
                <Card>
                    <Link to={`/directory/${campsite.id}`}>
                        <CardImg src={campsite.image} alt={campsite.name} />
                        <CardImgOverlay>
                            <CardTitle>{campsite.name}</CardTitle>
                        </CardImgOverlay>
                    </Link>
                </Card>
            </div>
        );
        });
        return(
            <div className="container">
                <div className="row">
                    {directory}
                </div>
            </div>
            );
    }
}
export default Directory;
