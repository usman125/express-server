module.exports =
{
    "dev": {
        env: 'dev',
        port: process.env.PORT || 9000,
        appName: 'trake',
        secret: 'devontherocks',
        // dbString: 'mongodb://heroku_482vnz04:tk0q583k85fkm9p9pl6g6ntlfk@ds133104.mlab.com:33104/heroku_482vnz04',
        //apiurl: 'https://pitbmed.herokuapp.com:'+process.env.PORT,
        // dbString: 'mongodb://127.0.0.1:27017/trake',
        dbString: 'mongodb://heroku_dtdfqg44:p7ise4hu7jcfgunu6lbt5vh09a@ds061676.mlab.com:61676/heroku_dtdfqg44',
        // dbString: 'mongodb://heroku_6275q504:tj4rs62a3fsks0t705576cj91k@ds163630.mlab.com:63630/heroku_6275q504',
        apiurl: 'https://server125.herokuapp.com:'+process.env.PORT,
        // apiUrl: 'ndrmfdev.herokuapp.com',

    },
    "qa": {
        env: 'qa',
        port: 8009,
        appName: 'trake',
        secret: 'devontherocks',
        dbString: 'mongodb://138.197.17.216:31426/trake',
    },
    "prod": {
        env: 'prod',
        port: 80,
        appName: 'trake',
        secret: '0.515036214X',
        dbString: 'mongodb://138.197.17.216:31415/trake',
    }
}
