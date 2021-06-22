import React from "react";
import styled from "styled-components";
import "./App.css";

const Container = styled.div`
  width: 100%;
  height: 100vh;

  background: url("https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fpapers.co%2Fwallpaper%2Fpapers.co-au35-nature-sunset-simple-minimal-illustration-art-red-25-wallpaper.jpg&f=1&nofb=1");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  position: relative;
  width: 30rem;
  max-width: 35rem;

  cursor: pointer;

  padding: 2.5rem;
  padding-bottom: 5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 10px;
  filter: opacity(0.5);
  min-height: 30rem;
  font-size: 1.5rem;
  transition: all 850ms ease-in;
  background-color: #d0d0d0;
  &:hover {
    filter: opacity(0.6);
    transform: scale(1.025);
  }
`;

const Quotes = styled.h2`
  text-align: center;
`;

const Author = styled.h4`
  margin-top: 2rem;

  font-size: medium;
`;

const CTA = styled.div`
  display: flex;
  span {
    width: 5rem;

    padding: 1rem;
    background-color: #fe451c;
    border-radius: 50%;
    margin: auto 0.25rem;
  }
  span i {
    color: white;
  }
  position: absolute;
  top: 90%;
`;

function App() {
  const [quotes, setQuotes] = React.useState([]);
  const [newQuote, setNewQuote] = React.useState({});

  // Get All the Quotes
  React.useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data);
        setQuotes(data);
        setNewQuote({ ...data[0] });
      });
  }, []);

  // Get Random Number
  const getRandomNum = () => {
    return Math.floor(Math.random() * 1644 + 1);
  };

  return (
    <Container>
      <Card>
        <Quotes>
          <i className="quotes fas fa-quote-left"></i>
          {newQuote.text}
          <i className="quotes fas fa-quote-right"></i>
        </Quotes>

        <Author>{newQuote.author !== "" ? newQuote.author : "Unknown"}</Author>

        <CTA className="tweet">
          <span className="center">
            <i
              onClick={() => {
                // Tweet the quote , using API Call
                window.open(
                  `https://twitter.com/intent/tweet?text=${
                    newQuote.text + " - " + newQuote.author
                  }
                `
                );
              }}
              title="Tweet me"
              className="fab fa-twitter fa-2x"
            ></i>
          </span>
          <span className="center">
            <i
              title="Tweet me"
              onClick={() => {
                setNewQuote(quotes[getRandomNum()]);
              }}
              className="fas fa-forward fa-2x"
            ></i>
          </span>
        </CTA>
      </Card>
    </Container>
  );
}

export default App;
