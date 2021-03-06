import React from 'react';
import styled from 'styled-components';
import { ListGroup, Col } from 'react-bootstrap';
import { faEdit, faTrash, faFutbol } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';

import * as TimeActions from '../../store/actions/Time';
import api from '../../services/api';

const Item = styled.div`
    width: 100%;
    display: flex;
    height: 30px;
    margin-top: 5px;
    margin-left: -20px;
`

const Icons = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 2px;
    margin-left: 40px;
`

const Icon = styled.div`
    cursor: pointer;
    margin-left: 12px;
    color: #5C5C5C;
`

const AdjustedIcon = styled(FontAwesomeIcon)`
    margin-top: 5px;
`

export default function ListItem({ items, item, viewIcon, entity, setItems }) {

    function returnEditPageByEntity() {
        if (entity === 'time')
            return `/times-edicao/${item.id}`;
        
        if (entity === 'torneio')
            return `/torneios-edicao/${item.id}`;
        
        if (entity === 'jogador')
            return `/jogadores-edicao/${item.id}`;
        
        return '';
    }

    async function deleteItem() {
        await api.delete(`/${entity}/${item.id}`);
        const filteredItems = items.filter(i => i.id !== item.id);

        if (entity === 'time')
            setItems(TimeActions.setTimes(filteredItems)); 
        else
            setItems(filteredItems);
    }

    return (
        <ListGroup.Item className="py-1">
            <Item>
                <Col>
                    <p>{item.nome}</p>
                </Col>
                <Col>
                    <Icons>
                        {viewIcon ? 
                            <Link to={`/torneios-classificacao/${item.id}`}>
                                <Icon>
                                    <AdjustedIcon icon={faFutbol} />
                                </Icon>
                            </Link> : null
                        }
                        <Link to={returnEditPageByEntity}>
                            <Icon>
                                <FontAwesomeIcon icon={faEdit} />
                            </Icon>
                        </Link>
                        <Icon>
                            <FontAwesomeIcon onClick={deleteItem} icon={faTrash} />
                        </Icon>
                    </Icons>
                </Col>
            </Item>    
        </ListGroup.Item> 
    )
}