# Fluig-Handbreak-Cli
> Converte videos para a plataforma fluig.

Monitora todos os arquivos enviados para a plataforma fluig e caso seja um MP4 converte ele para um formato mais leve para evitar o consumo de banda.

![fluig-partners](./fluig-partner.png)

## Configuração para Desenvolvimento

Acesse ./wcm/widget/Calendario/src/main/webapp/resources/js/Calendario.js

Procure pela linha parentDocumentId:"4889" E altere o valor entre aspa pelo codigo do seu formulario.
* getDatasetFiliais, 
* getDatasetDepartamentos, 
* initFilterDepartamentos
* initFilterFilial

Devem ser editados para suas necessidades.

## Instalação

Windows:

```sh
Exportar formulario fluig, pegar o codigo do formulario no ged

Alterar parentDocumentId:"aqui código do formulario exportado"
```

## Histórico de lançamentos

* 1.0
    * Calendario 100% funcional

## Licença

Daniel Bom Conselho Sales – [![insta-image]](https://www.instagram.com/bomconselhosales/) – [![google-image]](danielbomconselho@gmail.com) - [![linkedin-image]](https://www.linkedin.com/in/daniel-bom-conselho-sales-1753611b/)

Calendario é distribuído livremente.

_[Fullcalendar](https://fullcalendar.io/) é de propriedade dos seus autores.


[https://github.com/danielbomconselho/](https://github.com/danielbomconselho/)

[linkedin-image]:https://raw.githubusercontent.com/danielbomconselho/Fluig-Calendar/master/Linkedin_4.png
[insta-image]:https://raw.githubusercontent.com/danielbomconselho/Fluig-Calendar/master/Instagram_4.png
[google-image]:https://raw.githubusercontent.com/danielbomconselho/Fluig-Calendar/master/Google_4.png