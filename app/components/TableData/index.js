import React from 'react';

function TableData(props) {
  return <td style={{
    padding: '5px 10px 0',
    textAlign: props.textAlign,
    fontWeight: props.bold ? 'bold' : 'normal'
  }}>
    {props.content}
  </td>
}

export default TableData;
