import React from 'react';

const Test = ({ text }) => (
  <div className="">
    {text}
  </div>
);

Test.propTypes = {
  text: React.PropTypes.string.isRequired,
};

export default Test;
