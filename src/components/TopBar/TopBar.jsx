import React from 'react'
import './TopBar.css'
import Tu from "../../assets/Tu.png";

export default function TopBar() {
  return (
    <>
    <table cellspacing="30">
        <tr>
          <td><img src={Tu} alt="TU" className="logo" /></td>
          <td><h1>Tribhuwan University</h1>
            <p><em>IOE, <strong>Pulchowk Campus</strong> </em> </p>
          </td>
        </tr>
      </table>
    </>
  )
}
