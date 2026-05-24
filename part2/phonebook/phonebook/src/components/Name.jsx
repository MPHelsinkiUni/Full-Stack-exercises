const Name = (props) => {
  console.log("Printed", props.person)
  return (
    <tr>
      <td>{ props.person }</td>
      <td>{ props.number }</td>
      <td><button id="deleteButton" value={props.id} onClick={() => props.removeName(props.id)}>delete</button></td>
    </tr>
  )
}

export default Name