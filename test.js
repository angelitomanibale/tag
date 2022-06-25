author = `A. van Doi, H-K. Le, V. Nguyen, Y Yang, S Chou`
nameList = author.replaceAll(',','').split(' ')
run = 0
authors = []
test = []


for (let i = 0; i < nameList.length; i++) {
    
    function push(name, run){
        
        console.log(run)
        if(run == name.length){
            authors.unshift(name)
        }
        if(run == -Math.abs(name.length)){
            authors.unshift(name)
        }
    }
    

    for (let x = 0; x < nameList[i].length; x++) {
        // surnames
        if(nameList[i].length == 3){
            if(nameList[i][0] == nameList[i][0].toLowerCase() && nameList[i][1] == nameList[i][1].toLowerCase() && nameList[i][2] == nameList[i][2].toLowerCase()){
                run++
                push(nameList[i], run)
            }
        }
        if(nameList[i].length > 1){
            if (nameList[i][0] == nameList[i][0].toUpperCase() && nameList[i][1] == nameList[i][1].toLowerCase() && nameList[i][1] !== '.' && nameList[i][1] !== '-'){
                run++
                push(nameList[i], run)
            }
        }
         

        //givennames
        if(nameList[i].length == 1){
            if(nameList[i][0] == nameList[i][0].toUpperCase()){
                run--
                push(nameList[i], run)
            }
        } else if (nameList[i].length > 1){
            if(nameList[i][0] == nameList[i][0].toUpperCase() && nameList[i][1] == '.'){
                run--
                push(nameList[i], run)
            } else if (nameList[i][0] == nameList[i][0].toUpperCase() && nameList[i][1] == nameList[i][1].toUpperCase()){
                run--
                push(nameList[i], run)
            } else if (nameList[i][0] == nameList[i][0].toUpperCase() && nameList[i][-1] == '.'){
                run--
                push(nameList[i], run)
            } else if (nameList[i][0] == nameList[i][0].toUpperCase() && nameList[i][1] == '-'){
                run--
                push(nameList[i], run)
            }
        }
        
    }
    run = 0
}

String.prototype.replaceAt = function(index, replacement) {
    if (index >= this.length) {
        return this.valueOf();
    }
 
    var chars = this.split('');
    chars[index] = replacement;
    return chars.join('');
}
authors = authors.toString()
authors = authors.split(',')
authors = authors.toString().replaceAll(',',', ')
for (let n = 0; n < authors.length; n++) {
    if(authors[n] == ','){
        if(authors[n-1] == authors[n-1].toLowerCase() && authors[n-1] !== '.'){
            authors = authors.replaceAt(n, '')
        }
    }
}
authors = authors.split(',').reverse()
authors = authors.toString().replaceAll(',',', ').replaceAll('  ', ' ')