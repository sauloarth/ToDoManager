import React, { Component } from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';

const imgChecklist = require('../assets/icons8-checklist-64.png');
const imgPlus = require('../assets/icons8-plus-50.png');

export default class ToDoTasks extends Component {
    constructor(props) {
        super(props);
        this._goToTask = this._goToTask.bind(this);
    }

    _goToTask() {
        this.props.navigation.navigate('Task');
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.floatButton}
                    onPress={this._goToTask}>
                    <Image source={imgPlus} style={styles.img} />
                </TouchableOpacity>
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10
    },
    icon: {
        width: 26,
        height: 26
    },
    img: {
        width: 50,
        height: 50
    },
    floatButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
    }
})