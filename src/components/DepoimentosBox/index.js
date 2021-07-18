import React from 'react';
import Box from "../Box";

export default function DepoimentosBox(propriedades) {
    return (
      <Box>
        <h2 className="smallTitle">
          {propriedades.title} ({propriedades.items.length})
        </h2>

        <div>
          {propriedades.items.map((itemAtual) => {
            return (
              <div key={itemAtual.id} style={{
                display: "flex",
                marginTop: "12px",
                marginBottom: "8px",
                height: 100 ,
                borderBottom: "1px solid #e1e1e1",
              }}>
                <figure style={{ width: "10%", marginBottom: "10px" }}>
                  <a key={itemAtual}><img src={`https://github.com/${itemAtual.user}.png`} style={{ borderRadius: "1000%" }} /></a>
                </figure>
                <div style={{ marginLeft: 10, width: '90%' }}>
                  <span  style={{ fontSize: 12 }}><a  href={`https://github.com/${itemAtual.user}`} style={{ textDecoration: "none", color: "#2E7BB4" }}> @{itemAtual.user}</a> </span>
                  <span style={{ fontSize: 10 }}>{itemAtual.date}</span>
                  <p style={{fontSize: 15}}>{itemAtual.text}</p>
                </div>
              </div>

            )
          })}
        </div>
      </Box>
    )
  }