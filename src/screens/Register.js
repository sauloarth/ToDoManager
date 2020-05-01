import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    View,
    Image,
    TextInput,
    Text,
    Button,
    StyleSheet
} from 'react-native';

const img = require('../assets/TodoIcon.png');

export default Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    navigationOptions = {
        title: 'Register'
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <View style={styles.topView}>
                <Image style={styles.img} source={img} />
                <Text style={styles.title}>Registring a new user</Text>
            </View>
            <View style={styles.bottomView}>
                <TextInput
                    style={styles.input}
                    placeholder='Email' />
                <TextInput
                    style={styles.input}
                    placeholder='Password' />
                <Button title='Register User' />
            </View>
        </KeyboardAvoidingView>
    )

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