import React, { useEffect, useState } from 'react';
import './shopdata.css'; // Import the CSS file
import { ToastContainer, toast } from 'react-toastify';
import Nav from '../Nav/Nav';

function ShopForm() {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const auth = localStorage.getItem('userid');

  const getData = async () => {
    try {
      let result = await fetch(`https://haircare.onrender.com/getreq/${auth}`);
      if (!result.ok) {
        throw new Error('Network response was not ok');
      }
      result = await result.json();
      // console.log(result);
      setData(result);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
      console.error('Error in fetching data:', error);
    }
  };

  const acceptreq = async (id) => {
    let result = await fetch(`https://haircare.onrender.com/update/${id}`, {
      method: 'put',
      body: JSON.stringify({ reqee: true }),
      headers: {
        'content-type': 'application/json'
      },
    })
    result = await result.json();
    // console.log(result);
    toast.success("Request accept..😃!", {
      position: "top-center"
  });
  }

  const deletereq=async(id)=>{
    let result=await fetch(`https://haircare.onrender.com/deletereq/${id}`,{
      method:'delete'
    });
    result = await result.json();
    if(result){
      toast.dark("Deleted..",{
        position:"top-center" 
      })
    }
    getData();
  }

  return (
    <div>
      <Nav />
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
                  <p>{item._id}</p>
                  &nbsp;  &nbsp;  &nbsp;  &nbsp;
                  <p>{item.timee}</p>
                  <div className='accept-req-btn'>
                    <button onClick={()=> acceptreq(item._id)}>Accept Request</button>
                    <button onClick={()=> deletereq(item._id)} style={{backgroundColor:'red',marginLeft:'15px',width:'80px'}}>Delete</button>

                  </div>
                </ul>

              </div>
            </div>
          ))
        ) : (
          <div>No data available</div>
        )}


<ToastContainer/>

      </div>

    </div>
  );
}

export default ShopForm;
