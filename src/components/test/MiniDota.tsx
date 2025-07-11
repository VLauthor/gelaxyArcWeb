"use client"

// src/components/MiniDota.tsx

import React, { useState } from "react";

const HEROES = [
  { name: "Invoker", team: "Radiant", maxHp: 100, color: "#55cc54" },
  { name: "Axe", team: "Radiant", maxHp: 120, color: "#38a838" },
  { name: "Phantom Assassin", team: "Dire", maxHp: 90, color: "#e84848" },
  { name: "Lion", team: "Dire", maxHp: 110, color: "#b22222" },
];

function getInitialState() {
  return HEROES.map((h) => ({
    ...h,
    hp: h.maxHp,
    alive: true,
  }));
}

function MiniDota() {
  const [heroes, setHeroes] = useState(getInitialState());
  const [activeIdx, setActiveIdx] = useState(0);
  const [log, setLog] = useState<string[]>([]);

  const activeHero = heroes[activeIdx];
  const targets = heroes
    .map((h, i) => ({ ...h, idx: i }))
    .filter(
      (h) =>
        h.team !== activeHero.team && h.alive
    );

  function attack(targetIdx: number) {
    const damage = Math.floor(Math.random() * 16) + 15; // 15–30 dmg
    setHeroes((prev) =>
      prev.map((h, idx) => {
        if (idx === targetIdx) {
          const newHp = Math.max(0, h.hp - damage);
          return {
            ...h,
            hp: newHp,
            alive: newHp > 0,
          };
        }
        return h;
      })
    );
    setLog((prev) => [
      `${activeHero.name} атакует ${heroes[targetIdx].name} на ${damage} урона!`,
      ...prev,
    ]);
    endTurn();
  }

  function endTurn() {
    let next = activeIdx;
    for (let i = 1; i <= heroes.length; i++) {
      const candidate = (activeIdx + i) % heroes.length;
      if (heroes[candidate].alive) {
        next = candidate;
        break;
      }
    }
    setActiveIdx(next);
  }

  function resetGame() {
    setHeroes(getInitialState());
    setLog([]);
    setActiveIdx(0);
  }

  const radiantAlive = heroes.some((h) => h.team === "Radiant" && h.alive);
  const direAlive = heroes.some((h) => h.team === "Dire" && h.alive);

  let winner = "";
  if (!radiantAlive) winner = "Победа Dire!";
  if (!direAlive) winner = "Победа Radiant!";

  return (
    <div style={{ maxWidth: 380, margin: "0 auto", padding: 20, textAlign: "center" }}>
      <h2>Dota 2 - Мини игра</h2>
      <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 12 }}>
        <TeamPanel heroes={heroes} team="Radiant" color="#229931" />
        <TeamPanel heroes={heroes} team="Dire" color="#b61818" />
      </div>
      {winner ? (
        <div>
          <h3 style={{ color: "#ff7f50" }}>{winner}</h3>
          <button onClick={resetGame}>Заново</button>
        </div>
      ) : (
        <div>
          <h4>Ходит: <span style={{ color: activeHero.color }}>{activeHero.name}</span></h4>
          {targets.length > 0 ? (
            <div>
              <b>Кого атаковать?</b>
              <div style={{ margin: "8px 0" }}>
                {targets.map((t) => (
                  <button
                    disabled={!t.alive}
                    key={t.idx}
                    style={{
                      margin: "0 6px",
                      background: t.color,
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      padding: "7px 15px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onClick={() => attack(t.idx)}
                  >
                    {t.name} ({t.hp} HP)
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>Нет живых противников!</div>
          )}
        </div>
      )}
      <div style={{
        marginTop: 20,
        padding: 10,
        background: "#f2f4f8",
        borderRadius: 8,
        minHeight: 80,
        textAlign: "left",
        fontSize: 15,
        maxHeight: 120,
        overflow: "auto"
      }}>
        <b>Журнал:</b>
        <ul>
          {log.slice(0, 5).map((entry, i) => (
            <li key={i}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TeamPanel({ heroes, team, color }: any) {
  return (
    <div>
      <div style={{ fontWeight: 700, color }}>{team}</div>
      {heroes.filter((h: any) => h.team === team).map((h: any, i: number) => (
        <div key={i} style={{ margin: "4px 0", opacity: h.alive ? 1 : 0.5 }}>
          <span style={{
            fontWeight: "bold",
            color: h.color,
            fontSize: 15
          }}>{h.name}</span>
          <span style={{
            marginLeft: 10,
            color: "#337",
            fontWeight: "bold"
          }}>
            {h.alive ? <span>HP {h.hp}</span> : <span>✖ погиб</span>}
          </span>
        </div>
      ))}
    </div>
  );
}

export default MiniDota;