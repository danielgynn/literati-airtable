import React, { Component } from "react";
import { Box, Text, Icon } from "archetype-ui";

class Loader extends Component {
  render() {
    return (
      <Box>
        <Text>
          <Icon icon="spinner" spin /> Loading...
        </Text>
      </Box>
    );
  }
}

export default Loader;
