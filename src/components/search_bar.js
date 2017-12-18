import React, { Component } from 'react';
// ** Async typeahead capabilities
import { asyncContainer, Typeahead } from 'react-bootstrap-typeahead';

const AsyncTypeahead = asyncContainer(Typeahead);

class SearchBar extends Component {

  render() {
    return (
      <AsyncTypeahead
        labelKey={ option => {
          if(option.profile_path && option.known_for.length === 3){
            return option.name;
          }else {
            return ''
          }
        }}
        isLoading={true}
        onSearch={ query => this.props.onSearchCallback(query) }
        onChange={ event => this.props.onChangeCallback(event) }
        options={this.props.options}
        placeholder="Search for anybody in the film industry..."
        renderMenuItemChildren={this._renderMenuItemChildren}
      />
    )
  }

  _renderMenuItemChildren(option, props, index) {
    return (
      <div key={index}>
        <span>{option.name}</span>
      </div>
    );
  }
}

export default SearchBar;
