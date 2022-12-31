import React from "react"
import blackking from '/blackking.png'
import blackqueen from '/blackqueen.png'
import blackknight from '/blackknight.png'
import blackbishop from '/blackbishop.png'
import blackrook from '/blackrook.png'
import blackpawn from '/blackpawn.png'
import whiteking from '/whiteking.png'
import whitequeen from '/whitequeen.png'
import whiteknight from '/whiteknight.png'
import whitebishop from '/whitebishop.png'
import whiterook from '/whiterook.png'
import whitepawn from '/whitepawn.png'

export default function Eval(props) {


    let diff = props.captured.white.points - props.captured.black.points
    let styles = {}
    styles.fontFamily = `'Staatliches', sans-serif`
    styles.letterSpacing = '2px'
    styles.fontSize = '3.5377vw'
    styles.margin = '0px'
    styles.lineHeight = 'max-content'

    if (diff === 0 && props.winner == 'none') {
        styles.background= `-webkit-linear-gradient(white 48%, var(--black) 49%)`
        styles.WebkitBackgroundClip= 'text'
        styles.WebkitTextFillColor= 'transparent'
    } else {
        if (diff < 0) {
            styles.color = 'var(--black)'
        } else {
            styles.color = 'white'
        }
    }

    let dispW = props.captured.white.pieces.map(piece => {
        //return <img src={`/black${piece}.png`} style={{height:'25px', marginRight: '-2px'}}/>
        switch (piece) {
            case 'king':
                return <img src={blackking} style={{height:'1.9654vw', marginRight: '-0.1572vw', filter: 'drop-shadow(0 0 0.2358vw white)'}}/>
            case 'queen':
                return <img src={blackqueen} style={{height:'1.9654vw', marginRight: '-0.1572vw', filter: 'drop-shadow(0 0 0.2358vw white)'}}/>
            case 'knight':
                return <img src={blackknight} style={{height:'1.9654vw', marginRight: '-0.1572vw', filter: 'drop-shadow(0 0 0.2358vw white)'}}/>
            case 'bishop':
                return <img src={blackbishop} style={{height:'1.9654vw', marginRight: '-0.1572vw', filter: 'drop-shadow(0 0 0.2358vw white)'}}/>
            case 'rook':
                return <img src={blackrook} style={{height:'1.9654vw', marginRight: '-0.1572vw', filter: 'drop-shadow(0 0 0.2358vw white)'}}/>
            case 'pawn':
                return <img src={blackpawn} style={{height:'1.9654vw', marginRight: '-0.1572vw', filter: 'drop-shadow(0 0 0.2358vw white)'}}/>
        }
    })
    let dispB = props.captured.black.pieces.map(piece => {
        //return <img src={`/white${piece}.png`} style={{height:'25px', marginLeft: '-4px'}}/>
        switch (piece) {
            case 'king':
                return <img src={whiteking} style={{height:'1.9654vw', marginRight: '-0.1572vw', filter: 'drop-shadow(0 0 0.2358vw white)'}}/>
            case 'queen':
                return <img src={whitequeen} style={{height:'1.9654vw', marginRight: '-0.1572vw', filter: 'drop-shadow(0 0 0.2358vw white)'}}/>
            case 'knight':
                return <img src={whiteknight} style={{height:'1.9654vw', marginRight: '-0.1572vw', filter: 'drop-shadow(0 0 0.2358vw white)'}}/>
            case 'bishop':
                return <img src={whitebishop} style={{height:'1.9654vw', marginRight: '-0.1572vw', filter: 'drop-shadow(0 0 0.2358vw white)'}}/>
            case 'rook':
                return <img src={whiterook} style={{height:'1.9654vw', marginRight: '-0.1572vw', filter: 'drop-shadow(0 0 0.2358vw white)'}}/>
            case 'pawn':
                return <img src={whitepawn} style={{height:'1.9654vw', marginRight: '-0.1572vw', filter: 'drop-shadow(0 0 0.2358vw white)'}}/>
        }
    })
    diff = diff <= 0 ? diff : `+${diff}`

    if (props.winner != 'none') {
        styles.textAlign = 'center'
        styles.userSelect = 'none'
        switch(props.winner) {
            case 'black':
                styles.color = 'var(--black)'
                //styles.textShadow = '#3e4140 0px 0px 0.7862vw'
                diff = props.kings.white.mated ? 'CHECKMATE' : `BLACK WON ON TIME`
                styles.width = '62.8931vw'
                dispW = null
                dispB = null
                break
            case 'white':
                styles.color = '#FFFFFF'
                //styles.textShadow = 'white 0px 0px 0.7862vw'
                diff = props.kings.black.mated ? 'CHECKMATE' : `WHITE WON ON TIME`
                styles.width = '62.8931vw'
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