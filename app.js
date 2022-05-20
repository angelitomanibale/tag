document.addEventListener("DOMContentLoaded", function(event) { 

    text = document.getElementById('output')
    op = document.getElementById('option')
    input = document.getElementById('input')
    user = prompt('>>>')

    function clear(){
        op.remove()
    }

    function names(alt){
        names = prompt('Names>>>')
        tagged = []
        list = ''
        nameList = names.split(',')
        etal = ''
        if(nameList.length >= 6){
            etal = '<etal/>'
        }
        for (let i = 0; i < nameList.length; i++){
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
            clear()
        }

        function tagging(surname,givennames){
            surname = surname.toString()
            givennames = givennames.toString()
            tagged.push(`<name><surname>${surname.replace(',',' ')}</surname> <given-names>${givennames.replace(',',' ')}</given-names></name>`)
        }
        text.append(`${tagged.toString().replaceAll(',', '')}${etal}`)
        clear()
    }

    function doi(){
        userInput = prompt('DOI >>> ')
        output = ''
        if (userInput.includes('doi:')){
            userInput = userInput.split(':')
            output = `${userInput[1].trim()}`
        }else{
            output = userInput
        }
        text.append(`doi:&nbsp;<pub-id pub-id-type="doi">${output}</pub-id>`)
        clear()
    }

    function URI(){
        userInput = prompt('Link >>> ')
        http = ''
        if (!userInput.includes('http')){
            http = 'https://'
        }
        doiTag =  `<uri xlink:href="${http}${userInput}">${http}${userInput}</uri>`
        text.append(doiTag)
        clear()
    }

    function Page(){
        pageType = prompt('Page-range(0), Fpage&Lpage(1)>> ')
        userInput = prompt('Page>> ')
        dash = ''
        for (let i = 0; i < userInput.length; i++) {
            if(isNaN(userInput[i]) == true){
                dash = userInput[i]
            }   
        }
        number = userInput.split(dash) 
        xpage = number[0]
        ypage = number[1]
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
        userInput = prompt('Article title>>>')
        title = userInput.toTitleCase().split(' ')
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
        userInput = prompt('Loop link>>>')
        text.append(`<uri xlink:href="${userInput}"/>`)
		clear()
    }
    function Volume_Issue(){
        userInput = prompt('Volume&Issue >>')
        function insertAt(array, index, ...elements) {
            array.splice(index, 0, ...elements);
        }
        split = userInput.replace('(', '#(').split('#')
        volume = split[0].split('')
        source = split[1].split('')
        console.log(source)
        insertAt(volume, 0, '<volume>')
        insertAt(volume, volume.length, '</volume>')
        insertAt(source, 1, '<source>')
        insertAt(source, source.length - 1, '</source>')
        volume = volume.toString().replaceAll(',', '')
        source = source.toString().replaceAll(',', '')
        output = volume + source
        text.append(output)
        clear()
    }


    if (user == 0){
        names()
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
    }

});