import React, { Component } from "react";
import PropTypes from "prop-types";
import { GridList, GridTile } from "material-ui/GridList";
import IconButton from "material-ui/IconButton";
import ZoomIn from "material-ui/svg-icons/action/zoom-in";
import Diaglog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

class ImageOutputs extends Component {
  state = {
    open: false,
    currentImage: ""
  };

  handleOpen = img => {
    this.setState({ open: true, currentImage: img });
  };

  handleClose = img => {
    this.setState({ open: false });
  };

  render() {
    let imageListContent;
    const { images } = this.props;

    if (images) {
      imageListContent = (
        <GridList cols={3}>
          {images.map(img => (
            <GridTile
              title={img.tags}
              key={img.id}
              subtitle={
                <span>
                  by <strong>{img.user}</strong>
                </span>
              }
              actionIcon={
                <IconButton onClick={img => this.handleOpen(img.largeImageURL)}>
                  <ZoomIn color="white" />
                </IconButton>
              }
            >
              <img src={img.largeImageURL} alt="" />
            </GridTile>
          ))}
        </GridList>
      );
    } else {
      imageListContent = null;
    }

    const actions = [
      <FlatButton label="close" primary={true} onClick={this.handleClose} />
    ];

    return (
      <div>
        {imageListContent}
        <Diaglog
          action={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <img src={this.state.currentImage} alt="" style={{ widht: "100%" }} />
        </Diaglog>
      </div>
    );
  }
}

ImageOutputs.propTypes = {
  images: PropTypes.array.isRequired
};

export default ImageOutputs;
