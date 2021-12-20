import Footer from "../components/Footer";
import Header from "../components/Header";
import SectionDayHour from "../components/SectionDayHour";

import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import Back from "../components/Back";
import { useNavigate } from "react-router-dom"; 

export default function FilmScreen(){
    const navigate = useNavigate();
    const { idMovie } = useParams();
    const [listDay, setListDay] = useState("");
    const [movie, setMovie] = useState([]);
    
    useEffect(()=>{
        const promise = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/movies/${idMovie}/showtimes`);
        promise.then((answer)=>{
           
            setListDay(answer.data.days.map((info)=> 
                <SectionDayHour key={info.id}>
                    {info.weekday}
                    {info.date}
                    {info.showtimes}
                </SectionDayHour>
            ));

            setMovie([answer.data.title, answer.data.posterURL]);

        });

    },[]);
    
    return(
        <main>
            <Back navigate={navigate}/>
            <Header/>
            <div className="title">
                <p>Selecione o horário</p>
            </div>
            <div className="container">
                {listDay}
            
            </div>
            <Footer>
                {movie[0]}
                {movie[1]}
            </Footer>
        </main>
    );
}