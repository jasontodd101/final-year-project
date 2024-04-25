import React from 'react'

const ResultItem = (props) => {
  let {resultitem,rank} =props
  let ranking=(rank%3+1)
    return (
      <tr>
      <th scope="row">{ranking}</th>
      <td>{resultitem.EName}</td>
      <td>{resultitem.USN}</td>
      <td>{resultitem.PName}</td>
      <td>{resultitem.Branch}</td>
      <td>{resultitem.Sem}</td>
      <td>{resultitem.Marks}</td>
    </tr>
       
    )
}

export default ResultItem
