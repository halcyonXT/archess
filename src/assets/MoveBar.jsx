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

export default function MoveBar(props) {
    let [moveNum,setMoveNum] = React.useState(0)
    let [memory, setMemory] = React.useState([])
    let X = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    let Y = ['8', '7', '6', '5', '4', '3', '2', '1']
    let [moveList,setMoveList] = React.useState([])
    React.useEffect(() => {
        setMoveNum(prev => prev + 1)
        setMoveList(prev => {
            let outp = [...prev]
            let obj = {}
            obj.id = prev.length
            obj.disp = Math.ceil(prev.length /2)
            if (props.moves.length != 0) {
                obj.color = props.moves[props.moves.length - 1].from.color
            switch (props.moves[props.moves.length - 1].from.piece) {
                case 'knight':
                    obj.from = 'N'
                    break
                case 'bishop':
                    obj.from = 'B'
                    break
                case 'king':
                    obj.from = 'K'
                    break
                case 'rook':
                    obj.from = 'R'
                    break
                case 'queen':
                    obj.from = 'Q'
                    break
                case 'pawn':
                    obj.from = props.moves[props.moves.length - 1].to.piece == 'none' ? 
                    `${X[props.moves[props.moves.length - 1].from.X]}${Y[props.moves[props.moves.length - 1].from.Y]}`
                    :
                    `${X[props.moves[props.moves.length - 1].from.X]}`
                    break
            }
            }
            if (props.moves.length != 0) {
                
                switch (props.moves[props.moves.length - 1].to.piece) {
                    case 'none':
                        obj.capture = ''
                        obj.victim = `${X[props.moves[props.moves.length - 1].to.X]}${Y[props.moves[props.moves.length - 1].to.Y]}`
                        break
                    case '2':
                        obj.from = ''
                        obj.capture = ''
                        obj.victim = 'O-O-O'
                        break
                    case '4':
                        obj.from = ''
                        obj.capture = ''
                        obj.victim = 'O-O'
                        break
                    default:
                        obj.capture = 'x'
                        obj.victim = `${X[props.moves[props.moves.length - 1].to.X]}${Y[props.moves[props.moves.length - 1].to.Y]}`
                        break
                }
            }
            outp.push(obj)
        
            return outp
        })
    }, [props.moves])

    /*React.useEffect(() => {
        setMemory(prev => {
            let outpu = [...prev]
            let newobj = {}
            newobj.newcells = []
            newobj.move = props.move
            newobj.captured = props.captured
            newobj.kings = props.kings
            for (let cell of props.cells) {
                newobj.newcells.push(cell)
            }
            outpu[outpu.length] = newobj
            return outpu
        })
        console.log(memory)
    }, [props.move])*/

    let displayMoves = []
    if (props.moves.length != 0) {
    displayMoves = moveList.map(item => {
        if (item.id == 0) {return} else {
        let ltr = item.from[0]
        let piece
        switch (item.color) {
            case 'black':
                switch (ltr) {
                    case 'K':
                        piece = <img src={blackking} className='move-img' />
                        break
                    case 'Q':
                        piece = <img src={blackqueen} className='move-img' />
                        break
                    case 'N':
                        piece = <img src={blackknight} className='move-img' />
                        break
                    case 'B':
                        piece = <img src={blackbishop} className='move-img' />
                        break
                    case 'R':
                        piece = <img src={blackrook} className='move-img' />
                        break
                    default:
                        piece = <img src={blackpawn} className='move-img' />
                        break
                }
                break
            case 'white':
                switch (ltr) {
                    case 'K':
                        piece = <img src={whiteking} className='move-img' />
                        break
                    case 'Q':
                        piece = <img src={whitequeen} className='move-img' />
                        break
                    case 'N':
                        piece = <img src={whiteknight} className='move-img' />
                        break
                    case 'B':
                        piece = <img src={whitebishop} className='move-img' />
                        break
                    case 'R':
                        piece = <img src={whiterook} className='move-img' />
                        break
                    default:
                        piece = <img src={whitepawn} className='move-img' />
                        break
                }
                break
        }

        if (item.victim === 'O-O' || item.victim === 'O-O-O') {
            switch (item.color) {
                case 'black':
                    piece = <img src={blackking} className='move-img' />
                    break
                case 'white':
                    piece = <img src={whiteking} className='move-img' />
                    break
            }
        }
        return (
            <div className='move-card' onClick={() => props.handleRewind(props.memory[item.id])} style={{color: item.color == 'black' ? "rgb(32, 32, 32)" : "rgb(255, 255, 255)",
            border: item.color == "black" ? "0.042vw solid rgb(31, 31, 31)" : "0.042vw solid white",
            textShadow: item.color == "black" ? "rgb(54, 54, 54) 0px 0px 9px" : "rgb(255, 255, 255) 0px 0px 9px"}} key={item.id}>{piece} {item.disp}.
             {item.from}{item.capture}{item.victim}</div>
        )}
    })
    }
    if (displayMoves.length > 22) {
        while (displayMoves.length > 22) {
            displayMoves.shift()
        }
    }

    return (
        <div className='move-bar'>
            {displayMoves}
        </div>
    )
}