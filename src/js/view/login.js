import React from 'react'

export default class Login extends React.Component {

    //mixins: [ History ]

    constructor(props) {
        super(props);

        console.log(this.refs.id);

        this.state = {
            active: true
        };
    }

    handleSubmit(event) {
        event.preventDefault()

        const email = this.refs.id.value
        const pass = this.refs.pass.value

        console.log(email);
        console.log(this.refs.id.value);

        /*
         auth.login(email, pass, (loggedIn) => {
         if (!loggedIn)
         return this.setState({ error: true })

         const { location } = this.props

         if (location.state && location.state.nextPathname) {
         this.history.replaceState(null, location.state.nextPathname)
         } else {
         this.history.replaceState(null, '/')
         }
         })
         */
    }

    render() {
        var styles = this.state.active ? this.active() : this.normal()


        return (
            <form onSubmit={this.handleSubmit}>
                <label for="username"/><input ref="id" placeholder="id" />
                <label for="password"/><input ref="pass" placeholder="password"/>
                <button type="submit">login</button>
            </form>
        )
    }
}