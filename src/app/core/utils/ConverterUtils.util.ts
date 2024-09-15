export class ConverterUtils {

    public static async converterArquivoEmBase64(arquivo: File): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            let reader = new FileReader();
            reader.readAsDataURL(arquivo);

            reader.onload = () => {
                if (reader.result) {
                    resolve(reader.result.toString().replace('data:image/jpeg;base64,', '').replace('data:image/jpg;base64,', '').replace('data:image/png;base64,', ''));
                } else {
                    reject('Erro ao converter a imagem!');
                }
            };

            reader.onerror = (error) => {
                reject(error);
            };
        });
    }

}
