export const dateFormatDbToView = data => {
//ex 2023-05-11T00:00:0000 para 22/11/2023

    data = data.substr(0, 10); //retorna apenas a data (2023/05/11)

    data = data.split("-");//[2023,09,30]

    return `${data[2]}/${data[1]}/${data[0]}`; //retorna a data como conhecemos na lingua portuguesa 12/11/2023
}