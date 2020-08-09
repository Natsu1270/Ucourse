import React, {useEffect} from 'react'
import aboutImg from '../../assets/about.png'

const QuestionPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <section className="section-10 page section--about cs-about">
            <h2 className="title--big text-center">Câu hỏi thường gặp</h2>
            
        </section>
    )
}

export default QuestionPage