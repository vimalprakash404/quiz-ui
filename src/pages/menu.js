import React, { useState , useEffect} from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import domain from '../domian';
import axios  from 'axios';


const MobileMenu = () => {
  const token = localStorage.getItem("token")
  console.log(token );
  const [cardStates, setCardStates] = useState([
    { id: 1 , name : "AI and ML", isClicked: false },
    { id: 2,name : "Data Structure", isClicked: false },
    // Add more cards as needed
  ]);
  const [responceData, setResponceData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make API call using Axios
        const demo_ob =domain();
        const response = await axios.get(demo_ob.concat('/quiz/all'));
  
        // Update the state with the fetched data
        setResponceData(response.data);
        const data =[];
        response.data.forEach((object, index) => {
          data.push({id : object._id , name : object.name , isClicked: false, question : object.questions})
        });
        setCardStates(data);

      } catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
      } 
  }
  
  fetchData();
  },[]);
  
  

  const navigate = useNavigate();

  const containerStyle = {
    margin: '20px', // Adjust the margin as needed
  };

  const handleCardClick = (cardId , question) => {
    console.log("cardid" + cardId);
    setCardStates((prevStates) =>
      prevStates.map((card) =>
        card.id === cardId ? { ...card, isClicked: !card.isClicked } : card
      )
    );

    // Redirect to "/quiz" on card click
    navigate('/quiz', {state:{question : question , id : cardId }});
  };
console.log(cardStates);
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
            onClick={() => handleCardClick(card.id, card.question)}
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
