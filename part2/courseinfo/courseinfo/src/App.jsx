import Course from './components/Course'
const App = (props) => {
  const { course } = props
  return (
    <div>
      <h1>Web development curriculum</h1>
      {course.map((course, id) => (<Course key={id} course={course} />))}
      
    </div>
    )
}
export default App