import React, { useState } from 'react';
import './cardStyle.css';

export default function Card() {
    const [columns, setColumns] = useState({
        column1: [],
        column2: [],
        column3: []
    });

    const [draggedItem, setDraggedItem] = useState(null);

    const [totalCards, setTotalCards] = useState(0);

    const addCard = (column) => {
        const newCard = {
            id: totalCards + 1,
            title: `Card ${totalCards + 1}`
        };

        setColumns(prevState => ({
            ...prevState,
            [column]: [...prevState[column], newCard]
        }));

        setTotalCards(totalCards + 1);
    };

    const handleDragStart = (e, cardId, columnName) => {
        setDraggedItem({ cardId, columnName });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, columnName) => {
        const { cardId, columnName: sourceColumnName } = draggedItem;

        if (sourceColumnName !== columnName) {
            const card = columns[sourceColumnName].find(card => card.id === cardId);
            const updatedSourceColumn = columns[sourceColumnName].filter(card => card.id !== cardId);
            const updatedDestColumn = [...columns[columnName], card];

            setColumns(prevState => ({
                ...prevState,
                [sourceColumnName]: updatedSourceColumn,
                [columnName]: updatedDestColumn
            }));
        }

        setDraggedItem(null);
    };

    return (
        <div className='cardlist'>
            <div className=' hstack gap-3 col-md-9 border rounded-3 p-4'>
                <div className="vstack gap-2 col-md-2 mx-auto" onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e, 'column1')}>
                    <h5>Not started {columns.column1.length}</h5>
                    {columns.column1.map(card => (
                        <div key={card.id} draggable onDragStart={(e) => handleDragStart(e, card.id, 'column1')}>
                            <button type="button" className="btn btn-outline-secondary col-12">{card.title}</button>
                        </div>
                    ))}
                    <button type="button" className="btn btn-outline-primary " onClick={() => addCard('column1')}>+ New</button>
                </div>
                <div className="vstack gap-2 col-md-2 mx-auto" onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e, 'column2')}>
                    <h5>In progress {columns.column2.length}</h5>
                    {columns.column2.map(card => (
                        <div key={card.id} draggable onDragStart={(e) => handleDragStart(e, card.id, 'column2')}>
                            <button type="button" className="btn btn-outline-secondary col-12">{card.title}</button>
                        </div>
                    ))}
                    <button type="button" className="btn btn-outline-primary" onClick={() => addCard('column2')}>+ New</button>
                </div>
                <div className="vstack gap-2 col-md-2 mx-auto" onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e, 'column3')}>
                    <h5>Completed {columns.column3.length}</h5>
                    {columns.column3.map(card => (
                        <div key={card.id} draggable onDragStart={(e) => handleDragStart(e, card.id, 'column3')}>
                            <button type="button" className="btn btn-outline-secondary col-12">{card.title}</button>
                        </div>
                    ))}
                    <button type="button" className="btn btn-outline-primary" onClick={() => addCard('column3')}>+ New</button>
                </div>
            </div>
        </div>
    );
}
