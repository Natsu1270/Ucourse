import React from 'react'
import { useHistory } from 'react-router-dom'
import SearchProgramItem from './search-program-item.component'


const SearchPrograms = ({ programs, myPrograms }) => {

    const history = useHistory();

    return (<div className='search-result--p'>
        {
            programs.length ? (
                <div className='search-result--p'>

                    <div className='search-result--programs'>

                        {
                            programs.map(program => {
                                const isBought = myPrograms ? myPrograms.some(p => p.id == program.id) : false
                                return (
                                    <SearchProgramItem
                                        onClick={() => history.push(`/programs/${program.slug}`)}
                                        key={program.id}
                                        img={program.icon}
                                        title={program.name}
                                        slug={program.slug}
                                        num_course={program.courses_count}
                                        isBought={isBought}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            ) : <span />
        }
    </div>)
}

export default SearchPrograms