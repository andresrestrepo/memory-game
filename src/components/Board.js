import React, { useState } from 'react';
import "./Board.css";
import { Button } from 'reactstrap';
import { Progress } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';


const Board = () => {
    const { addToast } = useToasts();


    const [items, setItems] = useState([
        {
            id: 0,
            color: "#0062cc",
            opacity: "1"
        },
        {
            id: 1,
            color: "#bd2130",
            opacity: "1"
        },
        {
            id: 2,
            color: "#28a745",
            opacity: "1"
        },
        {
            id: 3,
            color: "#ffc107",
            opacity: "1"
        }
    ])

    const [moves, setMoves] = useState([]);
    const [userMoves, setUserMoves] = useState([]);

    const [inProgress, setInProgress] = useState(false);



    const nextMove = () => {
        let random = Math.floor(Math.random() * 4);

        let movesAux = [...moves];
        movesAux.push(random);
        setMoves(movesAux);

        let modifyItems = [...items];
        modifyItems[random].opacity = "0.2";

        setItems(modifyItems);

        setTimeout(() => {
            const defautItems = items.map(item => {
                item.opacity = "1";
                return item;
            });
            setItems(defautItems);
        }, 1000);
    }

    const startGame = () => {
        setInProgress(true);

        setMoves([]);
        setUserMoves([]);

        nextMove();
    }


    const onBoardClick = (id) => {
        if (moves.length === 0) {
            addToast('Click on Start Game...',
            { appearance: 'warning', autoDismiss: true });
            return;
        }

        let currentMoves = [...moves];
        let currentUserMoves = [...userMoves];

        currentUserMoves.push(id);

        setUserMoves(currentUserMoves);

        let valid = true;
        for (const [i, v] of currentUserMoves.entries()) {
            if (v !== currentMoves[i]) {
                valid = false;
            }
        }

        if (!valid) {
            console.log("Nice try");
            setInProgress(false);
            setMoves([]);
            setUserMoves([]);
            addToast('Good Try, Movements: ' + moves.length,
                { appearance: 'info', autoDismiss: true });

        } else {
            if (currentUserMoves.length === currentMoves.length) {
                setUserMoves([]);
                nextMove();
            }
        }
    }

    let button = <Button outline color="success" onClick={startGame}>Start Game</Button>
    if (inProgress) {
        button = <Button outline color="success" disabled>In Progress</Button>
    }

    return (
        <div>

            <div className="Board-container">
                {items.map((item) =>
                    <div className="Board" key={item.id} style={{ background: item.color, opacity: item.opacity }}
                        onClick={() => onBoardClick(item.id)}
                    >
                    </div>
                )}
            </div>


            <div className="board-button-start">
                {button}
            </div>
            <div className="board-info">
                CPU: {moves.length} <br></br>
                Player: {userMoves.length}
            </div>
            <br></br>
            <Progress color="warning" value={moves.length} />
        </div>



    )
}

export default Board