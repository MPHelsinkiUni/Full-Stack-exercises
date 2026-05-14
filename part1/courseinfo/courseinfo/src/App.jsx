const Header = (props) => {
  return (
    <div>
      <h1>
        {props.course.name}
      </h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part component={props.course.parts[0]} />
      <Part component={props.course.parts[1]} />
      <Part component={props.course.parts[2]} />
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.component.name} {props.component.exercises}
      </p>
    </div>
  )
}

const Total = (props) => {
  let i = 0
  for (const element of props.course.parts) {
    i = i + element.exercises
  }
  return (
    <div>
      <p>
        Number of exercises {i}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }



  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App