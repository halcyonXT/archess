import React from "react"
import './App.css'
import Table from './assets/Table.jsx'
import Eval from './assets/Eval.jsx'
import move1 from './assets/move1.mp3'
import move2 from './assets/move2.mp3'
import move3 from './assets/move3.mp3'
import capture1 from './assets/capture1.mp3'
import capture2 from './assets/capture2.mp3'
import capture3 from './assets/capture3.mp3'
import archess from '/archess.png'
import bspng from '/bs.png'
import wspng from '/ws.png'

let pawnsqrs = [8,9,10,11,12,13,14,15,55,54,53,52,51,50,49,48]
function tableTemplate() {
    let outp = []
    for (let i=0; i < 64; i++) {
        if (i == 0 || i == 7 || i == 63 || i == 56) {
            outp.push({
                id: i,
                Y: Math.floor(i/8),
                X: i%8,
                piece: 'rook',
                side: i > 33 ? 'white' : 'black',
                selected: false
            })
            continue
        }
        if (i == 1 || i == 6 || i == 62 || i == 57) {
            outp.push({
                id: i,
                Y: Math.floor(i/8),
                X: i%8,
                piece: 'knight',
                side: i > 33 ? 'white' : 'black',
                selected: false
            })
            continue
        }
        if (i == 2 || i == 5 || i == 61 || i == 58) {
            outp.push({
                id: i,
                Y: Math.floor(i/8),
                X: i%8,
                piece: 'bishop',
                side: i > 33 ? 'white' : 'black',
                selected: false
            })
            continue
        }
        if (i == 59 || i == 3) {
            outp.push({
                id: i,
                Y: Math.floor(i/8),
                X: i%8,
                piece: 'queen',
                side: i > 33 ? 'white' : 'black',
                selected: false
            })
            continue
        }
        if (i == 60 || i == 4) {
            outp.push({
                id: i,
                Y: Math.floor(i/8),
                X: i%8,
                piece: 'king',
                side: i > 33 ? 'white' : 'black',
                selected: false
            })
            continue
        }
        if (pawnsqrs.includes(i)) {
            outp.push({
                id: i,
                Y: Math.floor(i/8),
                X: i%8,
                piece: 'pawn',
                side: i > 33 ? 'white' : 'black',
                selected: false
            })
            continue
        }
        outp.push({
            id: i,
            Y: Math.floor(i/8),
            X: i%8,
            piece: 'none',
            side: 'none',
            selected: false
        })
    }
    return outp
}

function playSound(type) {
    let rnd
    switch(type) {
        case 'move':
            rnd = Math.ceil(Math.random() * 3)
            switch (rnd) {
                case 1:
                    new Audio(move1).play()
                    return
                case 2:
                    new Audio(move2).play()
                    return
                case 3:
                    new Audio(move3).play()
                    return
            }
            return
        case 'capture':
            rnd = Math.ceil(Math.random() * 3)
            switch (rnd) {
                case 1:
                    new Audio(capture1).play()
                    return
                case 2:
                    new Audio(capture2).play()
                    return
                case 3:
                    new Audio(capture3).play()
                    return
            }
            return
    }
}

