export const dateFormatDbToView = data => {
    
    data = data.substr(0,10); //Retorna aenas a data (2023-09-30)
    data = data.split("-");//[2023, 09, 30]

    return `${data[2]}/${data[1]}/${data[0]}`;//30/09/2023

}

export const dateFormatDbToViewEfetivo = data => {
    return new Date(data).toLocaleDateString();
}

export const dateFormatDbToViewEfetivoContrario = data => {
    data = data.substr(0,10);

    return data;
}

