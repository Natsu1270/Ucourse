import React from 'react'
import {useHistory} from 'react-router-dom'
import SearchProgramItem from './search-program-item.component'


const SearchPrograms = ({programs}) =>  {

    const history = useHistory();

    return (<div className='search-result--p'>
        {
            programs.length ? (
                <div className='search-result--p'>
                    <h1 className='search-result--title'>Programs <span
                        className='search-result--title__small'>  {programs.length} results </span>
                    </h1>
                    <div className='search-result--programs'>

                        {
                            programs.map(program => {
                                return (
                                    <SearchProgramItem
                                        onClick={()=>history.push(`/programs/${program.slug}`)}
                                        key={program.code}
                                        img={program.icon}
                                        title={program.name}
                                        slug={program.slug}
                                        num_course={program.courses_count}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            ) : <span/>
        }
    </div>)
}

export default SearchPrograms