import { StyleSheet, Dimensions, Platform, PixelRatio } from 'react-native'

const { width, height } = Dimensions.get('window')

export const screenWidth = width
export const screenHeight = height
const scale = screenWidth / 320

export function normalize(size) {
    const newSize = size * scale
    if ( Platform.OS === 'android') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize) - 2)
    }
    else if( Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    }
}

const fontSizes = {
    small: normalize(14),
    base: normalize(16),
    big: normalize(18),
    xl: normalize(20)
}

const paddings = {
    small: normalize(5),
}

const margins = {
    small: normalize(8),
    base: normalize(14)
}

const colors = {
    red: "",
    black: "#000000",
    white: "#FFFFFF",
}

const baseLightStyle = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:colors.black,
        margin:margins.base,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize:fontSizes.base,
        color:colors.white,
        margin:margins.base
    },

})

/** namespace Size_Color */
const templates = {
    Small_Dark:'',
    Base_Dark:'',
    Big_Dark:'',
    Small_Base:'',
    Base_Light:baseLightStyle,
    Big_Light:'',
}

export const theme = {
    fontSizes,
    margins,
    colors,
    paddings,
    templates,
}