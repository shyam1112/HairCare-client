import React, { useEffect, useState } from 'react';
import Cusnavbar from '../Navbar/Cusnavbar';
import './cushome.css';
import Accordion from 'react-bootstrap/Accordion';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ShopItem({ item }) {
  const [requestSent, setRequestSent] = useState(false);
  const [rsp, setRsp] = useState('Best of luck');
  const [time, setTime] = useState({ hour: 10, minute: 0, ampm: 'AM' });

  const onChangeHour = (event) => {
    const newHour = parseInt(event.target.value);
    setTime({ ...time, hour: newHour });
  };

  const onChangeMinute = (event) => {
    const newMinute = parseInt(event.target.value);
    setTime({ ...time, minute: newMinute });
  };

  const onChangeAmPm = (event) => {
    const newAmPm = event.target.value;
    setTime({ ...time, ampm: newAmPm });
  };

  const sendreq = async (userId) => {
    let idd = '';
    const timee = time.hour + ':' + time.minute + ':' + time.ampm;
    const reqee = false;
    try {
      const response = await fetch('https://haircare.onrender.com/sendreq', {
        method: 'POST',
        body: JSON.stringify({ userId, timee, reqee }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        idd = data.id;
        toast.success('Request sent Successfully...done 😃!', {
          position: 'top-center',
        });
        setRsp('Confirm');
      } else {
        toast.error('Request failed. Please try again later.', {
          position: 'top-center',
        });
      }
    } catch (error) {
      toast.error('Error sending data', {
        position: 'top-center',
      });
      console.error('Error sending data', error);
    }
    setRequestSent(true);

    setTimeout(async () => {
      try {
        let result = await fetch(`https://haircare.onrender.com/accept/${idd}`);
        if (!result.ok) {
          throw new Error('Network response was not ok');
        }
        result = await result.json();
        if (result.reqee === true) {
          setRsp('Confirm');
        } else {
          setRsp('Select Another time..');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setRequestSent(false);
      }
    }, 10000);
  };

  return (
    <div>
      <Accordion.Item eventKey={item._id}>
        <Accordion.Header>Shop Name : {item.shopname}</Accordion.Header>
        <Accordion.Body>
          <p>Owner : {item.owner}</p>
          <p>Id : {item._id}</p>
          <p>Mobile Number : {item.mobilenumber}</p>
          <p>Address : {item.address}</p>
          <div className='timepicker'>
            {/* Time Picker */}
            <label>
              Select Time : &nbsp;
              <select value={time.hour} onChange={onChangeHour}>
                {Array.from({ length: 12 }).map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </label>
            <span>:</span>
            <label>
              <select value={time.minute} onChange={onChangeMinute}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <option key={index} value={index * 15}>
                    {index * 15}
                  </option>
                ))}
              </select>
            </label>
            <label>
              &nbsp;{' '}
              <select value={time.ampm} onChange={onChangeAmPm}>
                <option value='AM'>AM</option>
                <option value='PM'>PM</option>
              </select>
            </label>
          </div>
          {requestSent ? (
            'Waiting..'
          ) : (
            <div className='btnreq'>
              <button onClick={() => sendreq(item.userId)}>Send request</button>{' '}
              <button style={{ backgroundColor: rsp === 'Confirm' ? 'green' : 'red', color: 'white' }}>
                {rsp}
              </button>{' '}
            </div>
          )}
        </Accordion.Body>
      </Accordion.Item>
    </div>
  );
}

function Cushome() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let result = await fetch('https://haircare.onrender.com/getshopdata');
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

  const searchdata = async (event) => {
    let key = event.target.value.toLowerCase();
    if (key) {
      let result = await fetch(`https://haircare.onrender.com/search/${key}`);
      result = await result.json();
      if (result) {
        setData(result);
      }
    } else {
      getData();
    }
  };

  return (
    <div>
      <Cusnavbar />
      <div className='cushome'>
        <div className='searchbar'>
          <input type='text' className='search' placeholder='Search the shop' onChange={searchdata} />
        </div>
        <hr />
        <div className='shopitem'>
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error.message}</div>
          ) : data && data.length > 0 ? (
            data.map((item) => (
              <ul key={item._id}>
                <Accordion>
                  <ShopItem item={item} />
                </Accordion>
              </ul>
            ))
          ) : (
            <div>No data available</div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Cushome;
