import React from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import Table from './Table';
import Wrapper from './Wrapper';

function List(props) {
  const ComponentToRender = props.component;
  let headers = <tr />;
  let items = <tr />;

  // If we have items, render them
  if (props.items && props.headers) {
    headers = <tr>
      {_.range(props.headers.length).map(index => (
        <th key={`${index}`} style={{
          padding: '10px',
        }}>
          {props.headers[index]}
        </th>
      ))}
    </tr>
    items = props.items.map(item => (
      <ComponentToRender
        key={`item-${item.id}`}
        item={item}
        {...props.theirProps}
      />
    ));
  } else {
    // Otherwise render a single component
    items = <ComponentToRender />;
  }

  return (
    <Wrapper>
      <Table>
        <tbody>
          {headers}
          {items}
        </tbody>
      </Table>
    </Wrapper>
  );
}

List.propTypes = {
  component: PropTypes.elementType.isRequired,
  items: PropTypes.array,
};

export default List;
