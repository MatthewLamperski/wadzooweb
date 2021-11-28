import React, {useState, useEffect} from 'react';
import '../index.css'
import {Box, Text, Fade, Divider} from "native-base";
import { FaHammer } from "react-icons/all";

const ConstructionView = () => {
  const [constructionText, setConstructionText] = useState("Wadzoo is currently under construction")
  useEffect(() => {
    setInterval(() => {
      setConstructionText(prevState => {
        if (prevState.substr(prevState.length - 3) === '...') {
          return "Wadzoo is currently under construction"
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
          >
            <Text
              fontWeight={300}
              fontSize={30}
            >{constructionText}</Text>
          </Box>
        </Fade>
      </Box>
    </div>
  );
};

export default ConstructionView;
