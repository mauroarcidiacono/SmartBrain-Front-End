import React from "react";
import validator from 'validator';
import PasswordStrengthBar from 'react-password-strength-bar';
import "./Register.css";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordRepeat:'',
            name: '',
            wrongEmail: false,
            wrongPassword: false,
            wrongPasswordRepeat: false
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }
    
    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onPasswordRepeatChange = (event) => {
        this.setState({passwordRepeat: event.target.value})
    }

    onSubmitSignIn = () => {
        this.setState({wrongEmail: false, wrongPassword: false, wrongPasswordRepeat: false});
        if (validator.isEmail(this.state.email)) {
            if (validator.isStrongPassword(this.state.password)) {
                if (this.state.password === this.state.passwordRepeat) {
                fetch('http://localhost:3000/register', {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        email: this.state.email,
                        password: this.state.password,
                        name: this.state.name
                    })
                })
                    .then(response => response.json())
                    .then(user => {
                        if (user.id) {
                            this.props.loadUser(user);
                            this.props.onRouteChange('home');
                        }
                    })
                } else {
                    this.setState({wrongPasswordRepeat: true});
                }
            } else {
                this.setState({wrongPassword: true});
            }
        } else {
            this.setState({wrongEmail: true});
        } 
    }

    render() {
        return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Register</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                    <input 
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="text" 
                        name="name" 
                        id="name"
                        onChange={this.onNameChange}
                    />
                </div>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input 
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="email" 
                        name="email-address" 
                        id="email-address"
                        onChange={this.onEmailChange}
                    />
                    { this.state.wrongEmail 
                    ? <div class="f6 lh-copy">Invalid email. Please correct it and try again.</div>
                    : null
                    }
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input 
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="password" 
                        name="password"  
                        id="password"
                        onChange={this.onPasswordChange}
                    />
                    <PasswordStrengthBar style={{ color: 'white' }} password={this.state.password} />
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Repeat password</label>
                    <input 
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="password" 
                        name="repeatPassword"  
                        id="repeatPassword"
                        onChange={this.onPasswordRepeatChange}
                    />
                </div>
                { this.state.wrongPassword 
                    ? <div class="f6 lh-copy">
                        Invalid password. The password must be at least 8 characters long, include numbers, 
                        upper and lower case letters and a symbol. 
                      </div>
                    : null
                }
                { this.state.wrongPasswordRepeat
                    ? <div class="f6 lh-copy">The passwords do not match. Please, try again.</div>
                    : null
                }
                </fieldset>
                <div className="">
                    <input
                        onClick={this.onSubmitSignIn} 
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit" 
                        value="Register"
                    />
                </div>
            </div>
            </main>
        </article>
            )
    }
}


export default Register;