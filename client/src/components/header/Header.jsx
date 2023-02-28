import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBed, faTaxi, faPlane, faCar, faCalendarDays, faPerson  } from "@fortawesome/free-solid-svg-icons"
import "./Header.css"
import { DateRange } from 'react-date-range';
import { useContext, useState } from "react"
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import {format} from "date-fns"
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({type}) => {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext);


    const [destination,setDestination] = useState()

    const [openDate, setOpenDate] = useState(false);
    const [dates, setDates] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);

     // console.log(dates);

    const [openOptions, setOpenOptions] = useState(false)
    const [options,setOptions] = useState({
        adult:1,
        children:0,
        room:1,
    })


    const handleOption = (name,operation) => {
         setOptions((prev) => {
            return{
                ...prev,
                [name]:operation === "i" ? options[name] + 1 : options[name] - 1,
            }
         })
    }

    const { dispatch } = useContext(SearchContext)

    const handleSearch = () => {
        dispatch({type:"NEW_SEARCH", payload:{ destination, dates, options }})
        navigate("/hotels",{ state: { destination, dates, options } })
    }

  return (
    <div className="header">
        <div className={type === "list" ? "headerContainer listMode" :"headerContainer"}>
            <div className="headerList">
                <div className="headerListItem active">
                    <FontAwesomeIcon icon={faBed} />
                    <span>Stays</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faPlane} />
                    <span>Flights</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faCar} />
                    <span>Car rentals</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faTaxi} />
                    <span>Airport taxi</span>
                </div>
            </div>
           { type !== "list" &&
           <>
            <h1 className="headerTitle">A lifetime of discounts? It's Genius.</h1>
            
            <p className="headerDesc">
                Get rewarded for your travels - unlockheaderSearch instant savings of 10% or more with a free Manubooking account.
            </p>
            
            {! user && <button className="headerBtn">Sign In / Register</button>}
            
            <div className="headerSearch">
                <div className="headerSearchItem">
                    <FontAwesomeIcon icon={faBed} className="headerIcon" />
                    <input 
                        type="text" 
                        placeholder="where are you going?" 
                        className="headerSearchInput"
                        onChange={(e) => setDestination(e.target.value)}
                     />

                </div>

                <div className="headerSearchItem">
                    <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                    <span className="headerSearchText" onClick={() => setOpenDate(!openDate)}>{`${format(dates[0].startDate,"dd/MM/yyyy")} to 
                        ${format(dates[0].endDate,"dd/MM/yyyy")}`}
                    </span>
                    {openDate && <DateRange
                        editableDateInputs={true}
                        onChange={item => setDates([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={dates}
                        className="date"
                        minDate={new Date()}
                    />}
                </div>

                <div className="headerSearchItem">
                    <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                    <span onClick={() => {setOpenOptions(!openOptions)}} className="headerSearchText">{`${options.adult} adult . 
                        ${options.children} children . ${options.room} room`}
                    </span>
                    {openOptions && <div className="options">
                        <div className="optionItem">
                            <span className="optionText">Adult</span>
                            <div className="optionCounter">
                                <button className="optionCounterButton" disabled={options.adult <= 1} onClick={() => handleOption("adult","d")}>-</button>
                                <button className="optionCounterNumber">{options.adult}</button>
                                <button className="optionCounterButton" onClick={() => handleOption("adult","i")}>+</button>
                            </div>
                        </div>
                  

                        <div className="optionItem">
                            <span className="optionText">Children</span>
                            <div className="optionCounter">
                                <button className="optionCounterButton" disabled={options.children <= 0} onClick={() => handleOption("children","d")}>-</button>
                                <button className="optionCounterNumber">{options.children}</button>
                                <button className="optionCounterButton" onClick={() => handleOption("children","i")}>+</button>
                            </div>
                        </div>
                       
                        <div className="optionItem">
                            <span className="optionText">Room</span>
                            <div className="optionCounter">
                                <button className="optionCounterButton" disabled={ options.room <=1 } onClick={() => handleOption("room","d")}>-</button>
                                <button className="optionCounterNumber">{options.room}</button>
                                <button className="optionCounterButton" onClick={() => handleOption("room", "i")}>+</button>
                            </div>
                        </div>
                    </div>    
                    }
    
                </div>

                <div className="headerSearchItem">
                    <button className="headerBtn" onClick={handleSearch}>Search</button>
                </div>
            </div>
            </>
        }
         </div>
    </div>
  )
}

export default Header
