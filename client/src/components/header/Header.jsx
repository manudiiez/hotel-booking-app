import { useContext, useState } from 'react'
/* ----------------------------------- CSS ---------------------------------- */
import './header.css'
/* ----------------------------- FONTAWESOMEICON ---------------------------- */
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi} from '@fortawesome/free-solid-svg-icons'
/* -------------------------------- DATERANGE ------------------------------- */
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
/* --------------------------------- DATEFNS -------------------------------- */
import { format } from 'date-fns'
/* ---------------------------- REACT-ROUTER-DOM ---------------------------- */
import {useNavigate} from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext';

const Header = ({type}) => {
    const [openDate, setOpenDate] = useState(false);
    const [destination, setDestination] = useState('');
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    });

    const navigate = useNavigate()

    const handleOptions = (name, operation) => {
        setOptions((prev)=> {
            return {
            ...prev,
            [name]: operation === 'i' ? options[name] + 1 : options[name] - 1
        }})
    }

    const {dispatch} = useContext(SearchContext)

    const handleSearch = () => {
        dispatch({type: 'NEW_SEARCH', payload: {destination, dates, options}})
        navigate('/hotels', {state: {destination, dates, options}})
    }


  return (
    <div className='header'>
        <div className={type === 'list' ? 'headerContainer listMode' : 'headerContainer'}>
            <div className="headerList">
                <div className="headerListItem active">
                    <FontAwesomeIcon icon={faBed} />
                    <span>Stays</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faPlane} />
                    <span>Flight</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faCar} />
                    <span>Car rentals</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faBed} />
                    <span>Attractions</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faTaxi} />
                    <span>Airport taxis</span>
                </div>
            </div>
            {type !== 'list' && <>
                <h1 className="headerTitle">A lifetime of discounts? It's Genius.</h1>
                <p className="headerDesc">Get rewarded for your travels - unlocck instant savings of 10% or move with a free lamabooking account</p>
                <button className="headerBtn">Sign in / Register</button>
                <div className="headerSearch">
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faBed} className='headerIcon' />
                        <input type="text" placeholder='Where are you going' className='headerSearchInput' onChange={e=> setDestination(e.target.value)}/>
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />
                        <span className='headerSearchText' onClick={() => setOpenDate(!openDate)}>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")} `}</span>
                        {openDate && <DateRange
                        editableDateInputs={true}
                        onChange={item => setDates([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={dates}
                        className='date'
                        />}
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faPerson} className='headerIcon' />
                    <span className='headerSearchText' onClick={() => setOpenOptions(!openOptions)}>{`${options.adult} adult | ${options.children} children | ${options.room} room`}</span>
                    {openOptions && <div className="options">
                        <div className="optionItem">
                            <span className="optionText">Adult</span>
                                <div className="optionCounter">
                                    <button className="optionCounterButton" onClick={() => handleOptions('adult', 'd')} disabled={options.adult <= 1}>-</button>
                                    <span className='optionCounterNumber'>{options.adult}</span>
                                    <button className="optionCounterButton" onClick={() => handleOptions('adult', 'i')}>+</button>
                                </div>
                        </div>
                        <div className="optionItem">
                            <span className="optionText">Children</span>
                            <div className="optionCounter">
                                <button className="optionCounterButton" onClick={() => handleOptions('children', 'd')} disabled={options.children <= 0}>-</button>
                                <span className='optionCounterNumber'>{options.children}</span>
                                <button className="optionCounterButton" onClick={() => handleOptions('children', 'i')}>+</button>
                            </div>
                        </div>
                        <div className="optionItem">
                            <span className="optionText">Room</span>
                            <div className="optionCounter">
                                <button className="optionCounterButton" onClick={() => handleOptions('room', 'd')} disabled={options.room <= 1}>-</button>
                                <span className='optionCounterNumber'>{options.room}</span>
                                <button className="optionCounterButton" onClick={() => handleOptions('room', 'i')}>+</button>
                            </div>
                        </div>
                    </div>}
                    </div>
                    <div className="headerSearchItem">
                        <button className="headerBtn" onClick={handleSearch}>Search</button>
                    </div>
                </div>
            </>}
        </div>
    </div>
  )
}

export default Header