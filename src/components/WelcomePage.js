import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
    <div id='introductory-section' className="regular-page">
        <p>
            <b>Привет!</b>
        </p>
        <p>Поздравляю, ты уже без пяти минут муж! Путь к сердцу твоей избранницы был без сомнения труден. Но по мнению некоторых
        ты потрудился недостаточно. Поэтому предлагаю в последний раз проверить свои силы и окончательно доказать всем,
        что ты достоен своей избранницы!</p>
        <div>
            <button className="regular-button">
                <Link to='/quest'>Вперед</Link>
            </button>
        </div>
    </div>
)