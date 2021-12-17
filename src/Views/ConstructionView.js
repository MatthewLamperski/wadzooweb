import React, {useState, useEffect} from 'react';
import '../index.css'
import {Box, Text, Fade, Divider} from "native-base";

const ConstructionView = () => {
  const [constructionText, setConstructionText] = useState("Wadzoo is currently under construction")
  useEffect(() => {
    setInterval(() => {
      setConstructionText(prevState => {
        if (prevState.substr(prevState.length - 3) === '...') {
          return "We are currently under construction"
        } else {
          return prevState + "."
        }
      })
    }, 750)
  }, [])
  return (
    <div
      className="animatedGradient"
      style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
    >
      <Box
        w="100%"
      >
        <Fade in={true} duration={1000}>
          <Box
            my={5}
            mx="auto"
            bg={`rgba(255, 255, 255, 0.4)`}
            style={{flexShrink: 1}}
            justifyContent="center"
            alignItems="center"
            w={"75%"}
            p={10}
            rounded={8}
            shadow={5}
          >
            <Text
              fontWeight={300}
              fontSize={35}
              textAlign="center"
            >Wadzoo</Text>
            <Text
              pt={2}
              fontWeight={300}
              fontSize={20}
              textAlign="center"
            >Connect with other real estate investors. Expand your network. Find exclusive listings.</Text>
            <Divider m={4} bg="black" />
            <Text
              fontWeight={300}
              fontSize={15}
              textAlign="center"
            >{constructionText}</Text>
          </Box>
        </Fade>
        <Fade in={true} duration={1000}>
          <Text
            fontWeight={300}
            fontSize={20}
            textAlign="center"
          >Coming soon to the App Store and Google Play Store.</Text>
        </Fade>
      </Box>
    </div>
  );
};

export default ConstructionView;
