import React, {useState, useEffect} from 'react';
import './BoardGame.css';

function GameBoard() {
    const [currentNumber, setCurrentNumber] = useState(getRandomNumber(10, 30));
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [playerMove, setPlayerMove] = useState('');
    const [playerWins, setPlayerWins] = useState(0);
    const [botWins, setBotWins] = useState(0);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (currentNumber === 0) {
            handleGameEnd();
        } else if (!isPlayerTurn) {
            const botMove = calculateBotMove(currentNumber);
            setTimeout(() => {
                setCurrentNumber((prevNumber) => prevNumber - botMove);
                setHistory([...history, {player: playerMove, bot: botMove}]);
                setIsPlayerTurn(true);
            }, 1000);
        }
    }, [currentNumber, isPlayerTurn]);

    const handleChange = (e) => {
        setPlayerMove(e.target.value);
    };

    const handlePlayerMove = (amount) => {
        if (amount >= 1 && amount <= 3 && isPlayerTurn) {
            setCurrentNumber((prevNumber) => prevNumber - amount);
            setHistory([...history, {player: amount, bot: 'Waiting...'}]);
            setIsPlayerTurn(false);
        }
    };

    const calculateBotMove = (number) => {
        const remainder = number % 4;
        return remainder === 0 ? Math.floor(Math.random() * 3) + 1 : remainder;
    };

    const handleGameEnd = () => {
        const winner = isPlayerTurn ? 'Bot' : 'Player';
        alert(`Game Over! ${winner} wins!`);

        if (isPlayerTurn) {
            setBotWins((prevBotWins) => prevBotWins + 1);
        } else {
            setPlayerWins((prevPlayerWins) => prevPlayerWins + 1);
        }

        setCurrentNumber(getRandomNumber(10, 30));
        setIsPlayerTurn(true);
        setHistory([]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const move = parseInt(playerMove, 10);

        if (move >= 1 && move <= 3) {
            handlePlayerMove(move);
            setPlayerMove('');
        } else {
            alert('Please enter a valid move (1-3)');
        }
    };

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return (
        <div>
            <div className="rules-container">
                <h2>Rules</h2>
                <ul>
                    <li>Start with a random number between 10 and 30.</li>
                    <li>On your turn, choose to subtract 1, 2, or 3 from the current number.</li>
                    <li>The bot will then make its move.</li>
                    <li>The player and bot take turns subtracting from the current number.</li>
                    <li>The first one to reach 0 wins the round.</li>
                    <li>Player and bot scores are updated accordingly.</li>
                    <li>Click "Submit" to make your move.</li>
                </ul>
            </div>
            <div className="container">
                <h1>Game of Numbers</h1>
                <div id="scores">
                    <div id="player-score">
                        <p>Player Wins: {playerWins}</p>
                    </div>
                    <div id="bot-score">
                        <p>Bot Wins: {botWins}</p>
                    </div>
                </div>
                <div id="current-number">{currentNumber}</div>
                <form onSubmit={handleSubmit}>
                    <label>
                        <input
                            type="number"
                            placeholder="Your Move (1-3)"
                            value={playerMove}
                            onChange={handleChange}
                            min="1"
                            max="3"
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div id="history-container">
                <table id="history-table">
                    <thead>
                    <tr>
                        <th>Player Move</th>
                        <th>Bot Move</th>
                    </tr>
                    </thead>
                    <tbody>
                    {history.map((move, index) => (
                        <tr key={index}>
                            <td>{move.player}</td>
                            <td>{move.bot}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GameBoard;
