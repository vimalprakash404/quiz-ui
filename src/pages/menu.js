import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const MobileMenu = () => {
  const [cardStates, setCardStates] = useState([
    { id: 1 , name : "AI and ML", isClicked: false },
    { id: 2,name : "Data Structure", isClicked: false },
    // Add more cards as needed
  ]);

  const navigate = useNavigate();

  const containerStyle = {
    margin: '20px', // Adjust the margin as needed
  };

  const handleCardClick = (cardId) => {
    setCardStates((prevStates) =>
      prevStates.map((card) =>
        card.id === cardId ? { ...card, isClicked: !card.isClicked } : card
      )
    );

    // Redirect to "/quiz" on card click
    navigate('/quiz');
  };

  return (
    <div>
      <div className='display-1 text-primary'>
        <center>Menu</center>
      </div>
      <hr/>
      <div style={containerStyle}>
        {cardStates.map((card) => (
          <Card
            key={card.id}
            style={{
              marginBottom: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease-in-out, background 0.3s ease-in-out, color 0.3s ease-in-out',
              transform: card.isClicked ? 'scale(1.05)' : 'scale(1)',
              background: card.isClicked ? '#3498db' : '#fff',
              color: card.isClicked ? '#fff' : '#333',
              cursor: 'pointer',
            }}
            onClick={() => handleCardClick(card.id)}
          >
            <Card.Body>
              <h5>{`${card.name}`}</h5>
              {/* <p>{`Description for Option ${card.id}.`}</p> */}
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
