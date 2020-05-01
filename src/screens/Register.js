import React, { Component } from 'react';
import {
    KeyboardAvoidingView,
    View,
    Image,
    TextInput,
    Text,
    Button,
    StyleSheet,
    Alert
} from 'react-native';
import { createUserOnFirebaseAsync } from '../services/FirebaseApi'

const img = require('../assets/TodoIcon.png');

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    static navigationOptions = {
        title: 'Register'
    }

    async _createUserAsync() {
        try {
            console.log(this.state)
            const user = await createUserOnFirebaseAsync(this.state.email, this.state.password);
            Alert.alert('User Created!', `User ${user.email} has successfuly been created!`, [
                {
                    text: 'Ok', onPress: () => {
                        this.props.navigation.goBack();
                    }
                }
            ])
        } catch (error) {
            Alert.alert('Error while creating user!', error.message)
        }
    }


    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <View style={styles.topView}>
                    <Image style={styles.img} source={img} />
                    <Text style={styles.title}>Registring a new user</Text>
                </View>
                <View style={styles.bottomView}>
                    <TextInput
                        style={styles.input}
                        placeholder='Email'
                        autoCapitalize='none'
                        onChangeText={text => this.setState({ email: text })}
                        value={this.state.email}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={text => this.setState({ password: text })}
                        value={this.state.password} />
                    <Button title='Register User'
                        onPress={() => this._createUserAsync()} />
                </View>
            </KeyboardAvoidingView>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",

    },
    topView: {
        flex: 0.20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 25,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: 'gray',
        margin: 20
    },
    img: {
        height: 50,
        width: 50
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20
    },
    bottomView: {
        flex: 1,
        flexDirection: 'column',
        paddingRight: 25,
        paddingLeft: 25
    }
})