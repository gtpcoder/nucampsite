import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';


function RenderPartner({ partner }) {
    if(partner) {
        console.log("partner");
        return(
            <React.Fragment>
                <Media object width="150" src={partner.image} alt={partner.name} />
                <Media body className="ml-5 mb-4">
                    <Media heading>{partner.name} </Media>
                        {partner.description}
                    </Media>  
               </React.Fragment>
        )
        } else {
            console.log("no partner");
            return(<div />);
        };
    };


function About(props) {

    const partners = props.partners.map(partner => {
        console.log(partner.id)
        return (
            
             <Media tag="li" key={partner.id}>
              anything
             </Media>
        );
    });


    return (
        <div className="container">
