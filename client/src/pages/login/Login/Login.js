import { useState } from "react";
import "./Login.scss";
import axios from "axios";
import {Form} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Alert} from "react-bootstrap";
import {Container} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Login = (props) => {
    let history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {loginResult, setLoginResult} = props;

    const login = () => {
        const data = { username: username, password: password };
        axios
        .post("http://localhost:3001/login", data)
        .then((response) => {
            if (response.data.statusOK){
                setLoginResult(prevState => ({
                    statusOk: true,
                    messageError: null
                }));
                history.push("/dashBoard");
            } else {
                setLoginResult(prevState => ({
                    statusOk: false,
                    messageError: response.data.error
                }));
            }
        })
        .catch(err => console.log(err));
    };
    
    return (
        <div>
            <Link to="/">
                <div className="cursor-pointer return-arrow"><i className="fas fa-arrow-left fa-2x" aria-hidden="true"></i></div>
            </Link>
            <Container className="main-container">
                <Row className="justify-content-md-center">
                    <h4>LOGUEJA'T</h4>
                    <Form className="register-form margin-top-20">
                        <Form.Group controlId="username">
                            <Form.Label>Usuari</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Entra l'usuari"
                                name="username"
                                onChange={(event) => {
                                    setUsername(event.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group controlId="password" className="margin-top-20">
                            <Form.Label>Contrasenya</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Entra la contrasenya"
                                name="password"
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }}
                            />
                        </Form.Group>
                        <Button onClick={login} className="margin-top-20"> Accedir </Button>
                    </Form>
                    {loginResult.messageError != null && <Alert className="margin-top-20" variant={'danger'}>
                        {loginResult.messageError} 
                    </Alert>}
                    <div className="margin-top-20">
                        <div>Usuari: adminColegiGeografs</div>
                        <div>Password: @32250170a0dca92d53ec9624f336ca24</div>
                    </div>
                </Row>
            </Container>
        </div>
      );
};

export default Login;