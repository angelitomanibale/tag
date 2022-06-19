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
    if (pageType == '0'){
        console.log(number)
    } else if (pageType == '1'){
        text.append(`<fpage>${number[0]}</fpage>&mdash;<lpage>${number[1]}</lpage>`)
    }
    clear()
}
Page()
// for (let i = 0; i < page.length; i++) {
//     if(isNaN(page[i]) == true){
//         dash = page[i]
//     }
// }


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
    x = number[0]
    y = number[1]
    if (pageType == '0'){
        if (x.length == y.length){
            for (let index = 0; index < x.length; index++) {
                if(x[index] != y[index]){
                    z = y.slice(0,index)
                    y = y.replace(z, '')
                    text.append(`<page-range>${x}&ndash;${y}</page-range>`)
                    break
                }
            }
        }else{
            text.append(`<page-range>${number[0]}&ndash;${number[1]}</lpage>`)
        }
    } else if (pageType == '1'){
        text.append(`<fpage>${number[0]}</fpage>&mdash;<lpage>${number[1]}</lpage>`)
    }
    clear()
}

