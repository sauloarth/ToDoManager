import React, { useState } from 'react';
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
import { CommonActions } from '@react-navigation/native';

const img = require('../assets/TodoIcon.png');



export default Login = props => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const _signInAsync = async () => {
        try {
            const user = await signInOnFirebaseAsync(email, password);
            console.log('Props: ', props)
            Alert.alert(
                'User Authenticated',
                `User authenticates as ${user.email}! Props:`,

            );
            props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'TaskList' }]
                })
            )

        } catch (error) {
            Alert.alert('Login failed', error.message);
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.topView}>
                <Image style={styles.img} source={img} />
            </View>
            <View style={styles.bottomView}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    keyboardType={'email-address'}
                    autoCapitalize='none'
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <Button title='Sign in'
                    onPress={() => _signInAsync()} />
                <View style={styles.textContainer}>
                    <Text>Not a member? Let's </Text>
                    <Text style={styles.textRegister}
                        onPress={() => props.navigation.navigate('Register')} >
                        register
                    </Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    )

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

