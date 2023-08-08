import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = ({allItems, deleteItem /*,authError, setAuthError*/}) => {
    const navigate = useNavigate();
    // console.log(allItems)
    
    const deleteHandler = e => {
        const itemId = e.target.id;
        deleteItem(itemId);
    }

    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials: true})
            .then(res => {
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="home-background">
            <div className="home-container">
                <nav className="mb-5 home-nav d-flex flex-row align-items-center">
                    <Link className="btn mt-5 logo-header" to={'/home'} >Wishfor__</Link>
                    <ul className="nav-list mt-5 d-flex flex-row align-items-center">
                        <li className="mx-4">
                            <Link to={'/new'} className="add-item btn">Add Item </Link>
                        </li>
                        <li><button onClick={logout} className="logout btn btn-light">Log Out</button></li>
                    </ul>
                </nav>
                
                { allItems.length === 0 ?
                    <div className="d-flex flex-column align-items-center"> 
                        <h1 className="text-white">Nothing to See Here.</h1>
                        <Link to={'/new'} className="btn text-white">Start Building Your Wishlist</Link>
                    </div> 
                    : allItems.map(item => {
                        return (
                            <div className="list-item-container mb-5" key={item._id}>
                                <ul className="list d-flex flex-row justify-content-evenly align-items-center">
                                    <div className="list-section">
                                        <p className="item-label">Name</p>
                                        <li className="list-item"><a href={item.link} alt="item link" rel="noreferrer" target="_blank">{item.itemName}</a></li>
                                    </div>
                                    <div className="list-section">
                                        <p className="item-label">Qty</p>
                                        <li className="list-item">{item.quantity}</li>
                                    </div>
                                    <div className="list-section">
                                        <p className="item-label">Priority</p>
                                        <li className="list-item">{item.priority}</li>
                                    </div>
                                    <div className="list-section">
                                        <p className="item-label">Comment(s)</p>
                                        <li className="list-item">{item.comments}</li>
                                    </div>
                                    <div className="action-container d-flex">
                                        <br></br>
                                        <Link to={`/edit/${item._id}`}><img className="action-icon" src={require('../images/edit-icon.png')} alt="edit-icon"></img></Link>
                                        <img className="action-icon mx-5" src={require('../images/delete-icon.png')} alt="delete-icon" onClick={deleteHandler}></img>
                                    </div>
                                </ul>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home;