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

    return(
        <div className="main-container-dashboard">
            <h2>Dashboard</h2>
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