import React, { useEffect, useState } from 'react';
import Cusnavbar from '../Navbar/Cusnavbar';
import './cushome.css';
import Accordion from 'react-bootstrap/Accordion';

function Cushome() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [hour, setHour] = useState(10);
  const [minute, setMinute] = useState(0);
  const [ampm, setAmPm] = useState('AM');

  const onChangeHour = (event) => {
    setHour(parseInt(event.target.value));
  };

  const onChangeMinute = (event) => {
    setMinute(parseInt(event.target.value));
  };

  const onChangeAmPm = (event) => {
    setAmPm(event.target.value);
  };

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
    let key = event.target.value;
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
            data.map((item, index) => (
              <ul key={item._id}>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Shop Name : {item.shopname}</Accordion.Header>
                    <Accordion.Body>
                      <p>Owner : {item.owner}</p>
                      <p>Mobile Number : {item.mobilenumber}</p>
                      <p>Address : {item.address}</p>
                      <div className='timepicker'>
                        {/* Time Picker */}
                        <label>
                          Select Time : &nbsp;
                          <select value={hour} onChange={onChangeHour}>
                            {Array.from({ length: 12 }).map((_, index) => (
                              <option key={index} value={index + 1}>
                                {index + 1}
                              </option>
                            ))}
                          </select>
                        </label>
                        <span>:</span>
                        <label>
                          <select value={minute} onChange={onChangeMinute}>
                            {Array.from({ length: 4 }).map((_, index) => (
                              <option key={index} value={index * 15}>
                                {index * 15}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label>
                        &nbsp; <select value={ampm} onChange={onChangeAmPm}>
                            <option value='AM'>AM</option>
                            <option value='PM'>PM</option>
                          </select>
                        </label>
                      </div>
                      <div className='btnreq'>
                        <button>Send request</button>{' '}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </ul>
            ))
          ) : (
            <div>No data available</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cushome;
