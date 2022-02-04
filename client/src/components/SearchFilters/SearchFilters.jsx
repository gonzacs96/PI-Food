import React from "react";
import { useDispatch } from "react-redux";
import { setFilterAction} from "../../redux/actions";
import s from './SearchFilters.module.css'


export const SearchFilters=()=>{
    const dispatch= useDispatch();
    const handleSetFilter=(e)=>{
        dispatch(setFilterAction(e.target.value))
    }



    return (
        <>
        <div>
            <select className={s.select} name="filtro_por_tipo_dieta" defaultValue={"default"} onChange={handleSetFilter} >
                <option value="default" disabled>Filtrar por tipo de dieta</option>
                <option value="dairy free">Dairy Free</option>
                <option value="gluten free">Gluten Free</option>
                <option value="primal">Primal</option>
                <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="pescatarian">Pescatarian</option>
                <option value="paleolithic">Paleo</option>
                <option value="whole 30">Whole30</option>
            </select>
 
        </div>
        </>
    )
}