import './style.css'
import { ButtonHome } from '../../components/button'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { Subject } from '../../types/subjects'
import { FC, useState } from 'react'
import './bulb.css'
import { Link } from 'react-router-dom'

export const HomePage: FC = () => {
    const [bulbOn, setBulbOn] = useState<boolean>(true)
    const {loading, subjects, error} = useTypedSelector(state => state.subjects)

    return (
        <div className="container">
            <div className="homepage-top-box">
                <div className="homepage-top-box-left">
                    <h1>Приложение для подготовки к ЕГЭ</h1>
                    <p style={{marginBottom: 6}}>
                        Здесь вы можете получить необходимые знания для успешной сдачи ЕГЭ по математике, информатике и русскому языку.
                    </p>
                    <p style={{marginBottom: 0}}>
                        Авторизованные пользователи получают доступ ко всему функционалу приложения. Выполняйте задания и получайте достижения.
                    </p>
                    <ButtonHome />
                </div>
                <div className={bulbOn ? "on-homepage-top-box-right homepage-top-box-right" : "homepage-top-box-right"}>
                    <div className="light">
                        <div className="bulb" onClick={() => {setBulbOn(prev => !prev)}}>
                            <div className="wire"></div>
                        </div>
                        <div className="switch">
                        <div className="btn"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="homepage-box">
                <h2>Доступные модули</h2>
                <div style={{display: 'flex', flexDirection: 'column', margin: 32}}>
                    {subjects.map((subject: Subject) => 
                        <Link to={`/subject/${subject.id}`} className={`link-with-hover link-with-hover${subject.id}`} key={subject.id} style={{margin: 12}}>
                            {subject.title}
                        </Link>)
                    }
                </div>
            </div>
            <div className="homepage-box" style={{marginTop: 64}}>
                <h2>Вопросы и ответы</h2>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1em'}}>
                    <div className='one-question'>
                        <h4>Что такое Subject?</h4>
                        <p>Это полностью бесплатная платформа для подготовки к ЕГЭ по математике, информатике и русскому языку. 
                            Subject создается в процессе подготовки к экзамену самим разработчиком и вами, пользователями моего приложения (если такие конечно найдутся)</p>
                    </div>
                    <div className='one-question'>
                        <h4>Как проходит обучение?</h4>
                        <p>Выбираете нужный раздел, открываете тему из списка. 
                            По каждой теме есть задания и теория, все, что необходимо знать на экзамене.
                            Если у вас что-то не получается, вы можете задать вопрос в обсуждении под каждой темой.
                        </p>
                    </div>
                    <div className='one-question'>
                        <h4>Какие возможности есть для практикующих разработчиков?</h4>
                        <p>Subject – проект с открытым исходным кодом. Участвовать в его развитии может любой практикующий разработчик. 
                            Исходный код доступен на GitHub. 
                            Вы можете помочь в создании новых курсов и уроков, улучшать существующие, 
                            исправлять неточности и опечатки, переводить курсы на английский язык.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}