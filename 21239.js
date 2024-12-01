const fs = require('fs')
const path = require('path')


function matching_data(regex, array, sentence, index){
    
    sentence = sentence.replace(regex, (match) => {
        //console.log(sentence)
        let rep_str = array + '[' + index + ']'
        //console.log(rep_str)
        //sentence = sentence.replace(regex, rep_str);
        return rep_str
        
        // return matching_data(regex, array, sentence, index)

        }
    )
    if (regex.test(sentence)){
        sentence = matching_data(regex, array, sentence, index)
    }
    //console.log(sentence)
    return sentence
}

// function Loop_sentence(content, option){
//     content = content.replace(
//         /21239{for ([\s\S]*?) in ([\s\S]*?)}([\s\S]*?){\/for}/g,
//         (matching, each, array, sentence) => {
//             const array_data = options[array.trim()];
//             // console.log(each)
//             // console.log(array_data)
//             // console.log("123")
//             // console.log(sentence)
//             // console.log("123")
//             if (Array.isArray(array_data)) {
//                 //let regex = ''
//                 const regex = new RegExp(`\s*${each}\s*`)
//                 // console.log("asdfasdf")
//                 // console.log(each)
//                 // console.log(regex)
//                 // console.log(sentence)
//                 const data_arr = array_data.map((item, index) => {
//                     //console.log(each)
//                     return sentence.replace(regex, (match) => {
//                         console.log(match)
//                         let rep_str = array + '[' + index + ']'
//                         //console.log(rep_str)
//                         return rep_str
//                     })
//                 }).join('')
//                 console.log(data_arr)
//                 // let data_return = ''
//                 // for (let index = 0; index < data_arr.length; index++){
//                 //     //console.log(data_return)
//                 //     data_return = data_return +  data_arr[index]
//                 // }
//                 //console.log(data_return)
//                 return data_arr
                
                
//             }
//             //callback(null, content)
//             return ''
//         }
//     )
// }


function temPlateEngine(filePath, options, callback){
    const viewDir = path.dirname(filePath)
    console.log(viewDir)
    fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) return callback(err);

        
        
        // const rendered = content.replace(/{{\s*(\w+)\s*}}/g, (match, key) => {
        //     return options[key] || '';
        // });

        // return callback(null, rendered);


        //template partial
        content = content.replace(
            /21239{\+ \s*([^{}\s]+)\s*}/g, (match, nameFile) => {
                const partialPath = path.join(viewDir, `${nameFile}.html`);
                //console.log(partialPath)
                try{
                    const FileContent = fs.readFileSync(partialPath, 'utf8');

                    return FileContent;
                }
                catch (err){
                    //console.log(err)
                    return '';
                }
                // const match_var = match.match(/(?<=\{).*?(?=\})/g);
                // console.log(match_var)
                //console.log(value)
                //console.log("False")
                
            }
        );

        //loop sentence
        content = content.replace(
            /21239{for ([\s\S]*?) in ([\s\S]*?)}([\s\S]*?){\/for}/g,
            (matching, each, array, sentence) => {
                const array_data = options[array.trim()];
                // console.log(each)
                // console.log(array_data)
                // console.log("123")
                // console.log(sentence)
                // console.log("123")
                if (Array.isArray(array_data)) {
                    //let regex = ''
                    const regex = new RegExp(`\s*${each}\s*`)
                    // console.log("asdfasdf")
                    // console.log(each)
                    // console.log(regex)
                    // console.log(sentence)
                    const data_arr = array_data.map((item, index) => {
                        //console.log(each)
                        return matching_data(regex, array, sentence, index)
                    }).join('')
                    //console.log(data_arr)
                    // let data_return = ''
                    // for (let index = 0; index < data_arr.length; index++){
                    //     //console.log(data_return)
                    //     data_return = data_return +  data_arr[index]
                    // }
                    //console.log(data_return)
                    return data_arr
                    
                    
                }
                //callback(null, content)
                return ''
            }
        )


        //if sentence
        content = content.replace(
            /21239{if \s*([^{}\s]+)\s*}([\s\S]*?){else}([\s\S]*?){\/if}/g,
                (match, condition, para_1, para_2) => {
                    // let splits = 
                    //console.log(match)
                    //console.log(condition)
                    if (options[condition] === true){
                        return para_1
                    }
                    else{
                        return para_2
                    }
                    // console.log(para_1)
                    // console.log(para_2)
                    return ''
                }
        )

        


        //variable
        content = content.replace(
            /21239{\s*([^{}\s]+)\s*}/g, (match, value) => {
                //console.log(match)
                // const match_var = match.match(/(?<=\{).*?(?=\})/g);
                // console.log(match_var)
                //console.log(options[value])
                //console.log(value)
                if (value.includes("[")){
                    //console.log("Trueeee")
                    let split_data = value.split("[")
                    //console.log(split_data)
                    let temp_arr = options[split_data[0]]
                    //console.log(temp_arr)
                    let Split_after_special = split_data[1].split("]")
                    let String_exec = `temp_arr[${parseInt(Split_after_special[0])}]`
                    if (Split_after_special.length >= 2){
                        String_exec = String_exec + Split_after_special[1]
                    }
                    // for (let i = 1; i < Split_after_special.length; i++){
                    //     String_exec = String_exec + Split_after_special[i]
                    // }
                        //console.log(temp_arr)
                    //console.log(String_exec.split('return ')[1])
                    //console.log(String_exec)
                    //eval(String_exec)

                    return eval(`${String_exec}`)
                }
                //console.log("False")
                else{
                    if (value.includes(".")){
                        //console.log(value)
                        let split_data = value.split(".")
                        let temp_arr = options[split_data[0]]
                        //console.log(temp_arr)
                        let String_exec = `temp_arr`
                        for (let i = 1; i < split_data.length; i++){
                            String_exec = String_exec +  '.' + split_data[i];
                        }

                        return eval(String_exec)
                    }
                }
                return options[value] || '';
            }
        );
        callback(null, content)
    })
}

module.exports = temPlateEngine;