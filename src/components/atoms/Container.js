import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

const defaultStyle = StyleSheet.create({
    container: {
        backgroundColor:'black'
    }
})

export default class Container extends Component {
    cloneRender(style, children) {
        if(children.map !== undefined) {
            return children.map( (child) => { 
                return React.cloneElement(child, style=style)
            })
        } else {
            return React.cloneElement(children, {style:style, s:children.props.style});
        }
    }

    render() {
        const { style, children } = this.props
        const { container } = style ? style : {}

        return (
        <View style={[defaultStyle.container, container]}>
            { children ? this.cloneRender(style, children) : {} }
        </View>)
    }
}