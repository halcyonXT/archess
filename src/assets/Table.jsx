import React from "react"

export default function Table(props) {

    const getStyles = (id, white = false) => {
        let styles = {}
        if (id == props.selected) {
            styles.filter = 'brightness(85%)'
        }
        if (props.cells[id].selected) {
            styles.boxShadow = 'inset 0px 0px 15px -3px rgba(0, 0, 0, 0.7)'
        }
        if (white) {styles.backgroundColor = 'white'}
        if (id === props.kings.white.pos) {
            if (props.kings.white.checked){
                styles.boxShadow = 'inset 0px 0px 20px -3px rgba(255, 0, 0, 0.8)'
            }
        }
        if (id === props.kings.black.pos) {
            if (props.kings.black.checked){
                styles.boxShadow = 'inset 0px 0px 20px -3px rgba(255, 0, 0, 0.8)'
            }
        }
        return styles
    }
    //RENDERER
    let displayCells = []
    const black = (content, id) => 
    <td key={id} className="dark" onClick={() => props.handleSelect(id)}
        style={{...getStyles(id)}}
    >
        <div className="cell">{content}</div>
    </td>
    const white = (content, id) => 
    <td key={id} className="light" onClick={() => props.handleSelect(id)}
        style={{...getStyles(id, true)}}
    >
        <div className="cell">{content}</div>
    </td>

    //RENDERER OF PIECES AND CELLS
    for (let item in props.cells) {
        let piece = ''
        switch(props.cells[item].piece) {
            case "none":
                break;
            default:
                piece = <img src={`src/assets/${props.cells[item].side}${props.cells[item].piece}.png`} 
                className="h-12 imgsettings" />
                break;
        }
        if (props.cells[item].Y % 2 === 0) {
            props.cells[item].id % 2 === 0 ?
            displayCells.push(white(piece, props.cells[item].id))
            :
            displayCells.push(black(piece, props.cells[item].id))
        } else {
            props.cells[item].id % 2 === 0 ?
            displayCells.push(black(piece, props.cells[item].id))
            :
            displayCells.push(white(piece, props.cells[item].id))
        }
    }
    return (
        <table>
            <tbody className="mainframe">
                <tr>{displayCells.slice(0, 8)}</tr>
                <tr>{displayCells.slice(8, 16)}</tr>
                <tr>{displayCells.slice(16, 24)}</tr>
                <tr>{displayCells.slice(24, 32)}</tr>
                <tr>{displayCells.slice(32, 40)}</tr>
                <tr>{displayCells.slice(40, 48)}</tr>
                <tr>{displayCells.slice(48, 56)}</tr>
                <tr>{displayCells.slice(56, 64)}</tr>
            </tbody>
        </table>
    )
}