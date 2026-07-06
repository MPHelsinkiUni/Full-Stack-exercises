import styled from 'styled-components'

const Footer = () => {
  const Foot = styled.div`
    background: #2196f3;
    color: White;
    font-style: Italic;
    padding: 1em;
    margin-top: 1em;
    text-align: center;
  `

  return (
    <div>
      <br />
      <Foot>
        Blog app, Department of Computer Science, University of Helsinki 2026
      </Foot>
    </div>
  )
}

export default Footer
