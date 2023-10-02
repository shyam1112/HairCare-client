import React, { useEffect, useState } from 'react'
import Nav from '../Nav/Nav';
import './profile.css';
export default function Profile() {

    const auth = localStorage.getItem('userid');
    // console.log(auth);
    const [data, setData] = useState({
        userId: '',
        shopname: '',
        owner: '',
        mobilenumber: '',
        address: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            let result = await fetch(`https://haircare.onrender.com/profile/${auth}`);
            if (!result.ok) {
                throw new Error(`Fetch error: ${result.status}`);
            }
            result = await result.json();
            setData(result);
            setLoading(false); 
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };
    return (
        <div>
            <Nav />
            <div className='profilemain'>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) :
                    (
                        <div className="ccard" >
                            <div className="ccard-image">
                                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" />
                            </div>
                            <div className="coontainer">
                                <h4><b><i>Hi! </i></b></h4>
                                <h4><b><i>Shopname: {data[0].shopname}</i></b></h4>
                                <p> userId : {data[0].userId}</p>
                                <p> owner : {data[0].owner}</p>
                                <p> mobilenumber : {data[0].mobilenumber}</p>
                                <p> address : {data[0].address}</p>
                            </div>
                        </div>

                    )}
            </div>
        </div>
    )
}
