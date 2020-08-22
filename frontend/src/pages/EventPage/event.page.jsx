import React, {useEffect} from 'react'
import aboutImg from '../../assets/about.png'

const EventPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <section className="section-10 page section--about cs-about">
            <h2 className="title--big text-center">SỰ KIỆN</h2>
            <div className="row slide">
                
            </div>
        </section>
    )
}

export default EventPage