import React from 'react';
import Input from 'wix-style-react/Input';
import TextButton from '../utils/Components/TextButton';

class CommandsExample extends React.Component {
  render() {
    const handleClick1 = () => this.refs.inputtest.focus();

    const handleClick2 = () => {
      this.refs.inputtest.focus();
      setTimeout(() => this.refs.inputtest.blur(), 1000);
    };

    const handleClick3 = () => {
      this.refs.inputtest.focus();
      this.refs.inputtest.select();
    };

    return (
      <div className="ltr">
        <div style={{width: '400px'}}>
          <Input theme={this.props.theme} ref="inputtest"/>
        </div>
        <TextButton onClick={handleClick1}>Focus</TextButton>
        <TextButton onClick={handleClick2}>Focus &amp; blur 1 second later</TextButton>
        <TextButton onClick={handleClick3}>Select text</TextButton>
      </div>
    );
  }
}

CommandsExample.propTypes = {
  theme: React.PropTypes.string
};

const Example = ({theme}) =>
  <div>
    <CommandsExample theme={theme}/>
  </div>;

Example.propTypes = {
  theme: React.PropTypes.string
};

export default Example;
