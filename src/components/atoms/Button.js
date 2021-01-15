import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

export default class Button extends Component {
    cloneRender(style, children) {
        if(children.map !== undefined) {
            return children.map( (child) => { 
                return React.cloneElement(child, {style:style, s:child.props.style})
            })
        } else {
            return React.cloneElement(children, {style:style, s:children.props.style});
        }
    }

    render() {
        const { style, children, s, onPress }  = this.props
        const { btn } = style ? style : {}

        return (
        <TouchableOpacity
            style={[btn]}
            onPress={onPress}
        >
            { children ? this.cloneRender(style, children) : {} }
        </TouchableOpacity>
        )
    }
}