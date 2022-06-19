import {character} from './characters.js'

for (let i = 0; i < character.length; i++) {
    console.log(`intlow: '${character[i].int.toLowerCase()}'`)
}

test = 'ngeÀlito'
for (let i = 0; i < character.length; i++) {
    for (let x = 0; x < test.length; x++) {
        if(test[x] == character[i].letter){
           test = test.replace(test[x], character[i].int)
        }
    }
}

function authors(){
    authorNames = prompt(`Author's names: `)
    tagged = []
    etal = 0
    nameList = authorNames.split(' ')
    
    for (let i = 0; i < nameList.length; i++) {
        
        if (nameList[i].toString().includes(',')){
            if(nameList[i][nameList[i].toString().length - 2] == nameList[i][nameList[i].toString().length - 2].toLowerCase() && nameList[i][nameList[i].toString().length - 2] !== '.'){
                 nameList[i] = nameList[i].replace(',','')
            }else{
                nameList[i] = nameList[i].replace(',','#')
            }
        }
    }
    nameList = nameList.toString().replaceAll(',',' ').replaceAll('#',',').split(',')
    
    for (let i = 0; i < nameList.length; i++) {
        if (nameList[i] == ''){
            nameList.splice(i)
        }
    }
    console.log(nameList)
    for (let i = 0; i < nameList.length; i++){
        etal = etal + 1
        surname = []
        givennames = []
        author = nameList[i].trim().split(' ')
        for (let x = 0; x < author.length; x++){
            if(author[x].length > 1){
                if (author[x][0] == author[x][0].toLowerCase() && author[x][1] == author[x][1].toLowerCase() && author[x][1] != '.'){
                    surname.push(author[x])
                } else if (author[x][0] == author[x][0].toUpperCase() && author[x][1] == author[x][1].toLowerCase() && author[x][1] != '.' && author[x][1] != '-'){
                    surname.push(author[x])
                } else if (author[x][0] == author[x][0].toUpperCase() && author[x][1] == '.'){
                    givennames.push(author[x])
                    
                } else if (author[x][0] == author[x][0].toUpperCase() &&  author[x][1] == '-'){
                    givennames.push(author[x])
                    
                } else if (author[x][0] == author[x][0].toUpperCase() && author[x][1] == author[x][1].toUpperCase()){
                    givennames.push(author[x])
                    
                }
            } else if (author[x].length == 1 && author[x][0] == author[x][0].toUpperCase()){
                givennames.push(author[x])
                
            }
        }
        tagging(surname,givennames)
    }
    function tagging(surname,givennames){
        surname = surname.toString()
        givennames = givennames.toString()
        tagged.push(`<name><surname>${surname.replace(',',' ')}</surname> <given-names>${givennames.replace(',',' ')}</given-names></name>`)
    }
    if (etal >= 6){
        etal = `<etal/>`
    }else{
        etal = ''
    }
    // text.append(`${tagged.toString().replaceAll(',', '')}${etal}`)
    console.log(`${tagged.toString().replaceAll(',', '')}${etal}`)
    // clear()
}

authors()