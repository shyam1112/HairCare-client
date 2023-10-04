import React, { useEffect, useState } from 'react';
import './shopdata.css'; // Import the CSS file
import { ToastContainer, toast } from 'react-toastify';
import Navv from '../Nav/Navv';

function ShopForm() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const auth = localStorage.getItem('userid');

  const [acceptedRequests, setAcceptedRequests] = useState([]);

  const fetchData = async () => {
    try {
      let result = await fetch(`https://haircare.onrender.com/getreq/${auth}`);
      if (!result.ok) {
        throw new Error('Network response was not ok');
      }
      result = await result.json();
      setData(result);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
      console.error('Error in fetching data:', error);
    }
  };

  const acceptreq = async (id) => {
    try {
      let result = await fetch(`https://haircare.onrender.com/update/${id}`, {
        method: 'put',
        body: JSON.stringify({ reqee: true }),
        headers: {
          'content-type': 'application/json'
        },
      });
      result = await result.json();
      toast.success('Request accepted..😃!', {
        position: 'top-center'
      });
      // fetchData();
      setAcceptedRequests([...acceptedRequests, id]);
    } catch (error) {
      console.error('Error in accepting request:', error);
    }
  };

  const deletereq = async (id) => {
    try {
      let result = await fetch(`https://haircare.onrender.com/deletereq/${id}`, {
        method: 'delete'
      });
      result = await result.json();
      if (result) {
        fetchData();
        toast.dark('Deleted..', {
          position: 'top-center'
        });
      }
    } catch (error) {
      console.error('Error in deleting request:', error);
    }
  };

  useEffect(() => {
    fetchData();

    const pollInterval = 3000;
    const pollTimer = setInterval(fetchData, pollInterval);

    return () => clearInterval(pollTimer);
  }, []);

  return (
    <div>
      <Navv />
      <div className='shopdata-main'>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : data && data.length > 0 ? (
          data.map((item, index) => (
            <div className='alertt'>
              <div className='faltu'>
                <ul key={item._id}>
                  <p>{item.name}</p>
                  &nbsp; &nbsp; &nbsp; &nbsp;
                  <p>{item.timee}</p>
                  <div className='accept-req-btn'>
                    {!acceptedRequests.includes(item._id) ? (
                      <button onClick={() => acceptreq(item._id)}>Accept Request</button>
                    ):(
                      <button
                      onClick={() => deletereq(item._id)}
                      style={{ backgroundColor: 'green', marginLeft: '15px', width: '80px' }}
                    >
                      Done
                    </button>
                    )}                    
                    <button
                      onClick={() => deletereq(item._id)}
                      style={{ backgroundColor: 'red', marginLeft: '15px', width: '80px' }}
                    >
                      Delete
                    </button>
                  </div>
                </ul>
              </div>
            </div>
          ))
        ) : (
          <div>No data available</div>
        )}
        <ToastContainer />
      </div>
    </div>
  );
}

export default ShopForm;
