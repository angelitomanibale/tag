input = document.getElementById("input")
remove = document.getElementById("remove")
output = document.getElementById("output")
list = document.getElementById('list').getElementsByTagName('li')
inputText = ''
number = ''
pageType = ''
user = 0
function run(event){
  
    if(user == 0){
        if(event.code == 'Enter'){
            inputText = document.getElementById("input").value
            document.getElementById("input").value = ''
            placeholder(inputText)
        }
    }
    function placeholder(num){
        user = 1
        number = num
        if(num == 0){
            document.getElementById("input").placeholder = "Author's Names"
        } else if(num == 1){
            document.getElementById("input").placeholder = "doi"
        } else if(num == 2){
            document.getElementById("input").placeholder = "URI"
        } else if(num == 3){
            document.getElementById("input").placeholder = "0-PageRange, 1-FpageLpage"
        } else if(num == 4){
            document.getElementById("input").placeholder = "Title"
        } else if(num == 5){
            document.getElementById("input").placeholder = "Loop link"
        } else if(num == 6){
            document.getElementById("input").placeholder = "Volume(Issue)"
        } else if(num == 7){
            document.getElementById("input").placeholder = "Title"
        }
        
    }


    if (user == 1){
        if(event.code == 'Enter'){
            inputText = document.getElementById("input").value
            if(inputText !== ""){
                if(number == 0){
                    Authors(inputText)
                }else if(number == 1){
                    doi(inputText)
                }else if(number == 2){
                    URI(inputText)
                }else if(number == 3){
                    pageType = inputText
                    document.getElementById("input").placeholder = "Page"
                    user = 2
                }else if(number == 4){
                    titleCase(inputText)
                }else if(number == 5){
                    loopLink(inputText)
                }else if(number == 6){
                    Volume_Issue(inputText)
                }else if(number == 7){
                    lowercase(inputText)
                }
            }
        }
    }

    if (user == 2){
        if(event.code == 'Enter'){
            inputText = document.getElementById("input").value
            document.getElementById('input').value = ''
            if(inputText !== "" && inputText !== '0' && inputText !== '1'){
                Page(inputText, pageType)
            }
        }
    }
 
}



function Authors(inputText){
    authorNames = inputText
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
    done = `${tagged.toString().replaceAll(',', '')}${etal}`
    character = [
        {letter: 'À', int: '&Agrave;'}
    ]
    
    for (let i = 0; i < done.length; i++) {
        for (let x = 0; x < test.length; x++) {
            if(done[x] == character[i].letter){
               done = done.replace(done[x], character[i].int)
            }
        }
    }
    output.innerText = done
    console.log(done)
    remove.remove()

}
test = `<font color="red">/</font>`
function doi(inputText){
    userInput = inputText
    doilink = ''
    if (userInput.includes('#doi:') || userInput.includes('doi:') || userInput.includes('DOI:') || userInput.includes('#DOI:')){
        userInput = userInput.split(':')
        doilink = `${userInput[1].trim()}`
    }else{
        doilink = userInput
    }
    output.innerText = `doi:&nbsp;<pub-id pub-id-type="doi">${doilink}<${test}pub-id>`
    remove.remove()
}

function URI(inputText){
    userInput = inputText
    http = ''
    if (!userInput.includes('http')){
        http = 'https://'
    }
    output.innerText = `<uri xlink:href="${http}${userInput}">${http}${userInput}</uri>`
    remove.remove()
}

function Page(inputText, pageType){
    dash = ''
    for (let i = 0; i < inputText.length; i++) {
        if(isNaN(inputText[i]) == true){
            dash = inputText[i]
        }   
    }
    number = inputText.split(dash) 
    xpage = number[0]
    ypage = number[1]
    if (pageType == '0'){
        if(xpage.length == ypage.length){
            for (let i = 0; i < xpage.length; i++) {
                if(xpage[i] != ypage[i]){
                    output.innerText = `<page-range>${xpage}&ndash;${ypage.replace(ypage.substring(0,i), '')}</page-range>`
                    break
                }
            }
        }else{
            output.innerText = `<page-range>${number[0]}&ndash;${number[1]}</page-range>`
        }
        
    } else if (pageType == '1'){
        output.innerText  = `<fpage>${number[0]}</fpage>&mdash;<lpage>${number[1]}</lpage>`
    }
    remove.remove()
}

function titleCase(inputText){
    title = inputText.toTitleCase().split(' ')
    for (let i = 0; i < title.length; i++) { 
        if (title[i].includes(',')){
            title[i] = title[i].replaceAll(',','#')
        }
        if (title[i][0] == '&'){
            title[i] = title[i].toLowerCase()
        }   
    }
    output.innerText  = title.toString().replaceAll(',',' ').replaceAll('#',',')
    remove.remove()
}

function loopLink(inputText){
    output.innerText  = `<uri xlink:href="${inputText}"/>`
    remove.remove()
}

function Volume_Issue(inputText){
    function insertAt(array, index, ...elements) {
        array.splice(index, 0, ...elements);
    }
    split = inputText.replace('(', '#(').split('#')
    volume = split[0].split('')
    source = split[1].split('')
    insertAt(volume, 0, '<volume>')
    insertAt(volume, volume.length, '</volume>')
    insertAt(source, 1, '<issue>')
    insertAt(source, source.length - 1, '</issue>')
    volume = volume.toString().replaceAll(',', '')
    source = source.toString().replaceAll(',', '')
    output.innerText = `${volume}${source}`
    remove.remove()
}

function lowercase(inputText){
    output.innerText = inputText.toLowerCase()
    remove.remove()
}