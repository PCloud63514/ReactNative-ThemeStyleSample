import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'

const defaultStyle = StyleSheet.create({
    text: {

    }
})

export class MyText extends Component {
    render() {
        const { style, children, s } = this.props
        const { text } = style ? style : {}

        return (
        <Text  style={[defaultStyle.text, text, s]}>
            { children }
        </Text>)
    }
}