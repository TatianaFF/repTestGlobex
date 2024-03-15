import './App.css';
import { useEffect, useState } from "react";
import { usersApi } from "./api/api";
import { Card, Col, Flex, Input, Modal, Row } from 'antd';
import searchButton from "./assets/images/searchButton.png"
import phone from "./assets/images/phone.png"
import mail from "./assets/images/mail.png"
import closeImg from "./assets/images/close.png"


function App() {
    const [users, setUsers] = useState([])
    const [query, setQuery] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)

    const showModal = (index) => {
        setCurrentUser(users[index])
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    useEffect(() => {
        usersApi.getUsers()
            .then((response => {
                const users = response.data
                setUsers(users)
            }))
    }, [setUsers])

    const usersElements = users.map((u, index) => (
        <Col span={ 8 }>
            <Card className="Card" bodyStyle={ { padding: 0 } } onClick={ () => showModal(index) }>
                <div style={ { marginLeft: 24, marginTop: 24 } }>
                    <p className="NameUser">{ u.name }</p>
                    <div style={ { marginBottom: 12 } }>
                        <img className="IconIntoCard" src={ phone }/>
                        <text className="ContactUser">{ u.phone }</text>
                    </div>
                    <div>
                        <img className="IconIntoCard" src={ mail }/>
                        <text className="ContactUser">{ u.email }</text>
                    </div>
                </div>
            </Card>
        </Col>
    ))

    const onSearch = () => {
        usersApi.getUser(query)
            .then((response => {
                const users = response.data
                setUsers(users)
            }))
    }

    const onChange = (e) => {
        setQuery(e.target.value)
    }

    const usersInfoElements = () => {
        const labels = ["Телефон", "Почта", "Дата приема", "Должность", "Подразделение"]
        const info = [currentUser?.phone, currentUser?.email, currentUser?.hire_date, currentUser?.position_name, currentUser?.department]
        return labels.map((label, index) => (
            <>
                <Col span={ 8 } style={ { marginBottom: 14 } }>
                    <text className="LabelInfoUser">{ label + ":" }</text>
                </Col>
                <Col span={ 16 } style={ { marginBottom: 14 } }>
                    <text className="InfoUser">{ info[index] }</text>
                </Col>
            </>
        ))
    }

    return (
        <div className="App">
            <Flex style={ { width: '100%' } } justify="center" align="center">
                <Col className="columnWrapper">
                    <Row>
                        <Input
                            suffix={ <input type="image" src={ searchButton } alt="search icon" onClick={ onSearch }
                                            style={ { margin: 12 } }/> }
                            className="searchbar" onChange={ onChange }/>
                    </Row>
                    <Row gutter={ [25, 24] }>
                        { usersElements }
                    </Row>
                </Col>
                <Modal title={ <text className="NameUser">{ currentUser?.name }</text> } open={ isModalOpen }
                       onCancel={ handleCancel } footer='' closeIcon={ <img src={ closeImg }/> }>
                    <Col style={ { paddingTop: 40 } }>
                        <Row>
                            { usersInfoElements() }
                        </Row>
                        <Row style={ { paddingTop: 26 } }>
                            <text className="LabelInfoUser">Дополнительная информация:</text>
                            <p className="InfoUser">Разработчики используют текст в качестве заполнителя макета
                                страницы.</p>
                        </Row>
                    </Col>
                </Modal>
            </Flex>
        </div>
    )
}

export default App;
