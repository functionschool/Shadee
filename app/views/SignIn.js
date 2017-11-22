import React, {Component} from "react";
import { View, ScrollView, StyleSheet, Text,
  TouchableHighlight, } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn } from "../auth";

import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
  username: t.String,
  password: t.String
});

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: {
        username: '',
        password: ''
      }
    }
  }

  componentWillUnmount() {
    this.setState = {
      value: {
        username: '',
        password: null
      }
    }
  }

  _onChange = (value) => {
    this.setState({
      value
    })
  }

  _handleSubmit = () => {
    const value = this.refs.form.getValue();
    console.log(value)
    const navigation = this.props.navigation;
      const data = {
        username: value.username,
        password: value.password,
      }
      // Serialize and post the data
      const json = JSON.stringify(data)
      console.log(json, 'json')
      fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: json
      })
      .then((response) => {
        console.log(response);
        if(response.status === 200){
          onSignIn().then(() => navigation.navigate("SignedIn"));
        } else {
        return alert('Wrong Username or Password');
        }
      })
      .done()
  }

  render() {
    return(
    <View style={styles.container}>
      <Form
        ref='form'
        type={User}
        options={options}
        value={this.state.value}
        onChange={this._onChange}
      />
      <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="#03A9F4"
        title="SIGN IN"
        onPress={this._handleSubmit}
      />
    </View>

    );
  }
}



const options = {
  fields: {
    username: {
      autoCorrect: false,
      error: "Well, that username is taken already."
    },
    password: {
      password: true,
      autoCorrect: false,
      autoCapitalize: 'none',
      secureTextEntry: true,
      error: "Oops! Try Again. Enter your super secret password."
    },
  },
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
  }
});

export default Login;
