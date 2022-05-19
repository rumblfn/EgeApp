import './style.css'
import { ButtonHome } from '../../components/button'
import egeImage from '../../images/ege-homepage-image.png'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { Subject } from '../../types/subjects'
import { FC } from 'react'

export const HomePage: FC = () => {
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
                <div className="homepage-top-box-right">
                    <img alt="img-ege" src={egeImage}/>
                </div>
            </div>
            <div className="homepage-box">
                <h2>Доступные модули</h2>
                <div>
                    {subjects.map((subject: Subject) => 
                        <p key={subject.id} style={{marginLeft: 24}}>
                            {subject.title}
                        </p>)
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