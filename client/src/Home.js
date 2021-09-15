import React from 'react';
import './index.css';
import Container from "react-bootstrap/Container";


class Home extends React.Component {
    render() {
        return (
            <Container fluid className="p-5" style={{ fontSize: '6rem' }}>Welcome .</Container>

        );
    }
}
export default Home;