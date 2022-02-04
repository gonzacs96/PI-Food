export const sortAlphabeticallyA_Z =(array)=>{
    let result=array.sort(function(a, b){
        var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
        if (nameA < nameB) 
         return -1;
        if (nameA > nameB)
         return 1;
        return 0; 
       });
    return result;   
}

export const sortAlphabeticallyZ_A=(array)=>{
    let result=array.sort(function(a, b){
        var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
        if (nameA > nameB) 
         return -1;
        if (nameA < nameB)
         return 1;
        return 0; 
       });
    return result;   
}