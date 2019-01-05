import React from 'react';

import TextField from '@material-ui/core/TextField';



  

class SearchBox extends React.Component {
  state = {
    searchText: '',
  };


  handleChange = prop => event => {
    this.props.handleSearch(event.target.value)
    this.setState({ [prop]: event.target.value });
  };

  render() {
    return (
            <TextField
              margin="dense"
              id="searchText"
              label="Search"
              value={this.state.searchText}
              onChange={this.handleChange('searchText')}
              fullWidth
            />
    );
  }
}

export default SearchBox;