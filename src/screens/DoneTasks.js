import React, { Component } from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { readTasksFromFirebaseAsync } from '../services/FirebaseApi';
import { TaskListView } from '../components/Components';

const imgChecklist = require('../assets/icons8-checklist-64.png');
const imgPlus = require('../assets/icons8-plus-50.png');

export default class DoneTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        }
        this._fetchTasks = this._fetchTasks.bind(this);
    }

    static navigationOption = {
        tabBarLabel: 'Done',
        tabBarIcon: ({ tintColor }) => (
            <Image source={imgChecklist}
                style={[styles.img, { tintColor }]} />
        )
    }

    _fetchTasks(tasks) {
        const tasksToDo = tasks.filter(task => task.isDone);
        this.setState({ tasks: tasksToDo })
    }

    componentDidMount() {
        readTasksFromFirebaseAsync(this._fetchTasks)
    }

    render() {
        return (
            <View style={styles.container} >
                <TaskListView tasks={this.state.tasks} navigation={this.props.navigation} />
            </View>
        )
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
    }
})