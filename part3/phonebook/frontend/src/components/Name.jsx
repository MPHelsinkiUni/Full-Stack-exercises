const Name = (props) => {
  console.log("Printed", props.person)
  return (
    <tr>
      <td>{ props.person }</td>
      <td>{ props.number }</td>
      <td><button id="deleteButton" person={props.person} value={props.id} onClick={() => props.removeName(props.id, props.person)}>delete</button></td>
    </tr>
  )
}

export default Name