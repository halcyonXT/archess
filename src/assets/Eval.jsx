import React from "react"

export default function Eval(props) {


    let diff = props.captured.white.points - props.captured.black.points
    let styles = {}
    styles.fontFamily = `'Staatliches', sans-serif`
    styles.letterSpacing = '2px'
    styles.fontSize = '45px'
    styles.margin = '0px'
    styles.lineHeight = 'max-content'

    if (diff === 0) {
        styles.background= `-webkit-linear-gradient(white 48%, #3e4140 49%)`
        styles.WebkitBackgroundClip= 'text'
        styles.WebkitTextFillColor= 'transparent'
    } else {
        if (diff < 0) {
            styles.color = '#3e4140'
        } else {
            styles.color = 'white'
        }
    }

    let dispW = props.captured.white.pieces.map(piece => {
        return <img src={`src/assets/black${piece}.png`} style={{height:'25px', marginRight: '-2px'}}/>
    })
    let dispB = props.captured.black.pieces.map(piece => {
        return <img src={`src/assets/white${piece}.png`} style={{height:'25px', marginLeft: '-4px'}}/>
    })

    diff = diff <= 0 ? diff : `+${diff}`

    if (props.winner != 'none') {
        styles.textAlign = 'center'
        switch(props.winner) {
            case 'black':
                styles.color = '#3e4140'
                styles.textShadow = '#3e4140 0px 0px 10px'
                diff = `BLACK WON ON TIME`
                styles.width = '800px'
                dispW = null
                dispB = null
                break
            case 'white':
                styles.color = '#FFFFFF'
                styles.textShadow = 'white 0px 0px 10px'
                diff = `WHITE WON ON TIME`
                styles.width = '800px'
                dispW = null
                dispB = null
                break
        }
    }

    return (
        <div className='visor'>
            <div className='white-captured captured'>{dispW}</div>
            <h1 style={styles} id='eval'>{diff}</h1>
            <div className='black-captured captured'>{dispB}</div>
        </div>
    )
}