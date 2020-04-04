import React from 'react';
import SearchProgramItem from './search-program-item.component';


const SearchPrograms = ({programs}) =>  (<div className='search-result--p'>
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

export default SearchPrograms