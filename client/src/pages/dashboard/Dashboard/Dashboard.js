import { useState, useEffect } from "react";
import "./Dashboard.scss";
import axios from "axios";
import {Table, Button} from "react-bootstrap";

const DashBoard = (props) => {
    const [usersData, setUsersData] = useState(null);

    useEffect(() => {
        axios.get("/api")
        .then((res) => setUsersData(res.data))
        .catch(err => console.log(err));
    }, []);

    let usersList=[];
    usersData?.map((item,index)=>{
        usersList.push( 
            <tr key={index}>
                <td>{item.idgeograf}</td>
                <td>{item.nom}</td>
                <td>{item.cognoms}</td>
                <td><Button variant="danger">Eliminar</Button></td>
            </tr>
        )
    })

    const redirectNewWindow = () => {
        let url = window.location.origin;
        window.open(url);
    }
    /* TODO falta fer que funcioni */
    const logout = () => {
        const data = { username: 'adminColegiGeografs', password: '@32250170a0dca92d53ec9624f336ca24' };
        axios
        .delete("/logout", data)
        .then((response) => {
            console.log(response)
        })
        .catch(error => {
            if (!error.response) {
                console.log('Error: Network Error');
            } else {
                console.log(error.response.data.message);
            }
        })
    };

    return(
        <div className="main-container-dashboard">
            <h2>Dashboard</h2>
            <div>
                <span onClick={redirectNewWindow} className="cursor-pointer margin-right-30">Mapa <i className="fas fa-map-marked-alt fa-lg" aria-hidden="true"></i></span>
                <span onClick={logout} className="cursor-pointer">Logout <i className="fas fa-sign-out-alt fa-lg" aria-hidden="true"></i></span>
            </div>
            <div className="table-div">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>idGeograf</th>
                        <th>Nom</th>
                        <th>Cognoms</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersList}
                    </tbody>
                </Table>
                <Button variant="success">Afegir</Button>
            </div>
        </div>
    )
}

export default DashBoard;