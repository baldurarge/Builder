import React from 'react';
import PropTypes from 'prop-types';
import Validator from 'validator';
import InlineError from '../messages/InlineError';
import { Form, Button } from 'semantic-ui-react';


class LoginForm extends React.Component {
    state = {
        data: {
            email: '',
            password: ''
        },
        loading: false,
        errors: {}
    }

    onChange = e => 
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value}
         });

    onSubmit = () =>{
        const errors = this.validate(this.state.data);
        this.setState({errors});

        if(Object.keys(errors).length === 0){
            this.props.submit(this.state.data);
        }
    }

    validate = data => {
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "has to be email";
        if(!data.password) errors.password = "Can't be blank";
        return errors;
    }

    render() {
        const { data, errors } = this.state;
        return (
            <Form onSubmit={this.onSubmit}>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="email"
                    value={data.email}
                    onChange={this.onChange}
                />
                {errors.email && <InlineError text={errors.email} />}
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="password"
                    value={data.password}
                    onChange={this.onChange}
                />
                {errors.password && <InlineError text={errors.password}/>}
                
                <Button>Login</Button>
            </Form>
        );
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
}
export default LoginForm;