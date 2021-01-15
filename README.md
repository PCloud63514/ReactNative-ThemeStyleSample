# React Native Theme Style

Redux, Context API, styled-Components 를 사용하지 않고, 테마를 적용하는 방법을 작성한 프로젝트 입니다.



## 어째서 사용하지 않은 건가요?

Dependency를 추가시키지 않아, 프로젝트 맴버 간의 에러를 줄일 수 있고, 각 Module간 발생할 수 있는 문제점을 피하고자 사용했습니다.



### .css를 사용하지 않은 이유

본 프로젝트는 Expo 를 사용해 진행하였습니다. 



Expo Project에서 css를 적용하려면 다음과 같습니다.  (개인 지식이라 틀릴 가능성이 높기 때문에 추가로 조사 중 입니다.)

- eject를 통한 Expo Project 벗어나기
- js에서 직접 css를 호출하여 적용하기 및 android 와 ios 파일 분할하여 css 작성하기



프로젝트에서 Expo를 적용한 이유는 React Native(이하 RN) 개발보다 쉽고, 각 Platform 을 쉽게 제어하기 위함입니다.

그렇기 때문에 eject 라던지, 파일을 분할하여 설정하는 것은 Expo를 사용하는 이유에서 벗어난다 생각했습니다.



### 구현 후기 및 단점

Context API를 사용하지 않으니, 직접 설계해야하는 복잡도가 증가하였고, 더군다나 Theme Update가 쉽지 않습니다.

light Theme, Dark Theme를 바로바로 변경하려면 역시 Context API는 추가했어야 싶습니다.

물론 구현 내용을 조금만 변경하면 쉽게 Context API를 적용하여 사용할 수 있기 때문에 직접 도전해보는 것도 좋을 것 같습니다.



## 구현

Atomic Design 을 기반으로 프로젝트 구조를 설계하였습니다.

사용할 Component를 직접 구현하고 styles를 부모로 부터 전달 받는 일종의 패턴으로 구현했습니다.

원하는 방식으로 직접 조정하며 변경하는 편이 좋습니다.



### 프로젝트 구조

```
Project
└─src
    ├─components
    │  ├─atoms
    │ 	└─Container.js
    │	└─index.js
    │	└─Text.js
	│	└─Button.js
    └─styles
    	└─index.js
    	└─Styles.js
└─App.js
```





### 간략히 Atomic Design 구조 설명

> 프로젝트 진행 시 사용할 Component를 원자 단위로 나누어 개발하자는 취지의 패턴입니다.
>
> Atomic Design 패턴은 명확히 지킬 수록 프로젝트 개발 규모가 커지고 시간이 많이 소요됩니다.
>
> 각자 진행할 프로젝트 규모에 알맞게 적용할 범위를 맞춰주세요.
>
> ex) 프로젝트가 크지 않다면 Atoms 정도까지, 클 경우 atoms, molecules, organisms 로 나누기

| Directory  | Description                                                  |
| ---------- | ------------------------------------------------------------ |
| components | 사용할 Components를 저장할 Directory                         |
| atoms      | Text, Button, View 등 최소 단위의 Components                 |
| molecules  | atoms에서 작성한 Component를 2개이상 합쳐 구현한 Components  |
| organisms  | atoms와 molecules를 합쳐 구현한 Components.<br />Login Box 등 기능이 있을 법한 Component이며, 기능 자체는 정의하지 않는다. |
| templates  | Layout 및 Grid를 지정한 Component.<br />Components가 어디에 위치할지에 대해 정의한 Components. |



### App.js

```js
import React from 'react';

import { Text, Container, Button } from './src/components/atoms'
import theme from './src/styles'

const styles = theme.templates.Base_Light

export default function App() {
  return (
    <Container style={styles}>
      <Container>
        <Text>Open your app 1 !!</Text>
        <Text
          style={{color:'red'}}
        >Open your app 2 !!</Text>
        <Text
          style={{color:'yellow'}}
        >Open your app 3 !!</Text>
      </Container>
      <Button onPress={() => console.log("HIHIHIHI")}>
        <Text>onPress</Text>
      </Button>
    </Container>
  );
}
```



### Styles.js

```js
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
    silver: 'silver'
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
    btn: {
        backgroundColor: colors.silver,
        padding: paddings.base
    }

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
```



### Container.js

```js
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
```



### Text.js

```js
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
```