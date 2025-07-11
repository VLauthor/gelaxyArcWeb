"use client"
// src/components/MonopolyGame.tsx

import React, { useState } from 'react';

const BOARD_SIZE = 12;
const BRANDS = [
  'Apple', 'Google', 'Microsoft', 'Amazon', 'Tesla', 'Facebook',
  'Coca-Cola', 'Nike', 'Disney', 'Samsung', 'Adidas', 'IKEA'
];

const PLAYER_COLORS = ['#36c', '#e53'];

function getCellPlayers(cellIndex: number, playerPositions: number[]) {
  return playerPositions
    .map((pos, idx) => (pos === cellIndex ? idx + 1 : null))
    .filter((p) => p !== null);
}

function MonopolyGame() {
  const [playerPositions, setPlayerPositions] = useState([0, 0]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [dice, setDice] = useState(1);

  function rollDice() {
    const rolled = Math.floor(Math.random() * 6) + 1;
    setDice(rolled);
    setPlayerPositions((pos) =>
      pos.map((p, idx) =>
        idx === currentPlayer ? (p + rolled) % BOARD_SIZE : p
      )
    );
    setCurrentPlayer((prev) => (prev + 1) % playerPositions.length);
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Монополия: Бренды</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${BOARD_SIZE / 3}, 70px)`,
          gridTemplateRows: `repeat(3, 70px)`,
          gap: '4px',
          margin: '0 auto',
          width: 70 * (BOARD_SIZE / 3),
        }}
      >
        {/* Top row */}
        {BRANDS.slice(0, 4).map((brand, i) =>
          <Cell
            key={i}
            index={i}
            brand={brand}
            players={getCellPlayers(i, playerPositions)}
          />
        )}
        {/* Right column */}
        {BRANDS.slice(4, 6).map((brand, i) =>
          <Cell
            key={i + 4}
            index={i + 4}
            brand={brand}
            players={getCellPlayers(i + 4, playerPositions)}
            style={{ gridRow: 2, gridColumn: i + 4 - 3 }}
          />
        )}
        {/* Bottom row (reverse) */}
        {BRANDS.slice(6, 10).reverse().map((brand, i) =>
          <Cell
            key={i + 6}
            index={BOARD_SIZE - 1 - i}
            brand={brand}
            players={getCellPlayers(BOARD_SIZE - 1 - i, playerPositions)}
          />
        )}
        {/* Left column */}
        {BRANDS.slice(10, 12).map((brand, i) =>
          <Cell
            key={i + 10}
            index={i + 10}
            brand={brand}
            players={getCellPlayers(i + 10, playerPositions)}
            style={{ gridRow: 2, gridColumn: i === 0 ? 1 : 0 }}
          />
        )}
      </div>

      <div style={{ margin: '30px 0 0' }}>
        <b>Текущий игрок:</b>
        {' '}
        <span style={{
          color: PLAYER_COLORS[currentPlayer],
          fontWeight: 'bold'
        }}>
          Игрок {currentPlayer + 1}
        </span>
        <br />
        <button onClick={rollDice} style={{ marginTop: 10, fontSize: 16 }}>
          Бросить кубик
        </button>
        <div style={{
          fontSize: 32,
          marginTop: 10
        }}>
          🎲 {dice}
        </div>
        <div style={{ marginTop: 20 }}>
          <b>Позиции игроков:</b><br />
          {playerPositions.map((pos, idx) => (
            <span
              key={idx}
              style={{ color: PLAYER_COLORS[idx], fontWeight: 'bold', marginRight: 10 }}
            >
              Игрок {idx + 1}: {BRANDS[pos]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Cell({ index, brand, players, style = {} }: any) {
  return (
    <div
      style={{
        border: "2px solid #444",
        borderRadius: 10,
        background: "#fafbfe",
        padding: 3,
        boxSizing: "border-box",
        position: "relative",
        ...style,
      }}
    >
      <div style={{ fontSize: 12, color: "#355", fontWeight: 600 }}>{brand}</div>
      {players.length > 0 &&
        <div style={{ marginTop: 8 }}>
          {players.map((p: number, i: number) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                height: 18,
                width: 18,
                borderRadius: '50%',
                background: PLAYER_COLORS[p - 1],
                color: "#fff",
                fontWeight: 'bold',
                fontSize: 12,
                textAlign: "center",
                marginRight: 2,
                lineHeight: "18px"
              }}
              title={'Игрок ' + p}
            >{p}</span>
          ))}
        </div>
      }
      <span style={{ position: 'absolute', top: 2, right: 6, fontSize: 10, color: '#888' }}>№{index + 1}</span>
    </div>
  );
}

export default MonopolyGame;