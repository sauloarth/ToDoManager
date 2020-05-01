import React, { Component } from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    View,
    Image,
    TextInput,
    Button,
    Text,
    Alert
} from 'react-native';
import { signInOnFirebaseAsync } from '../services/FirebaseApi';

const img = require('../assets/TodoIcon.png');



export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    static navigationOptions = {
        header: null
    }

    async _signInAsync() {
        try {

            const user = await signInOnFirebaseAsync(this.state.email, this.state.password);
            Alert.alert(
                'User Authenticated',
                `User authenticates as ${user.email}!`,
            );
        } catch (error) {
            Alert.alert('Login failed', error.message);
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={styles.topView}>
                    <Image style={styles.img} source={img} />
                </View>
                <View style={styles.bottomView}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={this.state.email}
                        keyboardType={'email-address'}
                        autoCapitalize='none'
                        onChangeText={text => this.setState({ email: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={text => this.setState({ password: text })}
                    />
                    <Button title='Sign in'
                        onPress={() => this._signInAsync()} />
                    <View style={styles.textContainer}>
                        <Text>Not a member? Let's </Text>
                        <Text style={styles.textRegister}
                            onPress={() => this.props.navigation.navigate('Register')} >
                            register
                    </Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    topView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
    },
    img: {
        width: 200,
        height: 200,
    },
    bottomView: {
        flexDirection: 'column',
        paddingBottom: 20,
        paddingLeft: 20,
    },
    input: {
        marginBottom: 20,
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    textRegister: {
        fontWeight: 'bold',
    }
})

