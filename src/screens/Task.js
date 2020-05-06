import React, { Component } from 'react';
import { View, TextInput, Switch, Text, Button, StyleSheet, Alert } from 'react-native';
import { writeTaskOnFirebaseAsync } from '../services/FirebaseApi';

export default class Task extends Component {
    constructor(props) {
        super(props)

        !props.route.params ?
            this.state = {
                key: '',
                title: '',
                resume: '',
                priority: true,
                isDone: false
            } :
            this.state = { ...props.route.params.task }

        this._saveTaskAsync = this._saveTaskAsync.bind(this)
    }

    static navigationOptions = {
        title: 'Task'
    }

    async _saveTaskAsync() {
        const task = { ...this.state }

        try {
            await writeTaskOnFirebaseAsync(task);
            this.props.navigation.goBack();
        } catch (error) {
            Alert.alert('Error Saving task: ', error.message)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                    placeholder='Title'
                    value={this.state.title}
                    onChangeText={value => this.setState({ title: value })} />
                <TextInput style={[styles.input, styles.multilineInput]}
                    placeholder='Resume'
                    multiline={true} numberOfLines={4}
                    value={this.state.resume}
                    onChangeText={value => this.setState({ resume: value })} />
                <View style={styles.switchContainer}>
                    <Switch value={this.state.priority}
                        onValueChange={value => this.setState({ priority: value })} />
                    <Text style={styles.switchText}>Hight Priority</Text>
                </View>
                <View style={styles.switchContainer}>
                    <Switch value={this.state.isDone}
                        onValueChange={value => this.setState({ isDone: value })} />
                    <Text style={styles.switchText}>Is Done?</Text>
                </View>
                <Button title='Save'
                    onPress={this._saveTaskAsync} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 20,
    },
    input: {
        marginBottom: 20,
    },
    multilineInput: {
        height: 100,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20,
    },
    switchText: {
        marginLeft: 10,
        color: 'black',
        fontSize: 18,
    }
})