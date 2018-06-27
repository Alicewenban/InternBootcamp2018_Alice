class error{
    constructor(line,file,problem){
        this.line=line;
        this.file=file;
        this.problem=problem;
    }
    printError(){
        return'file: ' +this.file + ' line: '+ this.line+ ' Problem: ' +this.problem;
    }
}


module.exports=error;