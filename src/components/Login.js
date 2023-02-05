function LoginPage({ login }) {
    function formlogin(e) {
        e.preventDefault()
        login(e.target.username.value, e.target.password.value)
    }
    return (
        <div>
            <h2>Please Login</h2>
            <form onSubmit={formlogin}>
                <input type="text" name="username" placeholder="Enter Username" />
                <input type="password" name="password" placeholder="Enter Password" />
                <input type="submit" />
            </form>
        </div>
    )
}


export default LoginPage