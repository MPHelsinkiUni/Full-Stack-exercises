import Name from './Name'

const Persons = (props) => {
  return (
    <div>
      <table>
        <thead>
        <tr>
          <td><b>Name</b></td><td><b>Phone number</b></td>
        </tr>
        </thead>
        <tbody>
        {props.namesToShow.map((person, index) => (<Name key={index} person={person.name} number={person.number}/>))}
        </tbody>
      </table>
    </div>
  )
}

export default Persons