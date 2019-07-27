import React, { Component } from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui//MenuItem";
import ImageOutputs from "../image-output/ImageOutputs";

class Search extends Component {
  state = {
    searchText: "",
    amount: 15,
    apiUrl: "https://pixabay.com/api",
    apiKey: "13149834-026a8e95d8660b1e6661a8cff",
    images: []
  };

  onTextChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    fetch(
      `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${
        this.state.searchText
      }&image_type=photo&per_page=${this.state.amount}`
    )
      .then(res => res.json())
      .then(data => this.setState({ images: data.hits }))
      .catch(err => console.log(err));
  };

  onAmountChange = (e, index, value) => {
    this.setState({ amount: value });
  };

  render() {
    console.log(this.state.images);

    return (
      <div>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          floatingLabelText="Search for Images"
          fullWidth={true}
        />
        <br />
        <SelectField
          name="amount"
          floatingLabelText="Number of images"
          value={this.state.amount}
          onChange={this.onAmountChange}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </SelectField>
        <br />
        {this.state.images.length > 0 ? (
          <ImageOutputs images={this.state.images} />
        ) : null}
      </div>
    );
  }
}

export default Search;
