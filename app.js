import {character} from './characters.js'
document.addEventListener("DOMContentLoaded", function(event) { 
    
   var text = document.getElementById('output')
    var op = document.getElementById('option')
    var user = prompt('>>>')

    function clear(){
        op.remove()
    }

    function authors(){
        var authorNames = prompt(`Author's names: `)
        var tagged = []
        var etal = 0
        var nameList = authorNames.split(' ')
        for (let i = 0; i < nameList.length; i++) {
            
            if (nameList[i].toString().includes(',')){
                if(nameList[i][nameList[i].toString().length - 2] == nameList[i][nameList[i].toString().length - 2].toLowerCase() && nameList[i][nameList[i].toString().length - 2] !== '.'){
                     nameList[i] = nameList[i].replace(',','')
                }else{
                    nameList[i] = nameList[i].replace(',','#')
                }
            }
        }
        var nameList = nameList.toString().replaceAll(',',' ').replaceAll('#',',').split(',')
        for (let i = 0; i < nameList.length; i++) {
            if (nameList[i] == ''){
                nameList.splice(i)
            }
        }
        for (let i = 0; i < nameList.length; i++){
            var etal = etal + 1
            var surname = []
            var givennames = []
            var author = nameList[i].trim().split(' ')
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
            var surname = surname.toString()
            var givennames = givennames.toString()
            tagged.push(`<name><surname>${surname.replace(',',' ')}</surname> <given-names>${givennames.replace(',',' ')}</given-names></name>`)
        }
        if (etal >= 6){
            var etal = `<etal/>`
        }else{
            var etal = ''
        }
        var done = `${tagged.toString().replaceAll(',', '')}${etal}`
        for (let i = 0; i < done.length; i++) {
            for (let x = 0; x < character.length; x++) {
                if(done[i] == character[x].letter){
                    done = done.replace(done[i], character[x].int)
                }
                
            }
        }
        text.append(done)
        clear()
    }

    function doi(){
        var userInput = prompt('DOI >>> ')
        var output = ''
        if (userInput.includes('#doi:') || userInput.includes('doi:') || userInput.includes('DOI:') || userInput.includes('#DOI:')){
            var userInput = userInput.split(':')
            var output = `${userInput[1].trim()}`
        }else{
            var output = userInput
        }
        text.append(`doi:&nbsp;<pub-id pub-id-type="doi">${output}</pub-id>`)
        clear()
    }

    function URI(){
        var userInput = prompt('Link >>> ')
        var http = ''
        if (!userInput.includes('http')){
            http = 'https://'
        }
        var doiTag =  `<uri xlink:href="${http}${userInput}">${http}${userInput}</uri>`
        text.append(doiTag)
        clear()
    }

    function Page(){
        var pageType = prompt('Page-range(0), Fpage&Lpage(1)>> ')
        var userInput = prompt('Page>> ')
        var dash = ''
        for (let i = 0; i < userInput.length; i++) {
            if(isNaN(userInput[i]) == true){
                dash = userInput[i]
            }   
        }
        var number = userInput.split(dash) 
        var xpage = number[0]
        var ypage = number[1]
        if (pageType == '0'){
            if(xpage.length == ypage.length){
                for (let i = 0; i < xpage.length; i++) {
                    if(xpage[i] != ypage[i]){
                        text.append(`<page-range>${xpage}&ndash;${ypage.replace(ypage.substring(0,i), '')}</page-range>`)
                        break
                    }
                }
            }else{
                text.append(`<page-range>${number[0]}&ndash;${number[1]}</page-range>`)
            }
            
        } else if (pageType == '1'){
            text.append(`<fpage>${number[0]}</fpage>&mdash;<lpage>${number[1]}</lpage>`)
        }
        clear()
    }

    function titleCase(){
        var userInput = prompt('Article title>>>')
        var title = userInput.toTitleCase().split(' ')
        for (let i = 0; i < title.length; i++) { 
            if (title[i].includes(',')){
                title[i] = title[i].replaceAll(',','#')
            }
            if (title[i][0] == '&'){
                title[i] = title[i].toLowerCase()
            }   
        }
        text.append(title.toString().replaceAll(',',' ').replaceAll('#',','))
		clear()
    }

    function loopLink(){
        var userInput = prompt('Loop link>>>')
        text.append(`<uri xlink:href="${userInput}"/>`)
		clear()
    }
    function Volume_Issue(){
        var userInput = prompt('Volume&Issue >>')
        function insertAt(array, index, ...elements) {
            array.splice(index, 0, ...elements);
        }
        var split = userInput.replace('(', '#(').split('#')
        var volume = split[0].split('')
        source = split[1].split('')
        insertAt(volume, 0, '<volume>')
        insertAt(volume, volume.length, '</volume>')
        insertAt(source, 1, '<issue>')
        insertAt(source, source.length - 1, '</issue>')
        var volume = volume.toString().replaceAll(',', '')
        var source = source.toString().replaceAll(',', '')
        text.append(`${volume}${source}`)
        clear()
    }

    function lowercase(){
        var userInput = prompt('Title>>>')
        var output = userInput.toLowerCase()
        text.append(output)
		clear()
    }

    function unicode() {
        var userInput = prompt('Character>>>')
        for (let i = 0; i < userInput.length; i++) {
            for (let x = 0; x < character.length; x++) {
                if(userInput[i] == character[x].letter){
                    userInput = userInput.replace(userInput[i], character[x].int)
                }
            }
        }
        text.append(userInput)
		clear()
    }


    if (user == 0){
        authors()
    } else if(user == 1){
        doi()
    } else if(user == 2){
        URI()
    } else if(user == 3){
        Page()
    } else if(user == 4){
        titleCase()
    } else if (user == 5){
        loopLink()
    } else if (user == 6){
        Volume_Issue()
    } else if (user == 7){
        lowercase()
    } else if(user == 8){
        unicode()
    }

});