function App() {
    let promsqrs = [[0,1,2,3,4,5,6,7],[56,57,58,59,60,61,62,63]]//SQUARES FOR PROMOTION
    /* TIMER STUFF */
    const [timers, setTimers] = React.useState({
        white: 600000,
        black: 600000
    })
    const [turn, setTurn] = React.useState('white')
    const [def, setDef] = React.useState({ //STATE FOR TIMERS
        white: 1000,
        black: 0
    })
    const [flipper, setFlipper] = React.useState(true)
    let wi
    React.useEffect(() => {
        switch (turn) {
            case 'white':
                setDef({
                    white: 1000,
                    black: 0
                })
                break
            case 'black':
                setDef({
                    white: 0,
                    black: 1000
                })
                break
        }
    }, [turn])

    React.useEffect(() => {
        wi = setInterval(() => {
            setFlipper(prev => !prev)
        }, 1000)
    }, [])
    React.useEffect(() => {
        if (initiated) {
            setTimers(prev => {
                let outp = {...prev}
                outp.white -= def.white
                outp.black -= def.black
                return outp
            })
            if (timers.white <= 0) {
                setWinner('black')
            }
            if (timers.black <= 0) {
                setWinner('white')
            }
        }
    }, [flipper])
    /*************/




    const [initiated, setInitiated] = React.useState(false)
    const [cells, setCells] = React.useState(tableTemplate())
    const [allowed, setAllowed] = React.useState([])
    const [selected, setSelected] = React.useState(-1)
    const [move, setMove] = React.useState(1)
    const [kings, setKings] = React.useState({
        black: {
            pos: 4,
            moved: false,
            checked: false
        },
        white: {
            pos: 60,
            moved: false,
            checked: false
        }
    })
    const [captured, setCaptured] = React.useState({
        white: {
            points: 0,
            pieces: []
        },
        black: {
            points: 0,
            pieces: []
        }
    })
    const [winner, setWinner] = React.useState('none')

    React.useEffect(() => { //FOR CHECKING FOR CHECKS
        let wp = kingFilter(0, 'black', true)
        let bp = kingFilter(0, 'white', true)
        wp = wp.flat()
        bp = bp.flat()
        if (wp.includes(kings.black.pos)) {//black checked
            console.log("blk checke")
            setKings(prevState => {
                let outp = {...prevState}
                outp.black.checked = true
                return outp
            })
        }
        if (bp.includes(kings.white.pos)) {//white checked
            console.log("white checke")
            setKings(prevState => {
                let outp = {...prevState}
                outp.white.checked = true
                return outp
            })
        }
        if (!wp.includes(kings.black.pos)) {
            setKings(prevState => {
                let outp = {...prevState}
                outp.black.checked = false
                return outp
            })
        }
        if (!bp.includes(kings.white.pos)) {
            setKings(prevState => {
                let outp = {...prevState}
                outp.white.checked = false
                return outp
            })
        }
    }, [cells])

    React.useEffect(() => { //TELLS WHOSE TURN IT IS
        switch (move % 2 == 0) {
            case true:
                setTurn('black')
                break
            case false:
                setTurn('white')
                break
        }
    }, [move])


    const flushSelected = () => {
        for (let cell of cells) {
            if (cell.selected) {
                setCells(prevState => {
                    let outp = [...prevState]
                    outp[cell.id].selected = false
                    return outp
                })
            }
        }
        setSelected(-1)
    }
    //GIVES BACK MULTIDIMENSIONAL ARRAY OF POSSIBLE SQUARES FOR THE ROOK TO MOVE
    const rookCheck = (id) => {
        let outp = [[],[],[],[]]
        let ypos = cells[id].Y
        let target = id-8
        while (true) {
            if (target < 0) {break}
            outp[0].push(target)
            target -= 8
        }
        target = id+8
        while (true) {
            if (target > 63) {break}
            outp[1].push(target)
            target += 8
        }
        target = id+1
        while (true) {
            if (target > 63 || target < 0 || cells[target].Y != ypos) {
                break
            }
            outp[2].push(target)
            ++target
        }
        target = id-1
        while (true) {
            if (target > 63 || target < 0 || cells[target].Y != ypos) {
                break
            }
            outp[3].push(target)
            --target
        }
        return outp
    }
    //GIVES BACK MULTIDIMENSIONAL ARRAY OF POSSIBLE SQUARES FOR THE BISHOP TO MOVE
    const bishopCheck = (id) => {
        let outp=[[],[],[],[]]
        let xpos = cells[id].X, ypos = cells[id].Y
        let operx, opery, magnitude
        for (let i=0; i < 4; i++) {
            magnitude = 1
            switch (i) {
                case 0:
                    operx = 1, opery = 1
                    break;
                case 1:
                    operx = 1, opery = -1
                    break;
                case 2:
                    operx = -1, opery = 1
                    break;
                case 3:
                    operx = -1, opery = -1
                    break;
            }
            while (true) {
                if ((xpos + (operx * magnitude)) < 0
                ||
                (xpos + (operx * magnitude)) > 63
                ||
                (ypos + (opery * magnitude)) > 63
                ||
                (ypos + (opery * magnitude)) < 0) {break}
                let target = cells.findIndex(element => element.X == (xpos + (operx * magnitude)) &&
                element.Y == (ypos + (opery * magnitude)))
                if (target === -1) {break}
                outp[i].push(target)
                ++magnitude
            }
        }
        return outp
    }
    //GIVES KNIGHT SQUARES
    const knightCheck = (id) => {
        let outp=[]
        let xpos=cells[id].X, ypos=cells[id].Y
        let targetx, targety
        for (let i = 0; i < 8; i++) {
            switch (i) {
                case 0:
                    targetx = 2, targety = 1
                    break
                case 1:
                    targetx = 2, targety = -1
                    break
                case 2:
                    targetx = -2, targety = 1
                    break
                case 3:
                    targetx = -2, targety = -1
                    break
                case 4:
                    targetx = 1, targety = 2
                    break
                case 5:
                    targetx = 1, targety = -2
                    break
                case 6:
                    targetx = -1, targety = 2
                    break
                case 7:
                    targetx = -1, targety = -2
                    break
            }
            let pusher = cells.findIndex(el => el.X == xpos + targetx && el.Y == ypos + targety)
            pusher === -1 ? true : outp.push(pusher)
        }
        return outp
    }
    //FILTERS OUT SQUARES WHERE KING CANNOT MOVE
    const kingFilter = (arr, side, ch = false, alt = false) => {
        let held = []
        let outp = []
        if (alt != false) {
            let cells = alt
        }
        for (let cell of cells) {
            let pusher = [], squares = []
            if (cell.piece != 'none' && cell.side != side) {
                switch(cell.piece) {
                    case 'queen':
                        let set1 = rookCheck(cell.id)
                        let set2 = bishopCheck(cell.id)
                        squares = [...set1,...set2]
                        for (let i=0; i < 8; i++) {
                            for (let square of squares[i]) {
                                if (cells[square].side == side) {
                                    if (cells[square].piece == 'king') {
                                        pusher.push(square)
                                    } else {break}
                                } else {
                                    if (cells[square].side == 'none') {
                                        pusher.push(square)
                                    } else {
                                        pusher.push(square)
                                        break;
                                    }
                                }
                            }
                        }
                        held.push(pusher)
                        break;
                    case 'bishop':
                        squares = bishopCheck(cell.id)
                        for (let i=0; i < 4; i++) {
                            for (let square of squares[i]) {
                                if (cells[square].side == side) {
                                    if (cells[square].piece == 'king') {
                                        pusher.push(square)
                                    } else {break}
                                } else {
                                    if (cells[square].side == 'none') {
                                        pusher.push(square)
                                    } else {
                                        pusher.push(square)
                                        break
                                    }
                                }
                            }
                        }
                        held.push(pusher)
                        break;
                    case 'pawn':
                        let oper
                        switch(cell.side) {
                            case 'white':
                                oper = -1
                                break
                            case 'black':
                                oper = 1
                                break
                        }
                        pusher = [
                            cells.findIndex(el => el.X == cell.X + 1 && el.Y == cell.Y + oper),
                            cells.findIndex(el => el.X == cell.X - 1 && el.Y == cell.Y + oper)
                        ]
                        held.push(pusher)
                        break;
                    case 'knight':
                        held.push(knightCheck(cell.id))
                        break
                    case 'rook':
                        squares = rookCheck(cell.id)
                        for (let i=0; i < 4; i++) {
                            for (let square of squares[i]) {
                                if (cells[square].side == side) {
                                    if (cells[square].piece == 'king') {
                                        pusher.push(square)
                                    } else {break}
                                } else {
                                    if (cells[square].side == 'none') {
                                        pusher.push(square)
                                    } else {
                                        pusher.push(square)
                                        break
                                    }
                                }
                            }
                        }
                        held.push(pusher)
                        break;
                    case 'king':
                        squares = kingCheck(cell.id)
                        held.push(squares)
                        break;
                    default:
                        break;
                }
            }
        }
        held = held.flat()
        if (ch) {return held}
        for (let item of arr) {
            if (held.includes(item)) {
                setCells(prevState => {
                    let output = [...prevState]
                    output[item].selected = false
                    return output
                })
                continue
            } else {
                outp.push(item)
            }
        }
        return outp
    }
    //GIVES BACK VIABLE SQUARES FOR KING MOVEMENT
    const kingCheck = (id) => {
        let outp=[]
        for (let item of cells) {
            let temp = cells[id]
            if (((item.X == temp.X + 1 && (item.Y == temp.Y || item.Y == temp.Y+1 || item.Y == temp.Y-1)) 
                || item.X == temp.X - 1 && (item.Y == temp.Y || item.Y == temp.Y+1 || item.Y == temp.Y-1)
                || item.X == temp.X && (item.Y == temp.Y+1 || item.Y == temp.Y-1) )) {
                    if (item.side != temp.side ) {
                        outp.push(item.id)
                    }
                }
        }
        return outp
    }

    function handleSelect(id) {
        if (winner != 'none') {return}
        let squares, allow = []
        let turn = move % 2 == 0 ? "black" : "white"
        //TWO STATEMENTS BELOW CHECK IF MOVE IS PAWN PROMOTION
        if (selected != -1
            && cells[selected].piece === 'pawn'
            && cells[selected].side === 'white'
            && promsqrs[0].includes(id)) {
                setAllowed([])
                setCells(prev => {
                    let outp = [...prev]
                    outp[selected].piece = 'none'
                    outp[selected].side = 'none'
                    outp[id].piece = 'queen'
                    outp[id].side = 'white'
                    return outp
                })
                setCaptured(prev => {
                    let outp = {...prev}
                    outp.black.points -= 8
                    return outp
                })
                setMove(prevState => prevState + 1)
                flushSelected()
                return
            }
        if (selected != -1
            && cells[selected].piece === 'pawn'
            && cells[selected].side === 'black'
            && promsqrs[1].includes(id)) {
                setAllowed([])
                setCells(prev => {
                    let outp = [...prev]
                    outp[selected].piece = 'none'
                    outp[selected].side = 'none'
                    outp[id].piece = 'queen'
                    outp[id].side = 'black'
                    return outp
                })
                setCaptured(prev => {
                    let outp = {...prev}
                    outp.white.points -= 8
                    return outp
                })
                setMove(prevState => prevState + 1)
                flushSelected()
                return
            }
        //THE TWO STATEMENTS BELOW CHECK IF PLAYER HAS CASTLED
        if (!kings.black.moved 
            && selected != -1
            && cells[selected].piece === 'king'
            && cells[selected].side === 'black') {
                switch (id) {
                    case 2:
                        setAllowed([])
                        setCells(prev => {
                            let outp = [...prev]
                            outp[2].piece = 'king'
                            outp[2].side = 'black'
                            outp[3].piece = 'rook'
                            outp[3].side = 'black'
                            outp[4].piece = 'none'
                            outp[4].side = 'none'
                            outp[0].piece = 'none'
                            outp[0].side = 'none'
                            return outp
                        })
                        setMove(prevState => prevState + 1)
                        flushSelected()
                        return
                    case 6:
                        setAllowed([])
                        setCells(prev => {
                            let outp = [...prev]
                            outp[6].piece = 'king'
                            outp[6].side = 'black'
                            outp[5].piece = 'rook'
                            outp[5].side = 'black'
                            outp[4].piece = 'none'
                            outp[4].side = 'none'
                            outp[7].piece = 'none'
                            outp[7].side = 'none'
                            return outp
                        })
                        setMove(prevState => prevState + 1)
                        flushSelected()
                        return
                    default:
                        break
                }
            }
        if (!kings.white.moved 
            && selected != -1
            && cells[selected].piece === 'king'
            && cells[selected].side === 'white') {
                switch (id) {
                    case 58:
                        setAllowed([])
                        setCells(prev => {
                            let outp = [...prev]
                            outp[58].piece = 'king'
                            outp[58].side = 'white'
                            outp[59].piece = 'rook'
                            outp[59].side = 'white'
                            outp[60].piece = 'none'
                            outp[60].side = 'none'
                            outp[56].piece = 'none'
                            outp[56].side = 'none'
                            return outp
                        })
                        setMove(prevState => prevState + 1)
                        flushSelected()
                        return
                    case 62:
                        setAllowed([])
                        setCells(prev => {
                            let outp = [...prev]
                            outp[62].piece = 'king'
                            outp[62].side = 'white'
                            outp[61].piece = 'rook'
                            outp[61].side = 'white'
                            outp[60].piece = 'none'
                            outp[60].side = 'none'
                            outp[63].piece = 'none'
                            outp[63].side = 'none'
                            return outp
                        })
                        setMove(prevState => prevState + 1)
                        flushSelected()
                        return
                    default:
                        break
                }
            }
        if (allowed.includes(id)) {//IF PRESSED ON DARKENED SQUARE
            setAllowed([])
            if (cells[id].piece != 'none') {
                let points
                switch (cells[id].piece) {
                    case 'pawn':
                        points = 1
                        setCaptured(prev => {
                            let outp = {...prev}
                            switch (cells[id].side) {
                                case 'white':
                                    outp.white.pieces.push('pawn')
                                    break
                                case 'black':
                                    outp.black.pieces.push('pawn')
                                    break
                            }
                            return outp
                        })
                        break
                    case 'knight':
                        points = 3
                        setCaptured(prev => {
                            let outp = {...prev}
                            switch (cells[id].side) {
                                case 'white':
                                    outp.white.pieces.push('knight')
                                    break
                                case 'black':
                                    outp.black.pieces.push('knight')
                                    break
                            }
                            return outp
                        })
                        break
                    case 'bishop':
                        points = 3
                        setCaptured(prev => {
                            let outp = {...prev}
                            switch (cells[id].side) {
                                case 'white':
                                    outp.white.pieces.push('bishop')
                                    break
                                case 'black':
                                    outp.black.pieces.push('bishop')
                                    break
                            }
                            return outp
                        })
                        break
                    case 'rook':
                        points = 5
                        setCaptured(prev => {
                            let outp = {...prev}
                            switch (cells[id].side) {
                                case 'white':
                                    outp.white.pieces.push('rook')
                                    break
                                case 'black':
                                    outp.black.pieces.push('rook')
                                    break
                            }
                            return outp
                        })
                        break
                    case 'queen':
                        points = 9
                        setCaptured(prev => {
                            let outp = {...prev}
                            switch (cells[id].side) {
                                case 'white':
                                    outp.white.pieces.push('queen')
                                    break
                                case 'black':
                                    outp.black.pieces.push('queen')
                                    break
                            }
                            return outp
                        })
                        break
                }
                switch (cells[id].side) {
                    case 'white':
                        setCaptured(prev => {
                            let outp = {...prev}
                            outp.black.points += points
                            return outp
                        })
                        break
                    case 'black':
                        setCaptured(prev => {
                            let outp = {...prev}
                            outp.white.points += points
                            return outp
                        })
                        break
                }
            }
            setCells(prevState => {
                let outp = [...prevState]
                outp[id].piece === 'none' ? playSound('move') : playSound('capture')
                if (outp[selected].piece === 'king') {
                    switch(outp[selected].side) {
                        case 'white':
                            setKings(prevState => {
                                let outp = {...prevState}
                                outp.white.moved = true
                                outp.white.pos = id
                                return outp
                            })
                            break;
                        case 'black':
                            setKings(prevState => {
                                let outp = {...prevState}
                                outp.black.moved = true
                                outp.black.pos = id
                                return outp
                            })
                            break;
                    }
                }
                outp[id].piece = outp[selected].piece === 'none' ? outp[id].piece : outp[selected].piece
                outp[id].side = outp[selected].side === 'none' ? outp[id].side : outp[selected].side
                outp[selected].piece = 'none'
                outp[selected].side = 'none'
                setMove(prevState => prevState + 1)
                flushSelected()
                return outp
            })
            return
        }
        if (cells[id].side != turn) {//IF NOT x PLAYERS TURN, RETURN
            return
        }
        switch(cells[id].piece) {
            case 'pawn':
                flushSelected()
                let oper = 0
                let hasLeft = 0
                setSelected(id)
                switch(cells[id].side) {
                    case "black":
                        oper = 1
                        break;
                    case "white":
                        oper = -1
                        break;
                }
                pawnsqrs.includes(id) ? hasLeft = oper : hasLeft
                allow = []
                for (let item of cells) {
                    let temp = cells[id]
                    if (item.X == temp.X && (item.Y == (temp.Y + oper) || item.Y == (temp.Y + oper + hasLeft))) {
                        if (item.piece == "none") { //IF EPMTY SQUARE
                            allow.push(item.id)
                            setCells(prevState => {
                                let outp = [...prevState]
                                outp[item.id] = {
                                    ...outp[item.id],
                                    selected: true
                                }
                                return outp
                            })
                        }
                    } else {
                        if ((item.X == (temp.X + 1) && item.Y == (temp.Y + oper) && (item.piece != 'none' && item.side != temp.side))
                        ||
                        (item.X == (temp.X - 1) && item.Y == (temp.Y + oper) && (item.piece != 'none' && item.side != temp.side))) {
                            allow.push(item.id)
                            setCells(prevState => {
                                let outp = [...prevState]
                                outp[item.id] = {
                                    ...outp[item.id],
                                    selected: true
                                }
                                return outp
                            })
                            continue
                        }
                        setCells(prevState=> {
                            let outp = [...prevState]
                            outp[item.id] = {
                                ...outp[item.id],
                                selected:false
                            }
                            return outp
                        })
                    }
                }
                setAllowed(allow)
                break;
            case 'king':
                flushSelected()
                allow = []
                setSelected(id)
                squares = kingCheck(id)
                for (let item of cells) {
                    if (squares.includes(item.id)) {
                        allow.push(item.id)
                        setCells(prevState => {
                            let outp=[...prevState]
                            outp[item.id].selected = true
                            return outp
                        })
                    } else {
                        setCells(prevState => {
                            let outp=[...prevState]
                            outp[item.id].selected = false
                            return outp
                        })
                    }
                }
                switch(cells[id].side) {
                    case 'white':
                        if (!kings.white.moved) {
                            if (cells[59].piece == 'none' //CHECKING FOR CASTLES
                            &&
                            cells[58].piece == 'none'
                            &&
                            cells[57].piece == 'none'
                            ) {
                                allow.push(58)
                                setCells(prev => {
                                    let outp = [...prev]
                                    outp[58].selected = true
                                    return outp
                                })
                            }
                            if (cells[61].piece == 'none'
                            &&
                            cells[62].piece == 'none') {
                                allow.push(62)
                                setCells(prev => {
                                    let outp = [...prev]
                                    outp[62].selected = true
                                    return outp
                                })
                            }
                        }

                        break;
                    case 'black':
                        if (!kings.black.moved) {
                            if (cells[3].piece == 'none' //CHECKING FOR CASTLES
                            &&
                            cells[2].piece == 'none'
                            &&
                            cells[1].piece == 'none'
                            ) {
                                allow.push(2)
                                setCells(prev => {
                                    let outp = [...prev]
                                    outp[2].selected = true
                                    return outp
                                })
                            }
                            if (cells[5].piece == 'none'
                            &&
                            cells[6].piece == 'none') {
                                allow.push(6)
                                setCells(prev => {
                                    let outp = [...prev]
                                    outp[6].selected = true
                                    return outp
                                })
                            }
                        }
                        break;
                }
                allow = kingFilter([...allow], cells[id].side)
                setAllowed(allow)
                break;
            case 'rook':
                flushSelected()
                allow=[]
                setSelected(id)
                squares = rookCheck(id)
                for (let i=0; i < 4; i++) {
                    for (let square of squares[i]) {
                        if (cells[square].side == cells[id].side) {break} else {
                            if (cells[square].side == 'none') {
                                allow.push(square)
                                setCells(prevState => {
                                    let outp = [...prevState]
                                    outp[square] = {
                                        ...outp[square],
                                        selected: true
                                    }
                                    return outp
                                })
                            } else {
                                allow.push(square)
                                setCells(prevState => {
                                    let outp = [...prevState]
                                    outp[square] = {
                                        ...outp[square],
                                        selected: true
                                    }
                                    return outp
                                })
                                break;
                            }
                        }
                    }
                }
                setAllowed(allow)
                break;
            case 'bishop':
                flushSelected()
                allow=[]
                setSelected(id)
                squares = bishopCheck(id)
                for (let i=0; i < 4; i++) {
                    for (let square of squares[i]) {
                        if (cells[square].side == cells[id].side) {break} else {
                            if (cells[square].side == 'none') {
                                allow.push(square)
                                setCells(prevState => {
                                    let outp = [...prevState]
                                    outp[square] = {
                                        ...outp[square],
                                        selected: true
                                    }
                                    return outp
                                })
                            } else {
                                allow.push(square)
                                setCells(prevState => {
                                    let outp = [...prevState]
                                    outp[square] = {
                                        ...outp[square],
                                        selected: true
                                    }
                                    return outp
                                })
                                break;
                            }
                        }
                    }
                }
                setAllowed(allow)
                break;
            case 'queen':
                flushSelected()
                setSelected(id)
                allow=[]
                let set1 = rookCheck(id)
                let set2 = bishopCheck(id)
                squares = [...set1, ...set2]
                for (let i=0; i < 8; i++) {
                    for (let square of squares[i]) {
                        if (cells[square].side == cells[id].side) {break} else {
                            if (cells[square].side == 'none') {
                                allow.push(square)
                                setCells(prevState => {
                                    let outp = [...prevState]
                                    outp[square] = {
                                        ...outp[square],
                                        selected: true
                                    }
                                    return outp
                                })
                            } else {
                                allow.push(square)
                                setCells(prevState => {
                                    let outp = [...prevState]
                                    outp[square] = {
                                        ...outp[square],
                                        selected: true
                                    }
                                    return outp
                                })
                                break;
                            }
                        }
                    }
                }
                setAllowed(allow)
                break;
            case 'knight':
                flushSelected()
                setSelected(id)
                allow=[]
                squares = knightCheck(id)
                for (let item of squares) {
                    if (cells[item].side == cells[id].side) {
                        continue
                    } else {
                        allow.push(item)
                        setCells(prevState => {
                            let outp = [...prevState]
                            outp[item] = {
                                ...outp[item],
                                selected: true
                            }
                            return outp
                        })
                    }
                }
                setAllowed(allow)
                break;
            default:
                return
        }
        if (kings.white.checked) {
            if (cells[id].side === 'white') {
                if (cells[id].piece === 'king') {return}
                for (let item in allow) {
                    allow[item] = validate(allow[item], 'white')
                }
                setAllowed(allow)
            }
        }
        if (kings.black.checked) {
            if (cells[id].side === 'black') {
                if (cells[id].piece === 'king') {return}
                for (let item in allow) {
                    allow[item] = validate(allow[item], 'black')
                }
                setAllowed(allow)
            }
        }
    }
    
    const validate = (target, player) => {
        let pg = [...cells], squares = []
        let bp = pg[target].piece, bs = pg[target].side
        switch (player) {
            case 'white':
                pg[target].piece = 'pawn'
                pg[target].side = 'white'
                squares = kingFilter(0, 'white', true, pg)
                if (squares.includes(kings.white.pos)) {
                    pg[target].piece = bp
                    pg[target].side = bs
                    setCells(prev => {
                        let outp = [...prev]
                        outp[target].selected = false
                        return outp
                    })
                    return -1
                } else {
                    pg[target].piece = bp
                    pg[target].side = bs
                    return target
                }
                break;
            case 'black':
                pg[target].piece = 'pawn'
                pg[target].side = 'black'
                squares = kingFilter(0, 'black', true, pg)
                if (squares.includes(kings.black.pos)) {
                    pg[target].piece = bp
                    pg[target].side = bs
                    setCells(prev => {
                        let outp = [...prev]
                        outp[target].selected = false
                        return outp
                    })
                    return -1
                } else {
                    pg[target].piece = bp
                    pg[target].side = bs
                    return target
                }
                break;
        }
    }
    
    const timerProcessor = (side) => {
        let time = ''
        let minutes, seconds, ctime
        switch (side) {
            case 'white':
                ctime = timers.white / 1000
                break
            case 'black':
                ctime = timers.black / 1000
                break
        }
        minutes = Math.floor(ctime/60)
        seconds = ctime%60
        time = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
        return time
    }
    let dispWT = timerProcessor('white'), dispBT = timerProcessor('black')

    function triggerAnim() {
        document.getElementById("uniTop").classList.add("aniTop")
        document.getElementById("uniBot").classList.add("aniBot")
        document.getElementById("startBtn").classList.add("diss")
        document.getElementById("adit-set").classList.add("diss")
        document.getElementById("adit").classList.add("diss")
        setTimeout(() => {
            document.getElementById("uniBot").style.opacity = '0'
            setTimeout(() => {
                setInitiated(true)
            },1000)
        }, 2000)
    }

    
    const [toggle, setToggle] = React.useState(true)
    function triggerSett() {
        //ADDITIONAL SETTINGS
        setToggle(prev => !prev)
        toggle ?
        document.getElementById('adit-set').style.display = 'block'
        :
        document.getElementById('adit-set').style.display = 'none'
    }

    function handleSett() {
        document.getElementById('smtxt').innerText = 'Custom'
        let val = document.getElementById('tinput').value
        if (!isNaN(val)) {
            setTimers(({
                white: val*60000,
                black: val*60000
            }))
        }
    }

    return (
        <div>
            {
                !initiated &&
                <div>
                    <div className='uninitiated' id="uniTop">
                        <div className="logo">
                            <img src={archess}/>
                        </div>
                    </div>
                    <div className='bot-wrap'>
                        <div className='uninitiated' id="uniBot">
                            <button id="startBtn">
                                <h1 className='st-tx' onClick={triggerAnim}>START</h1>
                                <br/><h6 className='st-sm' id='smtxt' onClick={triggerAnim}>REGULAR 10 MINUTE</h6>
                            </button>
                            <p className='adit-set' id='adit' onClick={triggerSett}><u>Additional settings</u></p>
                            <div id='adit-set'>Time in minutes: <input type='text' onInput={handleSett} id='tinput'></input></div>
                        </div>
                    </div>
                </div>
            }
            <div className="logo">
                <img src={archess} />
            </div>
            <div className="footer-wrapper">
                <div className="footer">
                    <div style={{display: 'flex', alignItems:'center'}}>
                        <img className='sep sep1' src={wspng}/>
                        <div style={{display:'block', textAlign:'center'}}>
                            <h1 className='timer timerW'>White | {dispWT}</h1>
                            <h6 className="material mW">Points captured: {captured.white.points}</h6>
                        </div>
                        <img className='sep sep2' src={wspng}/>
                    </div>
                    <Eval captured={captured} winner={winner}/>
                    <div style={{display: 'flex', alignItems:'center'}}>
                        <img className='sep sep1' src={bspng}/>
                        <div style={{display:'block', textAlign:'center'}}>
                            <h1 className='timer timerB'>Black | {dispBT}</h1>
                            <h6 className="material mB">Points captured: {captured.black.points}</h6>
                        </div>
                        <img className='sep sep2' src={bspng}/>
                    </div>
                </div>
            </div>
            <div style={{width:"100%", height:"100vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
                <Table cells={cells} handleSelect={handleSelect} selected={selected} kings={kings}/>
            </div>
        </div>
    )
}

export default App
