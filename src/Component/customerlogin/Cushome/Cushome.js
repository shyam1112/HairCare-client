import React, { useEffect, useState } from 'react';
import Cusnavbar from '../Navbar/Cusnavbar';
import './cushome.css';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { TimePicker } from 'react-ios-time-picker';
function Cushome() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [value, setValue] = useState('10:00');

  const onChange = (timeValue) => {
     setValue(timeValue);
  }
  console.log(value);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let result = await fetch('http://localhost:4000/getshopdata');
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
  }

  const searchdata = async (event) => {
    let key = event.target.value;
    if (key) {

      let result = await fetch(`http://localhost:4000/search/${key}`);
      result = await result.json();
      if (result) {
        setData(result);
      }
    } else {
      getData();
    }

  }

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
                    <p>Owner :{item.owner}</p>
                    <p>Mobile Number :{item.mobilenumber}</p>
                    <p>Address :{item.address}</p>
                    <div className='timepicker'>

                    <TimePicker onChange={onChange} value={value} />
                    </div>
                    <Button variant="primary">Send request</Button>{' '}
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
