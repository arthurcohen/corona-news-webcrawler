# Corona News Webcrawler

This application has the main goal to crawl all the news from different [sources](https://github.com/arthurcohen/corona-news-webcrawler/tree/master/src/new-sources), that are manually added. 
After crawled, this application also filter the news that show positive feelings, as the ones manually added to the [vocabulary](https://github.com/arthurcohen/corona-news-webcrawler/blob/master/src/utils/reservedWords.ts ).


## How to download latest release 

Download the latest release avaiable here for your Operational System. 

## How to run 

### Linux 

After downloading the latest [release](https://github.com/arthurcohen/corona-news-webcrawler/releases), you have to run the following commands:

``` 
cd ~/Downloads
chmod a+x ./corona-news-webcrawler-linux
./corona-news-webcrawler-linux {language}
 ``` 

The {language} parameter can be `pt-br` (for crawling portuguese news) or `en-us` (for crawling ensligh news).

*Note: If you don't pass any language parameter, it will execute with all the avaiable languages.* 

### MacOS

After downloading the latest [release](https://github.com/arthurcohen/corona-news-webcrawler/releases), you have to run the following commands:

``` 
cd ~/Downloads
chmod a+x ./corona-news-webcrawler-linux
./corona-news-webcrawler-linux {language}
 ``` 

The {language} parameter can be `pt-br` (for crawling portuguese news) or `en-us` (for crawling ensligh news).

*Note: If you don't pass any language parameter, it will execute with all the avaiable languages.* 


### Windows


After downloading the latest [release](https://github.com/arthurcohen/corona-news-webcrawler/releases) for Windows. 

You can execute by double click the `.exe` file you've dowloaded. 

OR if you choose to run by terminal, you can open the terminal and type: 

For portugues news: 
```corona-news-webcrawler-win.exe pt-br```

For english news: 
```corona-news-webcrawler-win.exe en-us```

*Note: If you don't pass any language parameter, it will execute with all the avaiable languages.* 