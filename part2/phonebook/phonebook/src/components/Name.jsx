const Name = (props) => {
  console.log("Printed", props.person)
  return (
    <tr>
      <td>{ props.person }</td>
      <td>{ props.number }</td>
    </tr>
  )
}

export default Name