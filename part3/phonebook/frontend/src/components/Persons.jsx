import Name from './Name'

const Persons = (props) => {
  return (
    <div>
      <table>
        <thead>
        <tr>
          <td><b>Name</b></td><td><b>Phone number</b></td><td></td>
        </tr>
        </thead>
        <tbody>
        {props.namesToShow.map((person, index) => (<Name key={index} id={person.id} person={person.name} number={person.number} removeName={props.removeName}/>))}
        </tbody>
      </table>
    </div>
  )
}

export default Persons