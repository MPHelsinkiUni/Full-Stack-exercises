import { useState } from 'react'

const App = (props) => {
  const { course } = props
  const Course = (props) => {
    const Header = (props) => {
      const { course } = props
      return (
        <div>
          <h1>{course.name}</h1>
        </div>
      )
    }

    const Sum = (props) => {
      const { course } = props
      const sum = course.reduce((sum, part) => sum + part.exercises, 0)

      return (
        <div>
          <h4>
          total of {sum} exercises
          </h4>
        </div>
      )
    }
    
    const Content = (props) => {
      const { course } = props
      const Part = (props) => {
        const { part } = props
        console.log(part)

        return (
          <div>
            <p>{ part.name } { part.exercises} </p>
          </div>
        )
      }
      
      

      return (
        <div>
          {course.map((part, id) => (<Part key={id} part={part}/>))}
        </div>
      )
    }


    const { course } = props
    
    return (
      <div>
        <Header course={course} />
        <Content course={course.parts} />
        <Sum course={course.parts} />
      </div>
    )

  }

  

  return <Course course={course} />
}

export default App