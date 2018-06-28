function findExt(file){
    for(let i=0; i<file.length-1; i++){
        if(file[i]==='.'){
            return file.slice(i+1);
        }
    }
}
module.exports={findExt:findExt};