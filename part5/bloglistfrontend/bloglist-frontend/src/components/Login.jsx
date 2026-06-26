const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => (
  <div>
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
      <div><label>Username<input type="text" value={username} onChange={handleUsernameChange}/></label></div>
      <div><label>Password<input type="password" value={password} onChange={handlePasswordChange}/></label></div>
      <button type="submit">login</button>
    </form>
  </div>
)


export default LoginForm
