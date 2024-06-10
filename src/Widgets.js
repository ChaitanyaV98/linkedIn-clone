import React from 'react'
import "./Widgets.css";
import InfoIcon from "@mui/icons-material/Info";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const newsArticle=(heading, subtitle)=>(
    <div className='widgets__article'>
        <div className="widgets__articleleft">
            < FiberManualRecordIcon/>
        </div>
        <div className="widgets__articleright">
            <h4>{heading}</h4>
            <p>{subtitle}</p>
        </div>
    </div>   
)

function Widgets() {
  return (
    <div className='widgets'>
        <div className="widgets__header">
            <h2>LinkedIn News</h2>
            <InfoIcon/>
        </div>
        {newsArticle("Great Welcone to Kanna", "Top news - 9099 readers")}
        {newsArticle("React is amazing", "Top news - 789 readers")}
        {newsArticle("Build great Fintech apps using react+typescript", "Top news - 789 readers")}
        {newsArticle("Build great Fintech apps using react+typescrip", "Top news - 789 readers")}
    </div>
  )
}

export default Widgets
