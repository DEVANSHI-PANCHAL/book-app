import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Main = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://www.googleapis.com/books/v1/volumes?q=popular')
      .then((response) => {
        setData(response.data.items);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  const tableStyle = {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f8f8f8',
    padding: '20px',
  };

  const bookImageStyle = {
    maxWidth: '100px', // Adjust the image width as needed
    height: 'auto',
  };

  return (
    <div style={tableStyle}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={item.volumeInfo.imageLinks.thumbnail}
                    alt={item.volumeInfo.title}
                    style={bookImageStyle}
                  />
                </td>
                <td>{item.volumeInfo.title}</td>
                <td>{item.volumeInfo.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Main;
