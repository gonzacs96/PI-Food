import React from "react";
import { useDispatch } from "react-redux";
import { setFilterAction } from "../../redux/actions";
import s from './SearchSort.module.css'


export const SearchSort=()=>{
    const dispatch=useDispatch();

   const handleSetFilter=(e)=>{
       dispatch(setFilterAction(e.target.value));
   }

    return (
        <>
        <div className={s.conteiner}>

        <div>
            <select  className={s.select} name="select_por_puntuacion" defaultValue={"default"} onChange={handleSetFilter}>
                <option value="default" disabled>Ordernar por puntuacion</option>
                <option value="More_Less">Hacia abajo</option>
                <option value="Less_More">Hacia arriba</option>
            </select>
        </div>
        <div>
            <select className={s.select} name="select_por_alfabeto"  defaultValue={"default"} onChange={handleSetFilter} >
                <option value="default" disabled>Ordernar por alfabeto</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
            </select>
        </div>
        </div>
        </>
    )
}