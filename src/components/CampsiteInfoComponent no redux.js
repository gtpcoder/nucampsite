import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem  } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderCampsite({campsite}) {
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

function RenderComments({comments}) {
    if (comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.sort((a, b) => (a.date < b.date) ? 1 : -1).map(comment => {
                    return (
                        <div key={comment.id}>
                            <p>{comment.text} -- {comment.rating}
                                {(() => {
                                    if (comment.rating > "1") {
                                        return " stars"
                                    }
                                    else { return " star" };
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
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    }
    return <div />;
}


export default CampsiteInfo;