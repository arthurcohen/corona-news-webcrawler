# Corona News Webcrawler

## Objetivo macro: 

Ler uma lista de source profiles (apenas com 1 source), para testar o crawler. Ele deverá buscar as notícias mais recentes e em destaque na página inicial. Para identificar as notícias, deverá ser considerado os patterns previamente cadastrados. Cada notícia identificada deverá ter os dados de título, imagem, fonte, data da publicação. A execução dessa rotina será de forma periódica, ao longo do dia.


## tasks

- Criar rotina para o crawler navegar da index para as próximas páginas automáticamente
- Criar rotina que identifica se uma página é uma notícia 
- Criar rotina que extrai informações da notícia para o The Good News (título, imagem, fonte, data da publicação)
- Criar rotina que exporta relatório com as notícias encontradas num formato 'amigável' para quem irá adicioná-las ao The Good News (xls, sheets, csv, etc.)
- Fazer levantamento de quais sites de notícias confiáveis que podem entrar no The Good News
- Criar profiles para os diferentes sites de notícia
- Criar block list
- Criar safe list
- Criar rotina que cálcula o 'sentimento' de uma notícia (seriam o peso de palavras que estão no black list ou white list)
- Criar rotina que categoriza as notícias encontradas entre 'sentimento bom', 'sentimento ruim' ou 'neutra'.
- Ajustar rotina de relatório para que compreenda a categoriazão de cada notícia.